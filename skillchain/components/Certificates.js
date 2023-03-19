import { useState, useCallback, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json';
import {contractAddress} from '../config';
import Web3Modal from 'web3modal';

const MUMBAI_INFURA = process.env.MUMBAI_INFURA;

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

export default function Certificates () {
    const router = useRouter();
    const { id } = router.query;
    const [showModal, setShowModal] = useState(false);
    const [skillId, setSkillId] = useState('');
    const [certificates, setCertificates] = useState([]);
    const [active, setActive] = useState(0);
    const [loadingState, setLoadingState] = useState('');
    const [formInput, updateFormInput] = useState({ 
        name: "", 
        issuer: "",
        link: "", 
        issueDate: "",
        validityDate: ""
    });

    const getCertificates = useCallback(async () => {
      try {
        // Connect to the network
        //const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
        //const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');        
        const provider = new ethers.providers.JsonRpcProvider(MUMBAI_INFURA);
    
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
        console.error(e);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    

    useEffect(() => {
        getCertificates();
    }, [getCertificates]);

    const uploadToIPFS = useCallback( async  () =>{
      const {name, issuer, link, issueDate, validityDate} = formInput
      if (!name || !issuer || !issueDate) return
      /* first, upload to IPFS */
      const data = JSON.stringify({
        name, issuer, link, issueDate, validityDate
      })
      try {
        const added = await client.add(data)
        const url = `https://ipfs.io/ipfs/${added.path}`
        alert('File uploaded succesfully')
        /* after file is uploaded to IPFS, return the URL to use it in the transaction */
        return url
      } 
      catch (error) {
        console.log('Error uploading file: ', error)            
        alert('Error uploading file')
        return
      }  
    },[formInput])

    const addCertificate = useCallback(async () => {      
      setShowModal(false);
      if (certificates.some((cert) => cert.name === formInput.name))
        alert('Error! Certificate with this name exists, add another certificate!');
      else {
        try {
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          const provider = new ethers.providers.Web3Provider(connection);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, SkillChain.abi, signer);
          const skillids = await contract.skills_of_individual(id);
          if(skillids.length > 0) {
            const metaurl = await uploadToIPFS();
            const tx = await contract.add_certification(id, metaurl, skillId);
            const receipt = await tx.wait();
            if (receipt.status === 1) {     
              alert('Certificate added successfully! Refresh window');
            }
            console.log(`Transaction hash: ${tx.hash}`); 
            getCertificates();
          }
          else {
            alert('No skill to link to');
          }
        } 
        catch (e) {                
          alert('Error adding certificate!');
          console.error(e);
        }
      }
    }, [certificates, formInput.name, id, uploadToIPFS, skillId, getCertificates]);

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
            <div>
              <button
                className='bg-green-800 text-white active:bg-red-800 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowModal(true)}>
                Add Certificate
              </button>
            </div>
            {showModal ? (
              <div>
                {' '}
                <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                  <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                    {/*content*/}
                    <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none'>
                      {/*header*/}
                      <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                        <h4 className='text-3xl font-semibold text-white text-center'>
                          Add Certificate
                        </h4>
                        <button
                          className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                          onClick={() => setShowModal(false)}>
                          <span className='bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none'>
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className='relative p-6 flex-auto my-4 text-white text-lg leading-relaxed'>
                        <form className='mx-auto'>
                        <label>Skill Id: </label><br/>
                          <input
                            className='border-solid border-black px-2'
                            type='text'
                            required
                            onChange={e => setSkillId(e.target.value )}></input>
                          <br />
                          <label>Certificate Name: </label><br/>
                          <input
                            placeholder='Eg: Blockchain Specialization'
                            className='border-solid border-black px-2'
                            type='text'
                            required
                            onChange={e => updateFormInput({ ...formInput, name: e.target.value })}></input>
                          <br />
                          <label>Issue Date: </label><br/>
                          <input
                            placeholder='Eg: MM/DD/YYYY'
                            className='border-solid border-black px-2'
                            type='text'
                            required
                            onChange={e => updateFormInput({ ...formInput, issueDate: e.target.value })}></input>
                          <br />
                          <label>Issuer: </label><br/>
                          <input
                                placeholder='Enter issuer name'
                                className='border-solid border-black px-2'
                                required
                                onChange={e => updateFormInput({ ...formInput, issuer: e.target.value })}>                            
                          </input>
                          <br />
                          <label>Valid Till:</label><br/>
                          <input
                                placeholder='Enter expiry date or Indefinite if none'
                                className='border-solid border-black px-2'
                                required
                                onChange={e => updateFormInput({ ...formInput, validityDate: e.target.value })}>
                          </input>
                          <br />
                          <label>Link:</label><br/>
                          <input
                                placeholder='Copy link url and paste or None if none'
                                className='border-solid border-black px-2'
                                required
                                onChange={e => updateFormInput({ ...formInput, link: e.target.value })}></input>
                          <br />
                        </form>
                      </div>
                      {/*footer*/}
                      <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                        <button
                          className='text-white bg-red-500 font-bold  px-6 py-2 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                          type='button'
                          onClick={() => setShowModal(false)}>
                          Close
                        </button>
                        <button
                          className='bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                          type='button'
                          onClick={addCertificate}>
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
              </div>
            ) : (
              <div></div>
            )}
          </sidebar>
          <main className='w-3/4 px-0 sm:py-6 sm:px-0 inline-block float-right mt-0'>
            {ActiveItem()}
          </main>
        </div>
      );
}