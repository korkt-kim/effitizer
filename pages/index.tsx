import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import Image from '../components/Image';
import ArrowIcon from '../components/ArrowIcon';
import PlusIcon from '../components/PlusIcon';
import classNames from 'classnames';
import { useInfiniteQuery } from 'react-query';
import Layout from '../components/Layout';
import useMediaQuery, { useIsTabletPortraitUp } from '../utils/useMediaQuery';
import ResponsiveLinebreak from '../components/ResponsiveLineBreak';

type Props = {
  categories: CategoryList;
  initialContentsResponse: ContentsResponse;
};

async function fetchContents({
  category,
  next = '',
}: {
  category: unknown;
  next?: string;
}) {
  const searchParams = new URLSearchParams({
    category: category ? String(category) : '',
    next,
  });

  const response = await fetch(
    process.env.API_HOST + '/content?' + searchParams.toString()
  );
  return response.json();
}

const emailAddress = 'interaction0318@naver.com';

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { category } = context.query;
  const categories = await (
    await fetch(process.env.API_HOST + '/category')
  ).json();

  const initialContentsResponse = await fetchContents({ category });

  return {
    props: { categories, initialContentsResponse },
  };
};

const Home: NextPage<Props> = ({ categories, initialContentsResponse }) => {
  const { query, pathname } = useRouter();
  const selectedCategory = Number.isInteger(Number(query.category))
    ? Number(query.category)
    : null;

  const { fetchNextPage, data, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ContentsResponse>(
      ['contents', { category: selectedCategory }],
      ({ pageParam: next = '' }) =>
        fetchContents({ category: selectedCategory, next }),
      {
        getNextPageParam: (lastPage) => lastPage.next,
        initialData: { pages: [initialContentsResponse], pageParams: [''] },
      }
    );
  const contents = data
    ? data.pages.flatMap((response) => response.contents)
    : [];

  const isTabletPortraitUp = useIsTabletPortraitUp();

  return (
    <Layout>
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
            쉽고 빠른 독서를 위한
            <ResponsiveLinebreak /> 숏폼 전자책 서비스, 에피타이저
          </div>
        </h1>

        <Link href="/subscribe" passHref>
          <a className={styles.subscribeButton}>
            지금 구독하기
            <ArrowIcon width={48} height={48} color="currentColor" />
          </a>
        </Link>

        <div className={styles.coverImageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              isTabletPortraitUp ? '/cover-desktop.jpg' : '/cover-mobile.jpg'
            }
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
            <Link href={{ pathname }} replace={true} scroll={false}>
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
                scroll={false}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className={styles.contentGroupList}>
          {contents.map(({ id, title, items }) => (
            <li key={id} className={styles.contentGroupItem}>
              <h2 className={styles.contentListTitle}>{title}</h2>
              <ul className={styles.contentListItems}>
                {items.map(({ id, title, book }) => (
                  <li key={id} className={styles.contentListItem}>
                    <Link href={`/content/${id}`} passHref>
                      <a>
                        <div className={styles.contentListItemText}>
                          <h3 className={styles.contentListItemTitle}>
                            {title}
                          </h3>
                          <div className={styles.contentListItemBody}>
                            {book.title} / {book.author} / {book.publisher}
                          </div>
                        </div>
                        <PlusIcon className={styles.plusIcon} />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {hasNextPage && (
          <button
            className={styles.loadMoreButton}
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            더보기
          </button>
        )}
      </main>
    </Layout>
  );
};

export default Home;
