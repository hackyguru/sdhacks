import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Landing from "./pages/Landing";
import Create from "./pages/Create";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Rinkeby;

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={activeChainId}>
      <BrowserRouter>
        <Routes>
          <Route path="/community/:communityname" element={<App />} />
          <Route path="/create" element={<Create />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
