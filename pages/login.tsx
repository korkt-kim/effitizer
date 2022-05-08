import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/LogIn.module.scss';

const LogIn: NextPage<{}> = () => {
  return (
    <Layout>
      <Head>
        <title>로그인 - EffiTizer</title>
        <meta
          name="description"
          content="쉽고 빠른 독서를 위한 숏폼 전자책 서비스, 에피타이저"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>로그인</h1>
      </main>
    </Layout>
  );
};

export default LogIn;
