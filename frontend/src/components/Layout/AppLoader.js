import { Spinner, Box } from "@chakra-ui/react";

const AppLoader = () => {
  return (
    <Box width="100vw" d="flex" justifyContent="center" alignItems="center">
      <Spinner size="xl" />
    </Box>
  );
};

export default AppLoader;
