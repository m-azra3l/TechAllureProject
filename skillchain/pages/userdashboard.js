import Image from 'next/image'
import styles from '@/styles/index.module.css'
import Link from 'next/link'
import UserProfile from '@/components/UserProfile'
import Skills from '@/components/Skills'
import Certificates from '@/components/Certificates'
import { useState } from 'react'

export default function UserDashBoard(){
    
      const items = [
        { id: 1, name: 'Skills' },
        { id: 2, name: 'Certificates' },     
      ];
      
  
      const [active, setActive] = useState(1);
  
      const ActiveItem = () => {
        switch (active) {
            case 1:
                return <Skills/>                 
            case 2:
                return <Certificates/>;
            default:
                return <Skills/>
        }
      };
      return(
        <>
          <div className={`${styles.header} ${styles.nav}`}>
            <div className={styles.container}>
              <div className={`${styles.row} ${styles.itemscenter} ${styles.mblg}`}>
                <div className={`${styles.column} ${styles.alignleft}`}>
                  <Link href="/" className={styles.winlineblock}>
                      <div className={styles.logo}><Image src="/webclip.PNG" width={50} height={50} alt="SkillChain"/> <h3 style={{ color: 'dodgerblue' }}>SkillChain</h3></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div style={{ minHeight: 'calc(100vh - 80px)',marginTop:'70px'}}>
            <header className='bg-gray-800 shadow'style={{marginTop:'70px'}}>
              <div className='max-w-9xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-white'>
                  DashBoard
                </h1>
                <div className='flex'>
                  <Link href='/accountlist?type=users' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>View Users</Link>
                  <Link href='/accountlist?type=organizations' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>View Organizations</Link>
                </div>
              </div>
            </header>
            <div className='flex mx-auto py-6 sm:px-6 lg:px-8 h-4/5'>
              <sidebar className=' w-1/4 bg-gray-800 mx-auto sm:px-6 lg:px-8  float-left text-gray-300'>                
                {items.map((item, i) => {
                    return (
                    <div
                        key={i}
                        className={`m-2 p-2 text-xl hover:bg-gray-300 hover:text-gray-800 w-full`}
                        onClick={(i) => {
                        setActive(item.id);
                        }}>
                        {item.name}
                    </div>
                    );
                })}
              </sidebar>
              <main className='w-3/4 lg:px-8 sm:px-6 mx-auto inline-block float-right h-full '>
                <h1 className='text-xl font-bold text-white'>
                  &nbsp;&nbsp;&nbsp;Profile
                </h1>
                <br/>
                <div className='border-4 border-solid border-gray-200 rounded-lg h-2/6 mx-5 mt-0 mb-1'>
                  <UserProfile/>
                </div>
                <h1 className='text-xl font-bold text-white'>
                  &nbsp;&nbsp;&nbsp;{items.find((item) => item.id === active).name}
                </h1>
                <br/>
                <div className='border-4 border-solid border-gray-200 rounded-lg h-4/6 mx-5 mt-2'>
                  {ActiveItem()}
                </div>
              </main>
            </div>
          </div>
        </>
      )
      
}