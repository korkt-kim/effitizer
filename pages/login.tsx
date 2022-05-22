import { NextPage } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/LogIn.module.scss';

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

const LogIn: NextPage<{
  providers: Awaited<ReturnType<typeof getProviders>>;
}> = ({ providers }) => {
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
        <div className={styles.loginButtons}>
          {Object.values(providers || {}).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                type="button"
                className={styles.loginButton}
              >
                {provider.name}로 로그인
              </button>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default LogIn;
