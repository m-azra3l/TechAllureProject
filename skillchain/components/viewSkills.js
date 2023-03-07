import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import Endorsement from './Endorsements'
import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json'
import {contractAddress} from '../config'

export default function ViewSkills (){
    const router = useRouter();
    const { id } = router.query;    
    const [active, setActive] = useState(-1);
    const [skills, setSkills] = useState([]);

    const getSkills = useCallback(async () => {
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
      }
    }, [id, skills]);

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
            {skills.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`m-2 p-2 flex flex-row text-l justify-around hover:bg-gray-300 hover:text-gray-800 w-full`}
                  onClick={(i) => {
                    setActive(item.id);
                  }}>
                  {item.name}
                </div>
              );
            })}
          </sidebar>
          <main className='w-3/4 px-0 sm:py-6 sm:px-0 inline-block float-right mt-0'>
            <h1 className='text-lg font-bold text-white'>
              {skills.find((item) => item.id === active).name}
            </h1>
            {ActiveItem()}
          </main>
        </div>
      );
}