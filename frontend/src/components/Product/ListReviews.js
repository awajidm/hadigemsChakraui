import React from "react";
import { Box, Divider, Text } from "@chakra-ui/react";
import BeautyStars from "beauty-stars";

const ListReviews = ({ reviews }) => {
  return (
    <Box m={10}>
      <Text fontSize="32px" fontFamily="unset" textColor="darkpurple">
        Other's Reviews
      </Text>
      <Divider my={2} />
      {reviews &&
        reviews.map((review) => (
          <Box key={review._id}>
            <BeautyStars gap={6} size="20px" value={review.rating} />
            <Text fontSize="16px" textColor="gray.500">
              <b>by</b> {review.name}
            </Text>
            {review.comment ? (
              <Text fontSize="16px" textColor="warning">
                {review.comment}
              </Text>
            ) : (
              <Text fontSize="16px" textColor="gray.300">
                No Comment
              </Text>
            )}

            <Divider my={2} />
          </Box>
        ))}
    </Box>
  );
};

export default ListReviews;
