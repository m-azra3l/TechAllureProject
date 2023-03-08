/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { ethers, BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import styles from '@/styles/index.module.css'
import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json'
import {contractAddress} from '../config'

export default function ViewUserProfile (){
    const router = useRouter();
    const { id } = router.query;
    const [userData, setUserData] = useState([]);
    
    useEffect(() => {       
        (async () => {
            try {
                const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
                //const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
                
                const contract = new ethers.Contract(contractAddress, SkillChain.abi, provider);
                let user;
                if(id){
                    user = await contract.employees(id);
                    const meta = await axios.get(user.metaurl);
                    console.log(user.metaurl)
                    const userData = {
                        id: parseInt(user.id),
                        name: meta.data.name,
                        location: meta.data.location,
                        position: meta.data.jobdescription,
                        image: meta.data.image,
                        contactnum: meta.data.contactnum,
                        email: meta.data.email,
                        linkedinurl: meta.data.linkedinurl
                    }
                    setUserData(userData);
                }
            } 
            catch (e) {
                alert('Error fetching user information!')
                console.log(e);
            }
        })();
    }, [id]);

    return (
        <div className='flex flex-row h-full w-full p-3 items-center justify-items-stretch text-gray-600'>
            <div className='w-4/6 h-full'>
                <h1 className='text-lg text-white'>{userData.name} | Id: {userData.id}</h1>
                <p className='pt-5 text-md text-white'>
                    {userData.position} | {userData.location}<br/>
                    Contact: {userData.contactnum} | Email: {userData.email} |&nbsp;
                    LinkedIn: {userData.linkedinurl}
                </p>
            </div>
            <div className='w-2/6 h-full flex flex-row justify-end'>
                <div className='border-black w-36 h-36 border-solid rounded-full bg-gray-500'>
                <div>
                    <img
                        src={userData.image}
                        alt='Profile'
                        className='w-36 h-36 rounded-full object-cover object-center'
                    />
                </div>
                </div>          
            </div>
        </div>
    );
}