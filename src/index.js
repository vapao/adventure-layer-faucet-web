import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { DAppProvider, Mainnet, Sepolia, ChainId, DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";
// import { getDefaultProvider } from 'ethers'

import { AdventureLayer as l2 } from './config'

const getAddressLink = (explorerUrl) => (address) => `${explorerUrl}/address/${address}`
const getTransactionLink = (explorerUrl) => (txnId) => `${explorerUrl}/tx/${txnId}`

const AdventureLayer = {
  chainId: l2.chainId,
  rpcUrl: l2.rpcUrl,
  wssUrl: l2.wssUrl,
  chainName: l2.chainName,
  isTestChain: false,
  isLocalChain: false,
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: l2.blockExplorerUrl,
  getExplorerAddressLink: getAddressLink(l2.blockExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(l2.blockExplorerUrl),
}

const config = {
  // readOnlyChainId: Sepolia.chainId,
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: Mainnet.rpcUrl,
    [Sepolia.chainId]: Sepolia.rpcUrl,
    [AdventureLayer.chainId]: AdventureLayer.rpcUrl,
  },
  // supportedChains: [ChainId.Mainnet, ChainId.Goerli, ChainId.Kovan, ChainId.Rinkeby, ChainId.Ropsten, ChainId.Arbitrum, ChainId.Sepolia, AdventureLayer.chainId],
  networks: [...DEFAULT_SUPPORTED_CHAINS, AdventureLayer,], // AdventureLocal2
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
