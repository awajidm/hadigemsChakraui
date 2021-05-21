import React, { useEffect, useState } from "react";

//redux imports
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCategory } from "../../actions/productActions";

import { Space, Row, Col, Divider, Typography, Alert, Pagination } from "antd";

import ProductCard from "../Product/ProductCard";
import Apploader from "../Layout/AppLoader";
import MetaData from "../Layout/MetaData";

import "./style.scss";

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [price, setPrice] = useState([1, 10000]);

  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return <Alert type="error" message={error} />;
    }
    dispatch(getProducts(currentPage, keyword));
    dispatch(getCategory());
  }, [dispatch, error, currentPage, keyword]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  return (
    <>
      <MetaData title="Home" />

      {keyword ? (
        <Row>
          <Col span={6} className="products-filter"></Col>
          <Col span={18}>
            <Typography.Title level={2} style={{ textAlign: "center" }}>
              Search Results
            </Typography.Title>
            <Space className="products-container" wrap>
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </Space>
            <div className="products-pagination">
              {resPerPage <= products.length && (
                <Pagination
                  total={productsCount}
                  defaultCurrent={currentPage}
                  defaultPageSize={resPerPage}
                  onChange={setCurrentPageNo}
                  showSizeChanger={false}
                />
              )}
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <Row className="latest-products" justify="center">
            <Col style={{ textAlign: "center" }} span={24}>
              <Divider>
                <Typography.Title level={2}>Products</Typography.Title>
              </Divider>
            </Col>
          </Row>
          {loading ? (
            <Apploader />
          ) : (
            <Row>
              <Col span={24}>
                <Space className="products-container" wrap>
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </Space>
              </Col>
            </Row>
          )}
          <Row className="latest-products" justify="center">
            <Col style={{ textAlign: "center" }} span={24}>
              <Divider>
                <Typography.Title level={2}>Premium Products</Typography.Title>
              </Divider>
            </Col>
          </Row>
          {loading ? (
            <Apploader />
          ) : (
            <Row>
              <Col span={24}>
                <Space className="products-container" wrap>
                  {products &&
                    products
                      .filter((product) => product.isPremium)
                      .map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                </Space>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default Home;
