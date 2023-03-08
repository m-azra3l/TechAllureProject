import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import axios from 'axios'

import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json'
import {contractAddress} from '../config'
import Web3Modal from 'web3modal'

export default function ViewCertificates () {
    const router = useRouter();
    const { id } = router.query;
    const [loadingState, setLoadingState] = useState('');
    const [certificates, setCertificates] = useState([
        {
          id: null,
          name: ' ',
          issueDate: new Date(),
          validityDate: null,
          issuer: ' ',
          link: '',
        },
    ]);
    const [active, setActive] = useState(0);

    const getCertificates = useCallback(async () => {
      try {
        // Connect to the network
        const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
        //const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    
        // Load the contract        
        const contract = new ethers.Contract(contractAddress, SkillChain.abi, provider);
        const skillids = await contract.skills_of_individual(id);
        const newCertificates = [];
        for (let skid of skillids) {
          const cids = await contract.cert_of_skill(skid);          
          const skill = await contract.skills(skid);
          for (let cid of cids) {
            if (!certificates.some((certi) => certi.id === parseInt(cid))) {
              const certi = await contract.certifications(cid);
              const meta = await axios.get(certi.metaurl);
              newCertificates.push({
                id: parseInt(certi.id),
                issueDate: meta.data.issueDate,
                validity: meta.data.validityDate,
                name: meta.data.name,
                issuer: meta.data.issuer,
                link: meta.data.link,
                skill: skill.name
              });
            }
          }
        }
        setCertificates((certs) => [...certs, ...newCertificates]);        
        setLoadingState('loaded');
      } 
      catch (e) {
        console.log('fetch error');
        alert('Error getting certificates');
        console.error(e);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        getCertificates();
    }, [getCertificates]);

    const ActiveItem = useCallback(() => {
      switch (active) {
        case -1:
          return <h1 className="text-white">No option selected</h1>;
        default:
          const index = certificates.findIndex((cert) => cert.id === active);
          const info = certificates[index];
          return info ? <Info info={info} /> : null;
      }
    }, [active, certificates]);
    
    const Info = ({ info }) => {
      if (!info) {
        return null;
      }
      return (
        <div className='p-6 m-2 flex flex-row justify-between items-center bg-gray-800 border-solid rounded-lg '>
          <h1 className="text-lg font-semibold text-white inline">
            Certificate: {info.name}
            <br/>
            Skill: {info.skill}  
          </h1>
          <br/>
          <p className='font-medium text-md text-white inline'>
            Issuer: {info.issuer}
            <br/>
            Issue Date: {info.issueDate}
            <br/>
            Valid Till: {info.validity}
            <br/>
            Link: {info.link}                  
          </p>
        </div>
      );
    };

    return (
        <div className='flex mx-auto p-0  h-full'>
          <sidebar className=' w-1/4 bg-gray-800 mx-0 sm:px-6 lg:px-8  float-left text-gray-300'>
            {loadingState === 'loaded' && certificates.length ? (
              certificates.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`m-2 p-2 text-l hover:bg-gray-300 hover:text-gray-800 w-full`}
                    onClick={() => {
                      setActive(item.id);
                    }}>
                    {item.name}
                  </div>
                );
              })):(
                <></>
            )}
          </sidebar>
          <main className='w-3/4 px-0 sm:py-6 sm:px-0 inline-block float-right mt-0'>
            {ActiveItem()}
          </main>
        </div>
      );
}