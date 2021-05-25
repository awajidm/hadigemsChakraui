import React from "react";
import ReactDOM from "react-dom";

//redux
import { Provider } from "react-redux";
import store from "./store";

//chakra-ui
import { ChakraProvider } from "@chakra-ui/react";
import { myChakraTheme } from "./styles/theme.js";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider resetCSS theme={myChakraTheme}>
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
