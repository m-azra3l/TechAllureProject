import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import Endorsement from './Endorsements';


import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json'
import {contractAddress} from '../config'
import Web3Modal from 'web3modal'

export default function Skills (){
    const router = useRouter();
    const { id } = router.query;
    const [showModal, setShowModal] = useState(false);    
    const [active, setActive] = useState(-1);
    const [newSkill, setNewSkill] = useState();
    const [skills, setSkills] = useState([]);
    const [loadingState, setLoadingState] = useState('');

    const getSkills = useCallback(async () => {
      try{
        // Connect to the network
        const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
        //const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
        
        // Load the contract        
        const contract = new ethers.Contract(contractAddress, SkillChain.abi, provider);
        const skillids = await contract.skills_of_individual(id);
        
        const promises = [];
        skillids.forEach(async (skillId) => {
          if (!skills.some((skill) => skill.id === parseInt(skillId)))
            promises.push(contract.skills(skillId));
        });
        if (promises.length > 0) {
            const newSkills = (await Promise.all(promises)).map((skill) => ({
              id: parseInt(skill.id),
              name: skill.name,
              verified: skill.verified,
            }));
            setSkills((skills) => [...skills, ...newSkills]);
            setLoadingState('loaded');
        }
      }
      catch(e){
        console.log(e);
      }
    }, [id, skills]);

    const addSkill = useCallback(async () => {      
      setShowModal(false);
      if (skills.some((skill) => skill.name === newSkill.name))
        alert('Error! Skill with this name exists, add another skill!');
      else {
          setNewSkill('');
          try {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, SkillChain.abi, signer);
            const tx = await contract.add_skill(id, newSkill);
            await tx.wait();            
            getSkills();
            alert('Skill added successfully! Refresh window');
          } 
          catch (e) {                
            alert('Error adding skill!');
            console.error(e);
          }
      }
    }, [id, skills, newSkill, getSkills]);

    useEffect(() => {
        getSkills();
      }, [getSkills]);

    const ActiveItem = useCallback(() => {
        switch (active) {
          case -1:
            return <h1 className='text-white'>No option selected</h1>;
          default:
            return <Endorsement skillId={active} />;
        }
      }, [active]);
    
      return (
        <div className='flex mx-auto p-0  h-full'>
          <sidebar className=' w-1/4 bg-gray-800 mx-0 sm:px-6 lg:px-8  float-left text-gray-300'>
            {loadingState === 'loaded' && skills.length ? (
              skills.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`m-2 p-2 flex flex-row text-l justify-around hover:bg-gray-300 hover:text-gray-800 w-full`}
                    onClick={(i) => {
                      setActive(item.id);
                    }}>
                      {item.name} | Id: {item.id}
                  </div>
                );
              })
            ):(
              <></>
            )}
            <div>
              <button
                className='bg-green-800 text-white active:bg-red-800 font-bold text-sm mx-6 px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowModal(true)}>
                Add Skill
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
                        <h3 className='text-3xl font-semibold text-white'>
                          Add New Skill
                        </h3>
                        <button
                          className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                          onClick={() => setShowModal(false)}>
                          <span className='bg-transparent text-white font-bold h-6 w-6 text-2xl block outline-none focus:outline-none'>
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className='relative p-6 flex-auto'>
                        <p className='my-4 text-white text-lg leading-relaxed'>                         
                          <label> Skill Name:&nbsp;</label>
                          <input
                            placeholder='Eg: Solidity'
                            className='border-solid border-black px-2'
                            value={newSkill}
                            onChange={(e) => {
                              setNewSkill(e.target.value);
                            }}></input>
                        </p>
                      </div>
                      {/*footer*/}
                      <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                        <button
                          className='text-white-500 bg-red-500 font-bold px-6 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                          type='button'
                          onClick={() => setShowModal(false)}>
                          Close
                        </button>
                        <button
                          className='bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                          type='button'
                          onClick={addSkill}>
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
            <h1 className='text-lg font-bold text-white'>
              &nbsp;&nbsp;&nbsp;{skills.find((item) => item.id === active)?.name || ''}
            </h1>
            {ActiveItem()}
          </main>
        </div>
      );
}