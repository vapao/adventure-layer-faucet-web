import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importing necessary modules from @usedapp/core
import { DAppProvider, Mainnet, Sepolia, ChainId, DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";

// Importing configuration for AdventureLayer
import { AdventureLayer as l2 } from './config'

/**
 * Generates a link to the address on the block explorer.
 * @param {string} explorerUrl - The base URL of the block explorer.
 * @returns {function} - A function that takes an address and returns the full URL to the address on the block explorer.
 */
const getAddressLink = (explorerUrl) => (address) => `${explorerUrl}/address/${address}`

/**
 * Generates a link to the transaction on the block explorer.
 * @param {string} explorerUrl - The base URL of the block explorer.
 * @returns {function} - A function that takes a transaction ID and returns the full URL to the transaction on the block explorer.
 */
const getTransactionLink = (explorerUrl) => (txnId) => `${explorerUrl}/tx/${txnId}`

/**
 * Configuration object for the AdventureLayer network.
 */
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

/**
 * Configuration object for the DAppProvider.
 */
const config = {
  // readOnlyChainId: Sepolia.chainId,
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: Mainnet.rpcUrl,
    [Sepolia.chainId]: Sepolia.rpcUrl,
    [AdventureLayer.chainId]: AdventureLayer.rpcUrl,
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, AdventureLayer],
}

// Creating the root element for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the React application with DAppProvider and BrowserRouter
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
