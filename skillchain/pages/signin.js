/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { ethers } from 'ethers';
import styles from '@/styles/index.module.css';
import Image from 'next/image';
import Web3Modal from 'web3modal';

import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json';
import {contractAddress} from '../config';

export default function SignIn(){
    const router = useRouter();
    const [email, setEmail] = useState('');

    async function handleSignIn() {
      // Connect to the contract
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, SkillChain.abi, signer);
  
      try {
        // Call the login function with the email input
        const [accountType, id] = await contract.signin(email);
        
        if (accountType === 'organization') {
          alert("Successful! Welcome back");
          // Redirect to the organization dashboard
          router.push(`/orgdashboard?id=${id}`);
        } else {
          alert("Successful! Welcome back");
          // Redirect to the user dashboard
          router.push(`/userdashboard?id=${id}`);
        }
      } 
      catch (error) {
        if (error.message.includes("incorrect wallet address used for signing in")) {
          alert("Incorrect email or wallet address used for signing in");
          web3Modal.clearCachedProvider();
        } 
        else {
          console.log(error);
        }
      }
    }
    return (
      <>
        <div className={`${styles.header} ${styles.nav}`}>
          <div className={styles.container}>
            <div className={`${styles.row} ${styles.itemscenter} ${styles.mblg}`}>
              <div className={`${styles.column} ${styles.alignleft}`}>
                <Link href="/" className={styles.winlineblock}>
                    <div className={styles.logo}><Image src="/webclip.PNG" width={50} height={50} alt="SkillChain"/> <h3 style={{ color: 'dodgerblue' }}>SkillChain</h3></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.section} style={{ minHeight: 'calc(100vh - 80px)'}}>
          <div className={`${styles.container} ${styles.mt3xl} ${styles.mb3xl}`}>
            <div className={styles.row}>
              <div className={`${styles.column} ${styles.aligncenter}`}>
                <div className={styles.form}>
                  <h2>Sign In</h2>
                  <p className={styles.forgot}>Welcome Back</p>
                  <div className={styles.input}>
                    <div className={styles.inputBox}>
                      <input required type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>    
                    <div className={styles.inputBox}>
                      <input type="submit" onClick={handleSignIn} value="Signin"/>
                    </div>
                  </div>            
                  <p className={styles.forgot}>
                    Don't have an account? &nbsp;
                    <Link href="/signup" className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                      Signup
                    </Link>
                  </p>            
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}