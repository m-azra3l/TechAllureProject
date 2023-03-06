/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers'
import axios from 'axios'

import SkillChain from '../artifacts/contracts/SkillChain.sol/SkillChain.json'
import {contractAddress} from '../config'

 const Endorsement = ({skillId}) => {
    const [comments, setComments] = useState([]);

     
    const getComments = useCallback(async () => {
        const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
        //const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
      
        // Load the contract        
        const contract = new ethers.Contract(contractAddress, SkillChain.abi, provider);
        const cids = await contract.ver_of_skill(skillId);
        cids.forEach(async (cid) => {
            if (!comments.some((comment) => comment.id === parseInt(cid))) {
            const comment = await contract.verifications(cid);
            const meta = await axios.get(comment.metaurl);
            console.log(comment.metaurl)
            const endorser = await contract.employees(comment.verifier_id);
            const emeta = await axios.get(endorser.metaurl)
            setComments([
                ...comments,
                {
                    id: parseInt(cid),
                    endorser: emeta.data.name,
                    endorserposition: emeta.data.jobdescription,
                    endorserimage: emeta.data.image,
                    date: meta.data.verdate,
                    skid: skillId,
                    content: meta.data.vercomment,
                },
            ]);
            }
        });
    }, [comments, skillId]);

    useEffect(() => {
        setComments((comments) =>
            comments.filter((comment) => comment.skillId === skillId)
        );
    }, [skillId]);

    useEffect(() => {
        getComments();
    }, [getComments]);

    return (
        <div>
            {comments.length ? (
                comments.map((comment) => (
                <div className='p-6 m-2 flex flex-row justify-between items-center bg-gray-800 border-solid rounded-lg ' key={comment.id}>
                    <div>
                        <p className='font-medium text-lg text-white inline'>
                            {comment.endorser} | {comment.endorserposition}
                            <br/>
                            {comment.date} 
                        </p>
                        <br/>
                        <p className='font-medium text-md text-white inline'>                        
                            {comment.content}
                        </p>
                    </div>
                    <div>                      
                      <img
                          src={comment.endorserimage}
                          alt='Profile'
                          className='w-36 h-36 rounded-full object-cover object-center'
                      />
                    </div>
                </div>
                ))
            ) : (
                <div className='text-white'>No endorsements yet</div>
            )}
        </div>
    );

};
export default Endorsement;