/* eslint-disable @next/next/no-img-element */
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json';
import {contractAddress} from '../config';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

export default function Employees (){
    const router = useRouter();
    const { id } = router.query; 
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = useCallback(async () =>{
      // Connect to the network
      
      //const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
      const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    
      //Load the contract        
      const contract = new ethers.Contract(contractAddress, SkillChain.abi, provider);
      const currentEmployees = await contract.curr_emp_of_organization(id);
      const orgEmployees = [];

      for (let i = 0; i < currentEmployees.length; i++) {
        const employee = await contract.employees(currentEmployees[i]);
        const meta = await axios.get(employee.metaurl);
        orgEmployees.push({
          id: parseInt(employee.id),
          name: meta.data.name,
          location: meta.data.location,
          position: meta.data.jobdescription,
          contactnum: meta.data.contactnum,
          image: meta.data.image,
          email: meta.data.email,
          role: employee.is_manager,
        });
      }

      setEmployees(orgEmployees);          
    }, [id]);
    

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    async function editRole(employeeId) {
      try {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, SkillChain.abi, signer);
        const tx = await contract.editemployeerole(employeeId);
        await tx.wait();
        console.log('Employee role updated successfully');
        alert('Employee role updated successfully');
        fetchEmployees();
      } 
      catch (err) {
        console.error('Error updating employee role:', err);
        alert('Error updating employee role:');
      }
    }

    async function removeEmployee(employeeId) {
      try {
        // call the Solidity function
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, SkillChain.abi, signer);
        const tx = await contract.remove_employee(id, employeeId);
    
        // wait for the transaction to be mined
        await tx.wait();
    
        console.log('Employee removed successfully!');
        alert('Employee removed successfully!');
          
        fetchEmployees();
      } 
      catch (error) {
        console.error(error);
        alert('Error removing employee!');
      }
    }

    return (
        <div>
          <div>
            {employees.map((item) => {
              return (
                <div className='p-2 m-2 flex flex-row justify-around items-center bg-gray-800 border-solid rounded-lg ' key={item.id}>
                  <div>
                    <p className='text-white'>
                      <h1 className='font-medium text-lg text-white inline'>
                          {item.name}
                      </h1><br/>
                    
                      Employee ID: {item.id} | Position: {item.position} | Location: {item.location}
                      <br/>
                      Contact: {item.contactnum} | Email: {item.email} | Role: {item.role ? 'Manager' : 'Employee'}
                      <br/>
                      <button
                        className='bg-green-800 hover:bg-green-700 text-white font-bold text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        onClick={() => editRole(item.id)}
                      >
                        Change Role
                      </button>
                      <button
                        className={
                          'bg-red-800 text-white active:bg-red-800 font-bold text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        }
                        type='button'
                        onClick={() => removeEmployee(item.id)}>
                        Remove
                      </button>
                    </p>
                  </div>
                  <div>
                      
                    <img
                        src={item.image}
                        alt='Profile'
                        className='w-36 h-36 rounded-full object-cover object-center'
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    );
}