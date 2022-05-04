import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import Image from '../components/Image';
import ArrowIcon from '../components/ArrowIcon';
import classNames from 'classnames';

type CategoryList = { id: number; name: string }[];

type Props = { categories: CategoryList };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const categories = await (
    await fetch(process.env.API_HOST + '/category')
  ).json();

  return {
    props: { categories },
  };
};

const Home: NextPage<Props> = ({ categories }) => {
  const { query, pathname } = useRouter();
  const selectedCategory = Number.isInteger(Number(query.category))
    ? Number(query.category)
    : null;

  return (
    <div>
      <Head>
        <title>EffiTizer</title>
        <meta
          name="description"
          content="쉽고 빠른 독서를 위한 숏폼 전자책 서비스, 에피타이저"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <div className={styles.catchphrase}>
            세상에서 가장 가벼운 책 한 조각
          </div>
          <div className={styles.titleText}>
            쉽고 빠른 독서를 위한 숏폼 전자책 서비스, 에피타이저
          </div>
        </h1>

        <button className={styles.subscribeButton}>
          지금 구독하기
          <ArrowIcon
            width={48}
            height={48}
            fill="currentColor"
            stroke="currentColor"
          />
        </button>

        <div className={styles.coverImageWrapper}>
          <Image
            src="/cover-mobile.jpg"
            layout="responsive"
            width={1242}
            height={1200}
            alt=""
          />
        </div>

        <ul className={styles.categoryList}>
          <li
            key="null"
            className={classNames(
              styles.categoryListItem,
              selectedCategory == null && styles.selected
            )}
          >
            <Link href={{ pathname }} replace={true}>
              전체
            </Link>
          </li>
          {categories.map(({ id, name }) => (
            <li
              key={id}
              className={classNames(
                styles.categoryListItem,
                selectedCategory === id && styles.selected
              )}
            >
              <Link
                href={{ pathname, query: { ...query, category: id } }}
                replace={true}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
