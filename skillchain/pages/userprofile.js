import Image from 'next/image'
import styles from '@/styles/index.module.css'
import Link from 'next/link'
import ViewUserProfile from '@/components/viewUserProfile'
import ViewSkills from '@/components/viewSkills'
import ViewCertificates from '@/components/viewCertificates'
import { useState } from 'react'
import { useRouter } from "next/router"

export default function Profile(){
    
  const items = [
    { id: 1, name: 'Skills' },
    { id: 2, name: 'Certificates' },      
  ];
  
  const router = useRouter();

  function handleClick() {
    router.back();
  }
  
  const [active, setActive] = useState(1);

  const ActiveItem = () => {
    switch (active) {
        case 1:
            return <ViewSkills/>                
        case 2:
            return <ViewCertificates/>;
        default:
            return <ViewSkills/>
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
            <div className={`${styles.column} ${styles.alignright}`}>
              <div className={`${styles.row} ${styles.itemscenter}`}>
                <button className={`${styles.button} ${styles.main} ${styles.wbutton}`} onClick={handleClick}>Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ minHeight: 'calc(100vh - 80px)',marginTop:'70px'}}>
        <header className='bg-gray-800 shadow'style={{marginTop:'70px'}}>
          <div className='max-w-9xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-white'>
              {items.find((item) => item.id === active)?.name || ''}
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
            <div className='border-4 border-solid border-gray-200 rounded-lg h-2/6 mx-5 mt-0 mb-1'>
              <ViewUserProfile/>
            </div>
            <div className='border-4 border-solid border-gray-200 rounded-lg h-4/6 mx-5 mt-2'>
              {ActiveItem()}
            </div>
          </main>
        </div>
      </div>
    </>
  )
      
}