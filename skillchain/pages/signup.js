/* eslint-disable @next/next/no-img-element */
import React, { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import styles from '@/styles/index.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { useDropzone } from "react-dropzone";
import Web3Modal from 'web3modal';

import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json';
import {contractAddress} from '../config';

const projectId = process.env.IPFS_ID;   // <---------- your Infura Project ID

const projectSecret = process.env.IPFS_KEY;  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

export default function SignUp(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [acc_type, setAccType] = useState('');    
    const [imageUrl, setImageUrl] = useState(null);
    const [formInput, updateFormInput] = useState({ name: "", location: "",linkedinurl:"", jobdescription: "",contactnum: "", webaddress: "", description: "" })

    const handleAccTypeChange = (e) => {
      setAccType(e.target.value);
    };

    const onDrop = useCallback(async (acceptedFile) => {
        const url = await uploadImage(acceptedFile[0]);
        setImageUrl(url);
        alert("Image uploaded successfully");        
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxSize: 1024000,
    });

   
    const uploadImage = async (file) => {
        try {
            alert("Please wait while image upload");
            const added = await client.add({ content: file });        
            const url = `https://ipfs.io/ipfs/${added.path}`;        
            return url;          
        } 
        catch (error) {
            console.log("Error uploading file to IPFS");
            alert("Error uploading file to IPFS");
        }
    };

    async function uploadToIPFS() {
        if (acc_type === 'organization'){
            const {name, location, linkedinurl, webaddress, description} = formInput
            if (!name || !location  || !linkedinurl || !webaddress || !description || !imageUrl || !email) return
            /* first, upload to IPFS */
            const data = JSON.stringify({
                name, location, linkedinurl, webaddress, description, image: imageUrl, email: email
            })
            try {
                const added = await client.add(data)
                const url = `https://ipfs.io/ipfs/${added.path}`
                alert('File uploaded succesfully')
                /* after file is uploaded to IPFS, return the URL to use it in the transaction */
                return url
            } catch (error) {
                console.log('Error uploading file: ', error)            
                alert('Error uploading file: ', error)
                return
            }  
        }
        else{
            const {name, location, linkedinurl, jobdescription, contactnum} = formInput
            if (!name || !location  || !linkedinurl || !jobdescription || !contactnum || !imageUrl || !email) return
            /* first, upload to IPFS */
            const data = JSON.stringify({
                name, location, linkedinurl, jobdescription, contactnum, image: imageUrl, email: email
            })
            try {
                const added = await client.add(data)
                const url = `https://ipfs.io/ipfs/${added.path}`
                alert('File uploaded succesfully')
                /* after file is uploaded to IPFS, return the URL to use it in the transaction */
                return url
            } catch (error) {
                console.log('Error uploading file: ', error)            
                alert('Error uploading file: ', error)
                return
            }  
        }
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SkillChain.abi, signer);
        // Call the `sign_up` function on your contract
        try {            
            const metaurl = await uploadToIPFS();
            const tx = await contract.sign_up(email, metaurl, acc_type);
            const receipt = await tx.wait();
            if (receipt.status === 1) {                
                alert('Account created successfuly');
            }
            console.log(`Transaction hash: ${tx.hash}`);            
            router.push('/signin');
        } 
        catch (err) {
            console.error(err);
            alert('Error creating account');
        }
    };
    return(
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
        <div className={styles.section}>
          <div className={`${styles.container} ${styles.mt3xl} ${styles.mb3xl}`}>
                <div className={styles.row}>
                    <div className={`${styles.column} ${styles.aligncenter}`}>
                        <div className={styles.form}>
                            <h2>Sign Up</h2>
                            <p className={styles.forgot}>Create An Account</p>       
                            <label className={styles.forgot}>
                                Select Account Type: &nbsp;
                                <select value={acc_type} onChange={handleAccTypeChange}>
                                    <option value="">Select</option>
                                    <option value="organization">Organization</option>
                                    <option value="individual">Individual</option>
                                </select>
                            </label>
                            <br/>                            
                            <br/>
                            <div className={styles.uploadcontainerbox}>
                                <div>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div>
                                            <div>
                                                {imageUrl && (
                                                    <div>
                                                        <center>
                                                            <img
                                                                className={styles.imageInfo}
                                                                src={imageUrl}
                                                                alt="asset_file"
                                                            />
                                                        </center>
                                                    </div>
                                                )}
                                                {!imageUrl && (
                                                    <div>
                                                        <p className={styles.forgot}>
                                                            Upload File: .jpg, .jpeg, .png, .gif,  MAX 1MB
                                                        </p>
                                                        <center>
                                                            <Image
                                                                src="/upload.png"
                                                                width={50}
                                                                height={50}
                                                                alt="file upload"      
                                                            />
                                                        </center>
                                                        <div>
                                                            <p className={styles.forgot}>Drag & Drop File</p>
                                                            <p className={styles.forgot}>or Browse media on your device</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.input}>
                                {acc_type === 'organization' && (
                                    <>
                                        <div className={styles.inputBox}>
                                            <input required type="text" placeholder="Organization Name"onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
                                        </div>
                                        <div className={styles.inputBox}>
                                            <input required type="text" placeholder="Organization Email" onChange={(e) => setEmail(e.target.value)}/>   
                                        </div>
                                        <div className={styles.inputBox}>                 
                                            <input required type="text" placeholder="Head Office Location" onChange={e => updateFormInput({ ...formInput, location: e.target.value })}/>
                                        </div>
                                        <div className={styles.inputBox}>
                                            <input required type="text" placeholder="Official Web Address" onChange={e => updateFormInput({ ...formInput, webaddress: e.target.value })}/>
                                        </div>
                                        <div className={styles.inputBox}>
                                            <input required type="text" placeholder="Official LinkedIn Url" onChange={e => updateFormInput({ ...formInput, linkedinurl: e.target.value })}/>
                                        </div>
                                        <div className={styles.inputBox}>
                                            <input required type="text" placeholder="Organization Short Description" onChange={e => updateFormInput({ ...formInput, description: e.target.value })}/>
                                        </div>
                                    </>
                                )}                
                                {acc_type === 'individual' && (
                                    <>
                                    {/* Render individual-specific UI here */}
                                        <div className={styles.inputBox}>
                                            <input required type="text" placeholder="Full Name" onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
                                        </div>
                                        <div className={styles.inputBox}>
                                            <input required type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>   
                                        </div>
                                        <div className={styles.inputBox}>                 
                                            <input required type="text" placeholder="Location" onChange={e => updateFormInput({ ...formInput, location: e.target.value })}/>
                                        </div>
                                        <div className={styles.inputBox}>
                                            <input required type="text" placeholder="Official LinkedIn Url" onChange={e => updateFormInput({ ...formInput, linkedinurl: e.target.value })}/>
                                        </div>
                                        <div className={styles.inputBox}>
                                            <input required type="text" placeholder="Contact Number" onChange={e => updateFormInput({ ...formInput, contactnum: e.target.value })}/>
                                        </div>
                                        <div className={styles.inputBox}>
                                            <input required type="text" placeholder="Position" onChange={e => updateFormInput({ ...formInput, jobdescription: e.target.value })}/>
                                        </div>
                                    </>
                                )}
                                <div className={styles.inputBox}>
                                    <input type="submit" onClick={handleSubmit} value="Signup"/>
                                </div>
                            </div>            
                            <p className={styles.forgot}>
                                Have an account? &nbsp;
                                <Link href="/signin" className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                                    Signin
                                </Link>
                            </p>            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}