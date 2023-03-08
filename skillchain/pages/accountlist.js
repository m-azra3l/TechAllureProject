import Image from 'next/image';
import { useRouter } from "next/router";
import UserList from "../components/UserList";
import OrgList from "../components/OrgList";
import styles from '@/styles/index.module.css';
import Link from 'next/link';

export default function AccountList() {
  const router = useRouter();
  const { type } = router.query;
  alert('Please wait for list to load');
  
  function handleClick() {
    router.back();
  }

  return (
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
      <div className={styles.section} style={{ minHeight: 'calc(100vh - 80px)'}}>
        {type === "users" && <UserList />}
        {type === "organizations" && <OrgList />}
      </div>
    </>
  );
}