import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import LoadingSession from '../components/LoadingSession';
import styles from '../styles/MyPage.module.scss';

const MyPage: NextPage<{}> = ({}) => {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <LoadingSession />;
  }

  return (
    <Layout>
      <Head>
        <title>마이페이지 - EffiTizer</title>
        <meta
          name="description"
          content="쉽고 빠른 독서를 위한 숏폼 전자책 서비스, 에피타이저"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>마이페이지</h1>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          type="button"
          className={styles.logoutButton}
        >
          로그아웃
        </button>
      </main>
    </Layout>
  );
};

export default MyPage;
