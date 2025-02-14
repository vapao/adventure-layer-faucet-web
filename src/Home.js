import React, { useState, useEffect } from 'react';
import { utils } from 'ethers'
import web3, { Web3 } from 'web3'
import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import Decimal from "decimal.js"
import { Form, Input, Button, message, Typography } from 'antd';
import http from './libs/http';
import Turnstile from 'react-turnstile';
import config, { AdventureLayer } from './config';
import styles from './home.module.css'; // import css module stylesheet as styles
import Logo1 from './img/Logo1.svg';
import Logo2 from './img/Logo2.svg';

const { Text } = Typography;

/**
 * FAQ data for the application
 */
const faqData = [
  {
    question: 'How do I use this?',
    answer: 'To request funds, enter your wallet address, and hit “Send Me Devnet AGLD. We support wallets as received addresses but not smart contracts.'
  },
  {
    question: 'How does it Work?',
    answer: 'You can request 0.5 Adventure Layer Devnet AGLD every 24h.'
  },
  {
    question: 'What is Adventure Layer Devnet Faucet?',
    answer: 'Devnet AGLD Faucet is a developer tool to get Devnet AGLD in order to test and troubleshoot your decentralized application or protocol before going live on Adventure Layer mainnet, where one must use real Devnet AGLD. Most faucets require social authentication (e.g. Twitter post or login confirming you are a real human) or place you in a queue to wait for a token through the faucet. The Adventure Layer Devnet faucet is free, fast, and does not require authentication, though you can optionally login to Adventure Layer to get an increased drip.'
  }
];

/**
 * WalletButton component to connect or disconnect the user's wallet
 */
function WalletButton() {

  const [rendered, setRendered] = useState("");
  const { ens } = useLookupAddress();
  const { account, activateBrowserWallet, deactivate, error } = useEthers();

  useEffect(() => {
    if (ens) {
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
    } else {
      setRendered("");
    }
  }, [account, ens, setRendered]);

  // handle errors
  useEffect(() => {
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [error]);

  return (
    <Button className={styles.connect} variant="contained" size="medium"
      style={{padding: '4px 5px'}}
      onClick={() => {
        if (!account) {
          activateBrowserWallet();
        } else {
          deactivate();
        }
      }}>
      <div className={styles['connect-btn']}>
        {rendered === "" && "Connect AGLD"}
        {rendered !== "" && rendered}
      </div>
    </Button>
  );
}

/**
 * HomeIndex component for the main page of the application
 */
const HomeIndex = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('');
  const [isAddressDisabled, setIsAddressDisabled] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [addressBalance, setAddressBalance] = useState(0);

  const { account } = useEthers();
  const { ens } = useLookupAddress();
  const [toWeb3, setToWeb3] = useState(new Web3(AdventureLayer.rpcUrl))

   // Update form and balance when account changes
  useEffect(() => {
    // const formData = form.getFieldsValue();
    if (account) {
      setIsAddressDisabled(true)
      form.setFieldsValue({
        toAddress: account,
      });

      toWeb3.eth.getBalance(account).then((toBalance) => {
        const toBalanceAmount = new Decimal(toBalance.toString()).div(1000000000000000000).toFixed(5)
        // ethers.utils.formatEther(toBalance)
        setShowBalance(true)
        setAddressBalance(toBalanceAmount)
      })
    } else {
      setIsAddressDisabled(false)
      setShowBalance(false)
    }
  }, [account, ens, form, toWeb3.eth])

  // handle form submit
  const handleSubmit = () => {
    const formData = form.getFieldsValue();
    formData.token = token;
    setLoading(true);
    console.log('formData', formData);
    if (!formData.toAddress) {
      message.error('Please input your devnet agld address!');
      setLoading(false);
      return;
    }
    http.post('/api/sendEth', formData)
      .then(data => {
        console.log('data', data);
        setLoading(false);
        if (data.error) {
          message.error(data.error);
        } else {
          message.success('Success');
        }

        const formData = form.getFieldsValue();
        if (account && showBalance && formData.toAddress === account) {
          toWeb3.eth.getBalance(account).then((toBalance) => {
            const toBalanceAmount = new Decimal(toBalance.toString()).div(1000000000000000000).toFixed(5)
            setAddressBalance(toBalanceAmount)
          })
        }
      }, () => setLoading(false))
  }

  return (
    <div className={styles.container}>
      <div className={styles.menuBox}>
        <div className={styles.logoBox}>
          <img className={styles.logo} src={Logo1} alt='log1' />
          {/* <Logo1 className={styles.logo} alt="Adventure Layer Logo" /> */}
        </div>
          <div className={styles.menu}>
            <a className={styles.menuItem} href={config.faucetUrl} target="_blank" rel="noopener noreferrer">Faucet</a>
            <a className={styles.menuItem} href={config.bridgeUrl} target="_blank" rel="noopener noreferrer">Bridge</a>
            <a className={styles.menuItem} href={config.docsUrl} target="_blank" rel="noopener noreferrer">Doc</a>
        </div>
        <div className={styles.connect}>
          <div className={styles.button}>
            <WalletButton/>
          </div>
        </div>
      </div>

      <div className={styles.formBox}>
        <div className={styles.logoBox}>
          <img src={Logo2} className={styles.logo} alt="Adventure Layer Logo2" />
        </div>

        <div className={styles.titleBox}>
          <div className={styles.title}>Adventure Layer Devnet Faucet</div>
          <div className={styles.desc}>Fast and reliable. <span className={styles.descNum}>0.5</span> Adventure Layer Devnet AGLD/day.</div>
          <div className={styles.rpc}>RPC Endpoint for Adevnture Layer Devnet:  <a className={styles.rpc_url} href={config.rpcUrl} target="_blank" rel="noopener noreferrer">{config.rpcUrl}</a></div>
        </div>
        <div className={styles.sendBox}>
          <div className={styles.send}>
            <Form form={form} layout="inline" style={{ width: '100%' }}>
              <Form.Item name="toAddress" rules={[{ required: true, message: 'Please input your Devnet AGLD address!' }]}
                disabled={isAddressDisabled}
                style={{ width: '480px', height: '44px', color: '#211a12' }}>
              <Input disabled={isAddressDisabled} className={styles.customInput} size="large" placeholder="Enter your Devnet AGLD address" />
              </Form.Item >

              <Form.Item style={{ width: "40px" }}>
                <Button style={{ background: "#f39b4b", fontSize: "16px", fontWeight: "600", color: "#000", border: "1px solid #f39b4b" }} size='large' type="primary" onClick={handleSubmit} loading={loading}>
                Send Me Devnet AGLD
                </Button>
              </Form.Item>
              {showBalance && (
                <Form.Item style={{width: "100%"}}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text strong style={{ color: "#fff" }}>Balance: </Text>
                    <Text type="success" style={{ color: "#f39b4b", marginLeft: 8 }}> {addressBalance} Devnet AGLD</Text>
                  </div>
                </Form.Item>
              )}
              <Form.Item>
                <Turnstile
                  sitekey={config.turnstileSiteKey}
                  onVerify={(token) => setToken(token)}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className={styles.faqBox}>
          <span className={styles.title}>FAQ</span>
          {faqData.map((item, index) => (
            <div key={index}>
              <div className={styles.qa}>{item.question}</div>
              <div className={styles.desc}>{item.answer}</div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default HomeIndex;
