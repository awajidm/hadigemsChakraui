import React, { Fragment, useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
//redux imports
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";

import MetaData from "../Layout/MetaData";
import Loader from "../Layout/AppLoader";

//Chakra ui

import {
  useToast,
  Text,
  IconButton,
  Heading,
  Stack,
  Td,
  Tr,
  Th,
  Table,
  TableCaption,
  Thead,
  Tbody,
} from "@chakra-ui/react";

import { FaEye } from "react-icons/fa";

const ListOrders = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  useEffect(() => {
    dispatch(myOrders());

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

  return (
    <Fragment>
      <MetaData title={"my Orders"} />
      <Stack justify="center" m={10} p={5} boxShadow="0px 0px 10px gray">
        <Heading fontSize="32px" fontFamily="unset" mb={3}>
          My Orders: {orders && orders.length}
        </Heading>

        {loading ? (
          <Loader />
        ) : (
          <Table variant="striped" size="sm">
            <TableCaption>
              For more Information about your Orders Contact us.
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th isNumeric>Num of Items</Th>
                <Th isNumeric>Amount</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders &&
                orders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td isNumeric>{order.orderItems.length}</Td>
                    <Td isNumeric>Rs.{order.totalPrice}</Td>
                    <Td>
                      {order.orderStatus &&
                      String(order.orderStatus).includes("Delivered") ? (
                        <Text textColor="green.500">{order.orderStatus}</Text>
                      ) : (
                        <Text textColor="danger">{order.orderStatus}</Text>
                      )}
                    </Td>
                    <Td>
                      <IconButton
                        as={ReactLink}
                        to={`/order/${order._id}`}
                        color="white"
                        bgColor="pblue"
                        _hover={{ bgColor: "warning", color: "danger" }}
                        isRound
                        icon={<FaEye fontSize="20px" />}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          // <MDBDataTable data={setOrders()} bordered striped hover />
        )}
      </Stack>
    </Fragment>
  );
};

export default ListOrders;
