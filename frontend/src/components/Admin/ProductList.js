import React, { Fragment, useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
//redux imports
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct, clearErrors } from "../../actions/productActions";

import MetaData from "../Layout/MetaData";
import Loader from "../Layout/AppLoader";
import Sidebar from "./SideBar";

//Chakra ui

import {
  useToast,
  IconButton,
  Heading,
  Stack,
  Td,
  Tr,
  Th,
  Table,
  Thead,
  Tbody,
  Grid,
  GridItem,
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";

import {
  FaPen,
  FaTrash,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";

import { useTable, usePagination } from "react-table";
import NewProduct from "./NewProduct";

function ProductsTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <Table variant="striped" size="sm" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th fontSize="16px" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td fontSize="12px" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <Box>
        <Stack direction="row" spacing={4} justify="center" p={3}>
          <Button
            bgColor="red.100"
            size="sm"
            _hover={{ bgColor: "red.300" }}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <FaAngleDoubleLeft color="black" />
          </Button>
          <Button
            bgColor="red.100"
            size="sm"
            _hover={{ bgColor: "red.300" }}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <FaAngleLeft />
          </Button>
          <Button
            bgColor="red.100"
            size="sm"
            _hover={{ bgColor: "red.300" }}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <FaAngleRight />
          </Button>
          <Button
            bgColor="red.100"
            size="sm"
            _hover={{ bgColor: "red.300" }}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <FaAngleDoubleRight />
          </Button>
        </Stack>
        <Flex>
          <Stack direction="row">
            <Text>
              Page: {pageIndex + 1} of {pageOptions.length}
            </Text>
            <Text> | Go to page:</Text>
            <Input
              w="50px"
              size="sm"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
            />
          </Stack>
          <Spacer />
          <Select
            size="sm"
            w="200px"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
      </Box>
    </>
  );
}

const ProductList = ({ history }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAdminProduct());

    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Product ID",
        accessor: "productId",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );
  const productArray =
    products &&
    products.map((product) => ({
      productId: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      actions: (
        <>
          <IconButton
            as={ReactLink}
            to={`/admin/product/${product._id}`}
            color="white"
            bgColor="warning"
            _hover={{ bgColor: "yellow.700", color: "white" }}
            icon={<FaPen fontSize="12px" />}
            mr={2}
          />
          <IconButton
            as={ReactLink}
            to={`/admin/product/${product._id}`}
            color="white"
            bgColor="red.400"
            _hover={{ bgColor: "danger", color: "white" }}
            icon={<FaTrash fontSize="12px" />}
          />
        </>
      ),
    }));

  const data = React.useMemo(() => productArray, []);

  return (
    <Fragment>
      <MetaData title={"Admin Products"} />
      <Grid templateColumns="repeat(12, 1fr)" gap={3}>
        <GridItem colSpan={3}>
          <Sidebar />
        </GridItem>
        <GridItem colSpan={9}>
          <Flex mx={10} p={5} boxShadow="0px 0px 10px gray">
            <Spacer />
            <Button
              bgColor="blue.700"
              borderRadius="0"
              color="white"
              _hover={{ bgColor: "blue.900" }}
              mr="auto"
              onClick={onOpen}
            >
              Add Product
            </Button>
            <NewProduct onModalClose={onClose} isModalOpen={isOpen} />
          </Flex>
          <Stack justify="center" m={10} p={5} boxShadow="0px 0px 10px gray">
            <Heading fontSize="32px" fontFamily="unset" mb={3}>
              All Products
            </Heading>

            {loading ? (
              <Loader />
            ) : (
              <ProductsTable columns={columns} data={data} />
            )}
          </Stack>
        </GridItem>
      </Grid>
    </Fragment>
  );
};

export default ProductList;
