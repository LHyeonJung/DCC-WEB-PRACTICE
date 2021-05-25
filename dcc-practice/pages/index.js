import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {countPlusAction, countMinusAction} from '../reducers/count';

import Header from '../components/public/Header';
import DashboardComponent from '../components/DashboardComponent';
import SideTab from '../components/SideTab';
import EnrollCertification from '../components/EnrollCertification';


import { Grid, Box, Button, Typography } from "@material-ui/core";


// import {Container, Row, Col } from "react-bootstrap";


// https://velopert.com/3293 사이트 보고 page 분리해보기
// https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap 

// const index = () => {
function index() {
    console.log("index 렌더링");
    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook
    const count = useSelector(state => state.count.number); // store의 state.count.number를 불러오는 hook (store의 state중에서 count의 state를 불러올 코드)
    
    // useCallback은 최적화를 위한 hook 
    const onClickPlus = useCallback(()=> {
        dispatch(countPlusAction());
    }, []);

    const onClickMinus = useCallback(()=> {
        dispatch(countMinusAction());
    }, []);

     const [isExistCert, change_isExistCert] = useState(false);
     if(isExistCert)
     {
        return (
            <div>
                <Header/>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <SideTab/>
                    </Grid>
                    <Grid item xs={12} sm={8} style={{background: 'beige', color:'black'}}>
                        <DashboardComponent/>
                    </Grid>
                </Grid>
            </div>
        );
     }
     else
     {
        console.log("isExistCert false! ");
        return (
            <div>
                <h5>[NextJs Redux 적용 테스트]</h5>
                <a>카운트: {count}</a>
                <button onClick={onClickPlus}>+</button>
                <button onClick={onClickMinus}>-</button>
                <EnrollCertification />
            </div>
        );
     }

    // return (
    //     <div >
    //         {/* <p>Hello, DCC (with. Next JS) </p>

    //         <Link href="/main">
    //             <div style={{background: 'black', color:'white'}}>intro</div>
    //         </Link>

    //         <h1></h1> */}

    //         {/* <MainComponents>
                
    //         </MainComponents> */}

    //         <Header isexist={false}/>
    //     </div>
    // );
};

export default index;

// import Head from 'next/head'
// import styles from '../styles/Home.module.css'

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className={styles.card}
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
//         </a>
//       </footer>
//     </div>
//   )
// }
