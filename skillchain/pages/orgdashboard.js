import Image from 'next/image'
import styles from '@/styles/index.module.css'
import Link from 'next/link'
import { lazy } from 'react'
import { useRouter } from 'next/router'
 
const OrgProfile = lazy(() => import('@/components/OrgProfile'))
const Employees = lazy(()=>import('@/components/Employees'))

export default function OrgDashBoard(){
  
  const router = useRouter();
  const { id } = router.query; 
  return(
    <>
      <div className={`${styles.header} ${styles.nav}`}>
        <div className={styles.container}>
          <div className={`${styles.row} ${styles.itemscenter} ${styles.mblg}`}>
            <div className={`${styles.column} ${styles.alignleft}`}>
              <Link href={`/orgdashboard?id=${id}`} className={styles.winlineblock}>
                  <div className={styles.logo}><Image src="/webclip.PNG" width={50} height={50} alt="SkillChain"/> <h3 style={{ color: 'dodgerblue' }}>SkillChain</h3></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ minHeight: 'calc(100vh - 80px)',marginTop:'70px'}}>
        <header className='w-3/4 mx-auto bg-gray-800 shadow'>
          <div className='max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-white'>
              Dashboard
            </h1>
            <div className='flex'>
              <Link href='/accountlist?type=individuals' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>View Users</Link>
              <Link href='/accountlist?type=organizations' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>View Organizations</Link>
            </div>
          </div>
        </header>
        <div className='flex mx-auto py-6 sm:px-6 lg:px-8 h-4/5'>
          <main className='w-3/4 lg:px-8 sm:px-6 mx-auto inline-block float-right h-full '>
            <h1 className='text-2xl font-bold text-white'>
              &nbsp;&nbsp;&nbsp;Profile
            </h1>
            <div className='border-4 border-solid border-gray-200 rounded-lg h-auto mx-5 mt-0 mb-1'>
              <OrgProfile/>
            </div>
            <h1 className='text-2xl font-bold text-white'>
              &nbsp;&nbsp;&nbsp;Employees
            </h1>
            <div className='border-4 border-solid border-gray-200 rounded-lg h-auto mx-5 mt-2'>
              <Employees/>
            </div>
          </main>
        </div>
      </div>
    </>
  )      
}