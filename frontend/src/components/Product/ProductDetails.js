import React, { Fragment, useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";

//redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  clearErrors,
  newReview,
} from "../../actions/productActions";

import { addItemToCart } from "../../actions/cartActions";

import { NEW_REVIEW_RESET } from "../../constants/productConstants";
//Chakra ui

import {
  Link,
  Box,
  Stack,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
  Divider,
  HStack,
  Input,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  Heading,
} from "@chakra-ui/react";

import BeautyStars from "beauty-stars";

import {
  FaCaretRight,
  FaCaretLeft,
  FaExpand,
  FaCompress,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";

//app components
import Loader from "../Layout/AppLoader";
import MetaData from "../Layout/MetaData";
import ListReviews from "./ListReviews";

const ProductDetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState();

  const dispatch = useDispatch();
  const toast = useToast();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast({
        title: reviewError,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast({
        title: "Review Posted Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, match.params.id, toast, reviewError, success]);

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    toast({
      description: "Added to the cart",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  let images = [];
  if (product.images) {
    images = product.images.map((image) => ({
      src: `${image.url}`,
    }));
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", match.params.id);

    dispatch(newReview(formData));
    onClose();
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <Stack direction="row" justify="center" mt={5}>
            <VStack justify="center" align="center" mx={20}>
              <Carousel
                images={images}
                hasMediaButton={false}
                hasIndexBoard={false}
                style={{ width: "350px" }}
                leftIcon={
                  <Text
                    fontSize="50px"
                    color="white"
                    _hover={{ color: "warning" }}
                  >
                    <FaCaretLeft />
                  </Text>
                }
                rightIcon={
                  <Text
                    fontSize="50px"
                    color="white"
                    _hover={{ color: "warning" }}
                  >
                    <FaCaretRight />
                  </Text>
                }
                maxIcon={
                  <Text
                    fontSize="40px"
                    m={2}
                    color="white"
                    _hover={{ color: "warning" }}
                  >
                    <FaExpand />
                  </Text>
                }
                minIcon={
                  <Text
                    fontSize="40px"
                    m={2}
                    color="white"
                    _hover={{ color: "warning" }}
                  >
                    <FaCompress />
                  </Text>
                }
                thumbnailWidth="40px"
                thumbnailHeight="40px"
              />
            </VStack>
            <VStack align="start" width="50vw" mx={20}>
              <Text fontSize="32px" fontFamily="unset" textColor="darkpurple">
                {product.name}
              </Text>
              <Text fontSize="12px" fontFamily="unset" textColor="gray.400">
                Product # {product._id}
              </Text>
              <Divider />
              <Box>
                <BeautyStars
                  value={product.ratings}
                  size={12}
                  gap={6}
                  activeColor="#F7B32B"
                />
                <Link as={ReactLink} to={`/product/reviews`}>
                  {product.numOfReviews} reviews
                </Link>
              </Box>

              <Text
                fontSize="32px"
                fontFamily="unset"
                textColor="danger"
                mt={3}
              >
                Rs.{product.price}/-
              </Text>

              <Divider />
              <HStack spacing={5}>
                <IconButton
                  onClick={decreaseQty}
                  bgColor="danger"
                  color="white"
                  _hover={{ bgColor: "pblue" }}
                  size="xs"
                  icon={<FaMinus fontSize="12px" />}
                />
                <Input
                  type="number"
                  className="count"
                  size="lg"
                  width="50px"
                  isReadOnly={true}
                  value={quantity}
                />
                <IconButton
                  onClick={increaseQty}
                  color="white"
                  bgColor="pblue"
                  _hover={{ bgColor: "pblue" }}
                  size="xs"
                  icon={<FaPlus fontSize="12px" />}
                />
                <Button
                  _hover={{ opacity: 0.7 }}
                  color="white"
                  bgColor="warning"
                  borderRadius="50px"
                  onClick={addToCart}
                  isDisabled={product.stock === 0}
                >
                  Add to Cart
                </Button>
              </HStack>

              <Box>
                <Text fontSize="20px" fontFamily="fantasy">
                  Description
                </Text>
                {product.description}
              </Box>

              <HStack>
                <Text fontSize="20px" fontFamily="fantasy">
                  Status:
                </Text>
                <Text
                  fontSize="20px"
                  textColor={product.stock > 0 ? "green.400" : "danger"}
                >
                  {product.stock > 0 ? `In Stock` : `Out of Stock`}
                </Text>
              </HStack>

              <Divider />
              {user ? (
                <Button
                  _hover={{ bgColor: "pblue" }}
                  color="white"
                  bgColor="warning"
                  borderRadius="50px"
                  onClick={onOpen}
                >
                  Submit Review
                </Button>
              ) : (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Please Login to Submit your review</AlertTitle>
                </Alert>
              )}
            </VStack>
          </Stack>
          <Stack
            align="center"
            justify="center"
            mt={10}
            boxShadow="0px 0px 10px gray"
            p={3}
            borderRadius="md"
          >
            <Text fontSize="25px" fontFamily="fantasy">
              Product Detail
            </Text>
            <Wrap>
              {product.productInfo &&
                product.productInfo.map((info) => (
                  <WrapItem key={info.title}>
                    <Box boxShadow="0px 0px 10px gray" p={3} borderRadius="md">
                      <Text>{info.title}</Text>
                      <Text textColor="pblue">{info.desc}</Text>
                    </Box>
                  </WrapItem>
                ))}
            </Wrap>
          </Stack>
        </Fragment>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Submit Your Review</ModalHeader>
          <ModalBody>
            <Box d="flex" justifyContent="center" alignItems="center" my={3}>
              <BeautyStars
                value={rating}
                onChange={(value) => setRating(value)}
                size="30px"
                activeColor="#F7B32B"
              />
            </Box>
            <Divider />
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your Comment"
              my={5}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="solid"
              bgGradient="linear(to-r, darkpurple, warning)"
              _hover={{
                bgGradient: "linear(to-r, darkpurple, danger)",
              }}
              color="white"
              size="sm"
              isFullWidth
              onClick={reviewHandler}
            >
              Submit Review
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack>
        {product.reviews && product.reviews.length > 0 && (
          <ListReviews reviews={product.reviews} />
        )}
      </Stack>
    </Fragment>
  );
};

export default ProductDetails;
