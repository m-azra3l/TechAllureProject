/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json'
import {contractAddress} from '../config'

export default function OrgProfile (){
    const [showModal, setShowModal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();
    const { id } = router.query;
    const [orgData, setOrgData] = useState([]);
    const [contract, setContract] = useState(null);
    const [employeeId, setEmployeeId] = useState('');
    const [email, setEmail] = useState('');
    const [walletAdd, setWalletAdd] = useState('');
    
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    // useEffect(() => {
    //   async function fetchData() {
    //     // Check if the user has previously connected their wallet
    //     const web3Modal = new Web3Modal()
    //     const connection = await web3Modal.connect()
    //     const provider = new ethers.providers.Web3Provider(connection)
    //     const signer = provider.getSigner();
    //     const contract = new ethers.Contract(contractAddress, SkillChain.abi, signer);
    //     setContract(contract);
    
    //     if (connection && connection.selectedAddress) {
    //       setIsWalletConnected(true);
    //     } 
    //     else {
    //       router.push('/signin');
    //     }
    
    //   }
    
    //   fetchData();
    // }, [router]);
    
    
    
    
    const loadData = useCallback(async () => {      
      alert('Please wait for profile to load completely'); 
      try {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const iprovider = new ethers.providers.Web3Provider(connection)
        const signer = iprovider.getSigner();
        const contract = new ethers.Contract(contractAddress, SkillChain.abi, signer);
        setContract(contract);
    
        if (connection && connection.selectedAddress) {
          setIsWalletConnected(true);
        } else {
          router.push('/signin');
        }
    
        const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
        //const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    
        // Load the contract        
        const icontract = new ethers.Contract(contractAddress, SkillChain.abi, provider);
        let org;
        org = await icontract.organizations(id);
        const signerAddress = await signer.getAddress();
        if (org.wallet_address != signerAddress)
        {
          alert('Wrong address')
          router.push('/signin')
        }
        else{
          if (!org) {
            alert(`Could not find organization with ID ${id}`);
          }
          const meta = await axios.get(org.metaurl);
          if (!meta.data) {
            alert(`Could not fetch metadata for organization with ID ${id}`);
          }
          const orgData = {
            id: parseInt(org.id),
            name: meta.data.name,
            location: meta.data.location,
            image: meta.data.image,
            current_employees: (await icontract.curr_emp_of_organization(id)).length,
            previous_employees: (await icontract.prev_emp_of_organization(id)).length,
          }
          setOrgData(orgData);
        }
    } 
    catch (e) {
      console.log(e);
    }
      
    }, [id, router]);
    
    useEffect(() => {
      loadData();
    }, [loadData]);

    // Function to add an employee to an organization
    const handleAddEmployee = async (e) => {
      setShowModal(false);
      try {
        if(id)
        {
          e.preventDefault();
          const tx = await contract.add_employee(id, employeeId);
          await tx.wait();          
          loadData();
          alert('Employee added successfully! Refresh window');
        }
      } 
      catch (error) {
        console.log(error);
        alert('Error adding employee');
      }
    };
    
    const handleWalletUpdate = async (e) => {
      setShowForm(false);
      try {
        if(id)
        {
          e.preventDefault();
          const tx = await contract.update_wallet_address(email, walletAdd);
          await tx.wait();
          alert('Wallet address updated successfully, switch to the wallet address');
          loadData();
        }
      } 
      catch (error) {
        console.log(error);
        alert('Error! Failed to update wallet address');
      }
    };    

    return (
        <div className='flex flex-row h-full w-full p-3 items-center justify-items-stretch text-gray-600'>
          <div className='w-4/6 h-full'>
            <h1 className='text-lg text-white'>{orgData.name}</h1>
            <p className='text-md text-white'>Id: {orgData.id} | {orgData.location}</p>
              <p className='text-white text-md'>
                {orgData.current_employees} Current Employees |&nbsp; 
                {orgData.previous_employees} Previous Employees 
                <br/>
                <button
                className={
                  'bg-green-800 inline text-white active:bg-red-800 font-bold text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                }
                type='button'
                onClick={() => setShowModal(true)}>
                Add Employee
              </button>
              &nbsp;
              <button
                className={
                  'bg-blue-800 inline text-white active:bg-red-800 font-bold text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                }
                type='button'
                onClick={() => setShowForm(true)}>
                Update Wallet Address
              </button>
            </p>            
          </div>
          <div className='w-2/6 h-full flex flex-row justify-end'>
            <div className='border-black w-36 h-36 border-solid rounded-full bg-gray-500'>
              <div>
                <img
                    src={orgData.image}
                    alt='Profile'
                    className='w-36 h-36 rounded-full object-cover object-center'
                />
              </div>
            </div>
            <div>
              
            </div>
          </div>
    
          {showModal ? (
            <div>
              {' '}
              <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                  {/*content*/}
                  <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                    {/*header*/}
                    <div className='flex items-start justify-between p-5 border-b bg-gray-800 border-solid border-blueGray-200 rounded-t'>
                      <h4 className='text-3xl font-semibold text-white text-center'>
                        Add Employee
                      </h4>
                      <button
                        className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                        onClick={() => setShowModal(false)}>
                        <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className='relative p-6 flex-auto my-4 text-white bg-gray-800 text-lg leading-relaxed'>
                      <form className='mx-auto bg-gray-800'>
                        <label className='px-1'>Employee Id:</label> 
                        <br/>   
                        <input
                          className='border-solid border-black px-2'
                          type='text'
                          required
                          onChange={(e) => {
                            setEmployeeId(e.target.value);
                          }}></input>
                      </form>
                    </div>
                    {/*footer*/}
                    <div className='flex items-center justify-end p-6 bg-gray-800 border-t border-solid border-blueGray-200 rounded-b'>
                      <button
                        className='text-white background-transparent font-bold text-sm px-6 py-3 bg-red-800 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={() => setShowModal(false)}>
                        Close
                      </button>
                      <button
                        className='bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={handleAddEmployee}>
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
           {showForm ? (
            <div>
              {' '}
              <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                  {/*content*/}
                  <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                    {/*header*/}
                    <div className='flex items-start justify-between p-5 border-b bg-gray-800 border-solid border-blueGray-200 rounded-t'>
                      <h4 className='text-xl font-semibold text-white text-center'>
                        Change Wallet Address
                      </h4>
                      <button
                        className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                        onClick={() => setShowForm(false)}>
                        <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className='relative p-6 flex-auto my-4 text-white bg-gray-800 text-lg leading-relaxed'>
                      <form className='mx-auto bg-gray-800'>
                        <label className='px-1'>Email:</label>
                        <br/>
                        <input
                          className='border-solid border-black px-2'
                          type='text'
                          required
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}></input>
                          <br/>
                        <label className='px-1'>New Wallet Address:</label>
                        <br/>
                        <input
                          className='border-solid border-black px-2'
                          type='text'
                          required
                          onChange={(e) => {
                            setWalletAdd(e.target.value);
                          }}></input>
                      </form>
                    </div>
                    {/*footer*/}
                    <div className='flex items-center justify-end p-6 bg-gray-800 border-t border-solid border-blueGray-200 rounded-b'>
                      <button
                        className='text-white background-transparent font-bold text-sm px-6 py-3 bg-red-800 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={() => setShowForm(false)}>
                        Close
                      </button>
                      <button
                        className='bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={handleWalletUpdate}>
                        Update
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