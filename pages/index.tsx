import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import Image from '../components/Image';
import ArrowIcon from '../components/ArrowIcon';
import classNames from 'classnames';

type Category = { id: number; name: string };
type CategoryList = Category[];

type Book = {
  id: number;
  author: string;
  publisher: string;
  title: string;
};

type ContentItem = {
  id: number;
  title: string;
  book: Book;
};

type Content = {
  id: number;
  category: Category['id'];
  title: string;
  items: ContentItem[];
};

type Props = {
  categories: CategoryList;
  initialContents: Content[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { category } = context.query;
  const categories = await (
    await fetch(process.env.API_HOST + '/category')
  ).json();

  const initialContents = await (
    await fetch(
      process.env.API_HOST +
        '/content' +
        (Number.isInteger(category) ? `?category=${category}` : '')
    )
  ).json();

  return {
    props: { categories, initialContents },
  };
};

const Home: NextPage<Props> = ({ categories, initialContents }) => {
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

        <ul className={styles.contentList}>
          {initialContents.map(({ id, title, items }) => (
            <li key={id} className={styles.contentListItem}>
              <h2 className={styles.contentListTitle}>{title}</h2>
              <ul className={styles.contentListItems}>
                {items.map(({ id, title, book }) => (
                  <li key={id} className={styles.contentListItem}>
                    <h3 className={styles.contentListItemTitle}>{title}</h3>
                    <div className={styles.contentListItemBody}>
                      <div className={styles.contentListItemBodyLeft}>
                        <div className={styles.contentListItemBodyLeftTop}>
                          <div
                            className={styles.contentListItemBodyLeftTopAuthor}
                          >
                            {book.author}
                          </div>
                          <div
                            className={
                              styles.contentListItemBodyLeftTopPublisher
                            }
                          >
                            {book.publisher}
                          </div>
                        </div>
                        <div className={styles.contentListItemBodyLeftBottom}>
                          <div
                            className={
                              styles.contentListItemBodyLeftBottomTitle
                            }
                          >
                            {book.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
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
