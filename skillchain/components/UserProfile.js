/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json'
import {contractAddress} from '../config'
import Web3Modal from 'web3modal'

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

export default function UserProfile (){
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const { id } = router.query;
    const [userData, setUserData] = useState([]);
    const [contract, setContract] = useState(null);
    const [employeeId, setEmployeeId] = useState('');    
    const [skillId, setSkillId] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString('en-GB')); // initialize date to current date in YYYY-MM-DD format

    useEffect(() => {
        setDate(new Date().toLocaleDateString('en-GB')); // update date whenever the component mounts or updates
    }, []);


    
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    useEffect(() => {        
        (async () => {
          try {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const iprovider = new ethers.providers.Web3Provider(connection)
            const signer = iprovider.getSigner();
            const icontract = new ethers.Contract(contractAddress, SkillChain.abi, signer);           
            setContract(icontract);
      
            if (connection && connection.selectedAddress) {
              setIsWalletConnected(true);
            } else {
              router.push('/signin');
            }
            const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
            //const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
          
            // Load the contract        
            const contract = new ethers.Contract(contractAddress, SkillChain.abi, provider);
            let user;
            user = await contract.employees(id);
            const signerAddress = await signer.getAddress();
            if (user.wallet_address != signerAddress)
            {
              alert('Wrong address')
              router.push('/signin')
            }
            const meta = await axios.get(user.metaurl);
            const org  = await contract.organizations(user.organization_id);
            const orgmeta = await axios.get(org.metaurl);
            const userData = {
              id: parseInt(user.id),
              name: meta.data.name,
              orgname: orgmeta.data.name,
              location: meta.data.location,
              position: meta.data.jobdescription,
              image: meta.data.image,
              manager: user.is_manager
            }
            setUserData(userData);
          } catch (e) {
            console.log(e);
          }
        })();
      }, [id, router]);
      
    async function uploadToIPFS() {
        const vercomment = comment
        const verdate = date
        if (!vercomment || !verdate) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
            vercomment, verdate
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

    // Function to add an employee to an organization
    const endorseSkill = async (e) => {
        try {
            if(id !== employeeId){
              e.preventDefault();
              const metaurl = await uploadToIPFS();
              const tx = await contract.verify_skill(employeeId, skillId, metaurl);
              await tx.wait();
              setShowModal(false);
              alert('Skill endorsed successfully!');
            }
            else{
              alert("Endorser cannot endorse their own skill");  
              setShowModal(false);        
            }
        } 
        catch (error) {
          if (error.message.includes("Endorser cannot endorse their own skill")) {
            alert("Endorser cannot endorse their own skill");
            setShowModal(false);
          }
          else{
            console.log(error);
            alert('Error endorsing employee');
            setShowModal(false);
          } 
        }
    };

    return (
        <div className='flex flex-row h-full w-full p-3 items-center justify-items-stretch text-gray-600'>
          <div className='w-4/6 h-full'>
            <p className='text-lg text-white'>{userData.name}</p>
            <p className='text-lg text-white'>Id: {userData.id}</p>
            <p className='text-md text-white'>{userData.orgname} | {userData.position} | {userData.location} 
              <br/>
              <br/>
              {userData.manager ? (
                <button
                  className={
                    'bg-green-800 inline text-white active:bg-red-800 font-bold text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  }
                  type='button'
                  onClick={() => setShowModal(true)}>
                  Endorse Employee Skill
                </button>) : (<></>)}    
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
                        Endorse Employee Skill
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
                        <label className='px-1'>Employee Id:</label>    
                        <br/>
                        <input
                          className='border-solid border-black px-2'
                          type='text'
                          onChange={(e) => {
                            setEmployeeId(e.target.value);
                        }}></input>
                        <br/>
                        <label className='px-1'>Skill Id:</label>  
                        <br/>  
                        <input
                          className='border-solid border-black px-2'
                          type='text'
                          onChange={(e) => {
                            setSkillId(e.target.value);
                        }}></input>
                        <br/>
                        <label className='px-1'>Comment:</label>  
                        <br/>  
                        <input
                          className='border-solid border-black px-2'
                          type='text'
                          onChange={(e) => {
                            setComment(e.target.value);
                        }}></input>
                      </form>
                    </div>
                    {/*footer*/}
                    <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                      <button
                        className='text-white bg-red-500 background-transparent font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={() => setShowModal(false)}>
                        Close
                      </button>
                      <button
                        className='bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={endorseSkill}>
                        Endorse
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
        </div>
    );
}