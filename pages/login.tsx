import classNames from 'classnames';
import { NextPage } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SVGProps } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/LogIn.module.scss';

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

const KakaoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M255.5 48c43.845 0 84.397 8.533 121.656 25.6 37.259 17.066 66.715 40.273 88.366 69.62C487.174 172.566 498 204.577 498 239.252c0 34.674-10.826 66.73-32.478 96.168-21.651 29.437-51.062 52.689-88.231 69.755-37.169 17.066-77.766 25.6-121.791 25.6-13.893 0-28.238-.994-43.033-2.98-64.234 44.607-98.425 67.182-102.575 67.723-1.985.723-3.88.632-5.684-.27-.722-.542-1.263-1.265-1.624-2.168-.361-.903-.541-1.715-.541-2.438v-1.083c1.083-7.044 9.292-36.39 24.629-88.041-34.823-17.337-62.475-40.318-82.953-68.943C23.239 303.951 13 272.843 13 239.252c0-34.675 10.826-66.686 32.478-96.032 21.651-29.347 51.107-52.554 88.366-69.62C171.103 56.533 211.655 48 255.5 48Z"
    />
  </svg>
);

const GoogleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="#EA4335 "
      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
    />
    <path
      fill="#34A853"
      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
    />
    <path
      fill="#4A90E2"
      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
    />
    <path
      fill="#FBBC05"
      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
    />
  </svg>
);

const NaverIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ transform: 'scale(0.9)' }}
  >
    <path
      fill="currentColor"
      d="M9 32V480H181.366V255.862L331.358 480H504V32H331.358V255.862L181.366 32H9Z"
    />
  </svg>
);

const providerInfo = {
  google: { name: 'Google', Icon: GoogleIcon },
  kakao: { name: '카카오', Icon: KakaoIcon },
  naver: { name: '네이버', Icon: NaverIcon },
};

const LogIn: NextPage<{
  providers: Awaited<ReturnType<typeof getProviders>>;
}> = ({ providers }) => {
  const { query } = useRouter();

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
          {Object.values(providers || {}).map((provider) => {
            const { name, Icon } =
              providerInfo[provider.id as keyof typeof providerInfo];
            return (
              <button
                key={provider.name}
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl:
                      typeof query.callbackUrl === 'string'
                        ? query.callbackUrl
                        : '/',
                  })
                }
                type="button"
                className={classNames(styles.loginButton, styles[provider.id])}
              >
                <Icon className={styles.loginButtonIcon} />
                {name}로 로그인
              </button>
            );
          })}
        </div>
      </main>
    </Layout>
  );
};

export default LogIn;
