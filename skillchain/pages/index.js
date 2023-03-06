import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/index.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

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
                <Link href='/signin' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                  Signin
                </Link>
                <Link href='/signup' className={`${styles.button} ${styles.main} ${styles.wbutton}`}>
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.section} ${styles.overflowhidden}`}>
        <div className={`${styles.container} ${styles.mt3xl} ${styles.mb3xl}`}>
          <div className={styles.row}>
            <div className={`${styles.column} ${styles.aligncenter}`}>
              <h1 className={`${styles.testgiga} ${styles.textcenter} ${styles.textwhite}`}>Unlock the power of blockchain skill verifications.</h1>
              <p className={`${styles.textlg} ${styles.textcenter} ${styles.maxwlg} ${styles.textwhite}`}> With SkillChain, you can trust that you are hiring the right person with the right skills for the job.</p>
              <Link href='/signup' className={`${styles.button} ${styles.xl} ${styles.main} ${styles.mtlg} ${styles.wbutton}`}>
                Get started now!
              </Link>
              <br/>
              <div className={`${styles.row} ${styles.itemscenter}`}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link href='/accountlist?type=users' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                  View Users
                </Link>
                <Link href='/accountlist?type=organizations' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                  View Organizations
                </Link>
              </div>
            </div>
          </div>
        </div>          
        <div className={styles.circle}></div>
      </div>
      <div className={styles.section}>
        <div className={`${styles.container} ${styles.mt2xl} ${styles.mb2xl}`}>
          <div className={styles.row}>
            <div className={`${styles.column} ${styles.aligncenter}`}>
              <h2 className={`${styles.maxwlg} ${styles.textcenter} ${styles.textwhite}`}>Get Your Skills Verified On The Blockchain</h2>
              <p className={`${styles.textlg} ${styles.textcenter} ${styles.maxwmd} ${styles.textwhite}`}>
                With SkillChain, you can get your skills verified on the blockchain and show potential employers or business partners that your qualifications are genuine. Get verified today and start building trust in your professional network.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.row} ${styles.itemscenter} ${styles.vt}`}>
            <div className={`${styles.column} ${styles.alignleft} ${styles.p2xl}`}>
              <h6 className={`${styles.maxwlg} ${styles.textwhite}`}>#1 Feature</h6>
              <h2 className={`${styles.maxwlg} ${styles.textwhite}`}>Verify your skills with SkillChain.</h2>
              <p className={`${styles.textlg} ${styles.textwhite}`}> Get the recognition you deserve and show employers that you’re the right fit for the job with SkillChain. Sign in or sign up to connect your LinkedIn and verify your skills with a blockchain-based skill verification system.</p>
            </div>
            <div className={`${styles.column} ${styles.aligncenter} ${styles.p2xl}`}>
              <Image
                src="/landing.png"
                alt=""                  
                className={styles.featurecard}
                width={500}
                height={400}
              />
            </div>
          </div>
          <div className={`${styles.row} ${styles.reverse} ${styles.itemscenter} ${styles.vt}`}>
            <div className={`${styles.column} ${styles.alignleft} ${styles.p2xl}`}>
              <h6 className={`${styles.maxwlg} ${styles.textwhite}`}>#2 Feature</h6>
              <h2 className={`${styles.maxwlg} ${styles.textwhite}`}>Streamline your verification process.</h2>
              <p className={`${styles.textlg} ${styles.textwhite}`}> Make verifying your skills easier than ever with SkillChain. Connect to blockchain using your wallet, and get seamless skill verification in a secure, blockchain-based system.</p>
            </div>
            <div className={`${styles.column} ${styles.aligncenter} ${styles.p2xl}`}>
              <Image
                src="/feature2.PNG"
                alt=""
                className={styles.featurecard}
                width={350}
                height={350}
              />
            </div>
          </div>
          <div className={`${styles.row} ${styles.itemscenter} ${styles.vt}`}>
            <div className={`${styles.column} ${styles.alignleft} ${styles.p2xl}`}>
              <h6 className={`${styles.maxwlg} ${styles.textwhite}`}>#3 Feature</h6>
              <h2 className={`${styles.maxwlg} ${styles.textwhite}`}>Get the job you want, with the skills you have.</h2>
              <p className={`${styles.textlg} ${styles.textwhite}`}> Get recognized for your hard work and dedication. Create a profile to showcase your skills and request for verification. Companies can then hire staffs based on verified skills, making it easier than ever to get the job you’re looking for. Take control of your career with SkillChain.</p>
            </div>
            <div className={`${styles.column} ${styles.aligncenter} ${styles.p2xl}`}>
              <Image
                src="/feature3.PNG"
                alt=""
                className={styles.featurecard}
                width={350}
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.section} ${styles.main} ${styles.mt2xl}`}>
        <div className={`${styles.container} ${styles.mt2xl} ${styles.mb2xl}`}>
          <div className={`${styles.row} ${styles.itemscenter}`}>
            <div className={`${styles.column} ${styles.aligncenter}`}>
              <h1 className={`${styles.maxwlg} ${styles.textgiga} ${styles.textcenter} ${styles.textwhite}`}>Get ready to experience secure, transparent, and trustable skill verification.</h1>
              <Link href='/signup' className={`${styles.button} ${styles.xl} ${styles.main} ${styles.white} ${styles.mtlg} ${styles.wbutton}`}>
                Get started now!
              </Link>
              <br/>
              <div className={`${styles.row} ${styles.itemscenter}`}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link href='/accountlist?type=users' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                  View Users
                </Link>
                <Link href='/accountlist?type=organizations' className={`${styles.u} ${styles.mrlg} ${styles.textwhite}`}>
                  View Organizations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
