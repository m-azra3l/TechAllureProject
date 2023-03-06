/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from '@/styles/index.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

//import SkillChain from '../abis/SkillChain.json';
// import {contractAddress} from '../abis/config';
import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json';
import {contractAddress} from '../config';

export default function OrgList (){

    const [orgs, setOrgs] = useState([]);

    async function fetchOrgs() {
        const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
        //const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
        const contract = new ethers.Contract(contractAddress, SkillChain.abi, provider);

        const numOrgs = await contract.getNumberOfOrganizations();

        const orgs = [];
        for (let i = 0; i < numOrgs; i++) {
            const org = await contract.getAllOrgs();
            const meta = await axios.get(org[i].metaurl)
            if (parseInt(org[i].id) !== 0) {
                orgs.push({
                    id: parseInt(org[i].id),
                    name: meta.data.name,
                    location: meta.data.location,
                    linkedinurl: meta.data.linkedinurl,
                    webaddress: meta.data.webaddress,
                    description: meta.data.description,
                    image: meta.data.image
                });
            }
        }
        setOrgs(orgs);        
    }

    useEffect(() => {
        fetchOrgs();
    }, []);

    return (
        <>
            {orgs.length > 0 ? (
                <>
                    <div className={`${styles.container} ${styles.mt2xl} ${styles.mb2xl}`}>
                        <div className={styles.row}>
                            <div className={`${styles.column} ${styles.aligncenter}`}>
                                <h2 className={`${styles.maxwlg} ${styles.textcenter} ${styles.textwhite}`}>List of Organizations</h2>
                                <p className={`${styles.textlg} ${styles.textcenter} ${styles.maxwmd} ${styles.textwhite}`}>
                                    Don't have an account? &nbsp;
                                    <Link href='/signup' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                                        Sign Up
                                    </Link> 
                                    <br/> 
                                    &nbsp;You can also&nbsp;
                                    <Link href='/accountlist?type=users' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                                        View Users
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.cardlist}>
                                {orgs.map((org, i) => (
                                    <div className={styles.profilecard} key={i}>
                                        <center><img src={org.image} alt="org profile" width={200} height={200} className={styles.profileimage} /></center>
                                        <br/>
                                        <center>
                                            <p className={styles.notice}>{org.name}</p>
                                            <p className={styles.notice}>Id: {org.id}</p>
                                            <p>{org.description}</p>
                                            <p>{org.location}</p>
                                            <p>
                                                Links: &nbsp;
                                                <br/>
                                                <Link href={org.linkedinurl} className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                                                    LinkedIn
                                                </Link>
                                                &nbsp;
                                                <Link href={org.webaddress} className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                                                    Official Web Link
                                                </Link>
                                            </p>
                                        </center>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className={`${styles.container} ${styles.mt2xl} ${styles.mb2xl}`}>
                    <div className={styles.row}>
                        <div className={`${styles.column} ${styles.aligncenter}`}>
                            <h2 className={`${styles.maxwlg} ${styles.textcenter} ${styles.textwhite}`}>No organizations registered yet</h2>
                            <p className={`${styles.textlg} ${styles.textcenter} ${styles.maxwmd} ${styles.textwhite}`}>
                                Be the first to &nbsp;
                                <Link href='/signup' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                                    Sign Up
                                </Link> 
                                <br/> 
                                &nbsp;You can also&nbsp;
                                <Link href='/accountlist?type=users' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                                    View Users
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}