import React, { useState, useEffect } from 'react';
import { utils } from 'ethers'
import web3, { Web3 } from 'web3'
import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import Decimal from "decimal.js"
import { Form, Button, Input, message, Typography } from 'antd';
import http from '../libs/http';
import config, { AdventureLayer } from '../config';
import styles from './index.module.css'; // 导入 CSS 模块
import Logo1  from '../img/Logo1.svg'; // 导入 SVG 作为组件
import Logo2  from '../img/Logo2.svg'; // 导入 SVG 作为组件
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

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

  useEffect(() => {
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [error]);

  return (
    <div className={styles.connectBox}
      onClick={() => {
        if (!account) {
          activateBrowserWallet();
        } else {
          deactivate();
        }
      }}>
      <div className={styles.connectBtn}>
        {rendered === "" && "Connect"}
        {rendered !== "" && rendered}
      </div>
    </div>
  );
}


const HomeIndex = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isAddressDisabled, setIsAddressDisabled] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [addressBalance, setAddressBalance] = useState(0);

  const { account } = useEthers();
  const { ens } = useLookupAddress();
  const [toWeb3, setToWeb3] = useState(new Web3(AdventureLayer.rpcUrl))

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

  const handleSubmit = () => {
    const formData = form.getFieldsValue();
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className={styles.container}>
      <div className={styles.menuBox}>
        <div className={styles.logoBox}>
          <img src={Logo1} className={styles.logo} alt="Adventure Layer Logo" />
        </div>

        <WalletButton />
        <div className={styles.mobileMenuIcon} onClick={toggleMenu}>
          {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </div>
      </div>
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.itemBox}>
          <a className={styles.MobileMenuItem} href={config.faucetUrl} target="_blank" rel="noopener noreferrer">Faucet</a>
          <a className={styles.MobileMenuItem} href={config.explorerUrl} target="_blank" rel="noopener noreferrer">Explorer</a>
          <a className={styles.MobileMenuItem} href={config.bridgeUrl} target="_blank" rel="noopener noreferrer">Bridge</a>
          <a className={styles.MobileMenuItem} href={config.docsUrl} target="_blank" rel="noopener noreferrer">Doc</a>
          </div>
        </div>
      )}

      <div className={styles.formBox}>
        <div className={styles.logoBox}>
          <img src={Logo2} className={styles.logo} alt="Adventure Layer Logo2" />
        </div>

        <div className={styles.titleBox}>
          <div className={styles.title}>Adventure Layer Devnet Faucet</div>
          <div className={styles.desc}>Fast and reliable. <span className={styles.descNum}>0.5</span> Adventure Layer Devnet AGLD/day.</div>
          <div className={styles.rpc}>RPC Endpoint for Adevnture Layer Devnet: <a className={styles.rpc_url} href={config.rpcUrl} target="_blank" rel="noopener noreferrer">{config.rpcUrl}</a></div>
        </div>
        <div className={styles.sendBox}>
          <div className={styles.send}>
            <Form form={form} layout="inline" style={{ width: '100%' }}>
              {showBalance && (
                <Form.Item style={{width: "100%"}}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text strong style={{ color: "#fff" }}>Balance: </Text>
                    <Text type="success" style={{ color: "#f39b4b", marginLeft: 8 }}> {addressBalance} Devnet AGLD</Text>
                  </div>
                </Form.Item>
              )}
              <Form.Item name="toAddress" rules={[{ required: true, message: 'Please input your Devnet AGLD address!' }]}
                style={{ width: '100%' }}>
                <Input disabled={isAddressDisabled} className={styles.customInput} size="large" placeholder="Enter your devnet agld address" />
              </Form.Item>
              <Form.Item style={{ width: '100%' }} >
                {/* <Button  className={styles.customSendBtn} style={{ background: "#f39b4b", fontSize: "16px", fontWeight: "600", height: '34px', color: "#000", border: "1px solid #f39b4b" }} size='large' type="primary" onClick={handleSubmit} loading={loading}> */}
                <div className={styles.customSendBtn}  onClick={handleSubmit} loading={loading}>
                  Send Me Devnet AGLD
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className={styles.faqBox}>
          <div className={styles.faq}>
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
    </div>
  );
};

export default HomeIndex;
