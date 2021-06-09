import React, { Fragment, useEffect, useState, forwardRef } from "react";

import MetaData from "../Layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import {
  newProduct,
  clearErrors,
  getCategories,
} from "../../actions/productActions";
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  Input,
  Avatar,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  Select,
  Box,
  HStack,
  Switch,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import {
  FaBook,
  FaMoneyBill,
  FaPen,
  FaProductHunt,
  FaTag,
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const NewProduct = ({ history, isModalOpen, onModalClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [SKU, setSKU] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [isPrimium, setIsPrimium] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [saleFrom, setSaleFrom] = useState(Date.now());
  const [saleTo, setSaleTo] = useState(Date.now());
  const [salePrice, setSalePrice] = useState("");
  const [shot, setShot] = useState("");
  const [pInfoTitle, setPInfoTitle] = useState("");
  const [pInfoDesc, setPInfoDesc] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { categories } = useSelector((state) => state.productCategory);

  useEffect(() => {
    dispatch(getCategories());
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      dispatch(clearErrors());
    }

    if (success) {
      history.push("/admin/products");
      toast({
        title: "product created successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, toast, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description);
    formData.set("shortDescription", shortDescription);
    formData.set("sku", SKU);
    formData.set("price", price);
    formData.set("tags", tags);

    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.set("isPremium", isPrimium);
    formData.set("isFeatured", isFeatured);
    formData.set("onSale", onSale);

    if (onSale === true) {
      formData.set("saleFrom", saleFrom);
      formData.set("saleTo", saleTo);
      formData.set("salePrice", salePrice);
    }
    formData.set("shot", shot);

    let categoryId = "";

    categories &&
      categories.map((cate) => {
        if (cate.name === category) {
          categoryId = cate._id;
        }
      });

    formData.set("category", categoryId);
    formData.set("productInfo", productInfo);

    formData.set("stock", stock);

    for (var value of formData.values()) {
      console.log(value);
    }
    dispatch(newProduct(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // const createCategoryList = (categories, options = []) => {
  //   categories &&
  //     categories.map((category) => {
  //       options.push({ value: category._id, name: category.name });
  //       if (category.children.length > 0) {
  //         createCategoryList(category.children, options);
  //       }
  //     });

  //   return options;
  // };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tag === "") {
      toast({
        title: "Your Tag input in Empty",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      tags.push(tag);
    }
    setTag("");
    console.log(tags);
  };

  const handleRemoveTag = (sTag) => {
    let filterTags = tags.filter((item) => item !== sTag);
    setTags(filterTags);
  };
  const handleInfoAdd = (e) => {
    e.preventDefault();
    if (pInfoTitle === "" && pInfoDesc === "") {
      toast({
        title: "input in Empty",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      productInfo.push({
        title: pInfoTitle,
        desc: pInfoDesc,
      });
    }
    console.log(productInfo);

    setPInfoTitle("");
    setPInfoDesc("");
  };

  const handleInfoRemove = (pTitle) => {
    let filteredInfo = productInfo.filter((item) => item.title !== pTitle);
    setProductInfo(filteredInfo);
  };
  return (
    <Fragment>
      <MetaData title={"add new product"} />
      <Modal
        isOpen={isModalOpen}
        onClose={onModalClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              className="form"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <Stack spacing={5}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaProductHunt color="#F7B32B" />}
                  />
                  <Input
                    focusBorderColor="warning"
                    placeholder="Enter Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
                <Textarea
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Textarea
                  type="text"
                  placeholder="Enter Short Description"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                />
                <HStack>
                  <Text>Tags: </Text>
                  {tags.map((tag) => (
                    <Tag size="md" key={Math.random() * 1000} variant="outline">
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                    </Tag>
                  ))}
                </HStack>
                <HStack>
                  <InputGroup>
                    <InputLeftElement children={<FaTag />} />
                    <Input
                      focusBorderColor="warning"
                      placeholder="Enter Tag"
                      type="text"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    />
                  </InputGroup>
                  <Button
                    bgColor="warning"
                    _hover={{ bgColor: "yellow.400" }}
                    onClick={handleAddTag}
                  >
                    Add Tag
                  </Button>
                </HStack>

                <Select
                  placeholder="Select Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories &&
                    categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                  {/* {createCategoryList(categoryList).map((category) => {
                    <option key={category.value} value={category.value}>
                      {category.name}
                    </option>;
                  })} */}
                </Select>

                <Stack direction="row" spacing={5}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaMoneyBill color="#F7B32B" />}
                    />
                    <Input
                      focusBorderColor="warning"
                      placeholder="Enter Price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaBook color="#F7B32B" />}
                    />
                    <Input
                      focusBorderColor="warning"
                      placeholder="Enter Stock"
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </InputGroup>
                </Stack>
                <HStack spacing={8}>
                  <Input
                    focusBorderColor="warning"
                    placeholder="Enter SKU"
                    w="120px"
                    type="text"
                    value={SKU}
                    onChange={(e) => setSKU(e.target.value)}
                  />
                  <Box>
                    <Text>Premium</Text>
                    <Switch
                      size="md"
                      value={isPrimium}
                      defaultChecked={isPrimium}
                      onChange={(e) => setIsPrimium(!isPrimium)}
                    />
                  </Box>
                  <Box>
                    <Text>Featured</Text>
                    <Switch
                      size="md"
                      value={isFeatured}
                      defaultChecked={isFeatured}
                      onChange={(e) => setIsFeatured(!isFeatured)}
                    />
                  </Box>
                  <Box>
                    <Text>Sale</Text>
                    <Switch
                      size="md"
                      defaultChecked={onSale}
                      value={onSale}
                      onChange={() => setOnSale(!onSale)}
                    />
                  </Box>
                </HStack>
                {onSale ? (
                  <>
                    <HStack spacing={12} my={5}>
                      <Box>
                        <Text>Start Sale</Text>
                        <DatePicker
                          selected={saleFrom}
                          onChange={(date) => setSaleFrom(date)}
                        />
                      </Box>
                      <Box>
                        <Text>End Sale</Text>
                        <DatePicker
                          selected={saleTo}
                          onChange={(date) => setSaleTo(date)}
                        />
                      </Box>
                    </HStack>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FaMoneyBill color="#F7B32B" />}
                      />
                      <Input
                        focusBorderColor="warning"
                        placeholder="Enter Sale Price"
                        type="number"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                      />
                    </InputGroup>
                  </>
                ) : null}
                <InputGroup>
                  <Input
                    focusBorderColor="warning"
                    placeholder="Enter Shot"
                    type="text"
                    value={shot}
                    onChange={(e) => setShot(e.target.value)}
                  />
                </InputGroup>
                <Text>Product Information</Text>
                <Wrap>
                  {productInfo.map((item) => (
                    <WrapItem
                      key={Math.random() * 1000}
                      onClick={() => handleInfoRemove(item.title)}
                      _hover={{
                        bgColor: "red.300",
                        cursor: "not-allowed",
                      }}
                    >
                      <Box boxShadow="0px 0px 10px gray" p={3}>
                        <Text>{item.title}</Text>
                        <Text>{item.desc}</Text>
                      </Box>
                    </WrapItem>
                  ))}
                </Wrap>
                <HStack spacing={5}>
                  <InputGroup>
                    <Input
                      focusBorderColor="warning"
                      placeholder="Enter Title"
                      type="text"
                      value={pInfoTitle}
                      onChange={(e) => setPInfoTitle(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Input
                      focusBorderColor="warning"
                      placeholder="Enter Description"
                      type="text"
                      value={pInfoDesc}
                      onChange={(e) => setPInfoDesc(e.target.value)}
                    />
                  </InputGroup>
                </HStack>
                <Button
                  bgColor="warning"
                  _hover={{ bgColor: "yellow.400" }}
                  onClick={handleInfoAdd}
                >
                  Add
                </Button>
                <Text color="warning">Choose Images</Text>
                <HStack>
                  <Input
                    focusBorderColor="warning"
                    type="file"
                    multiple
                    onChange={onChange}
                    w="100px"
                    p="0px"
                  />
                  <Box>
                    {imagesPreview.map((img) => (
                      <Avatar
                        key={img}
                        size="md"
                        src={img}
                        name="image preview"
                      />
                    ))}
                  </Box>
                </HStack>
                <Button
                  variant="solid"
                  bgGradient="linear(to-t, warning, danger)"
                  _hover={{
                    bgGradient: "linear(to-r, danger, warning)",
                  }}
                  color="white"
                  size="lg"
                  isFullWidth
                  type="submit"
                  isLoading={loading ? true : false}
                  loadingText="Please wait"
                >
                  Add Product
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default NewProduct;
