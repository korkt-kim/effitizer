import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next/types';
import ArrowIcon from '../../components/ArrowIcon';
import ContentBody from '../../components/ContentBody';
import Image from '../../components/Image';
import Layout from '../../components/Layout';
import styles from '../../styles/Content.module.scss';

type Props = {
  content: ContentItemDetail;
  related: {
    previous: ContentItem | null;
    next: ContentItem | null;
    recommended: ContentItem[];
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;
  const contentResponse = await fetch(process.env.API_HOST + '/content/' + id);
  if (contentResponse.status !== 200) {
    return { notFound: true };
  }
  const content = await contentResponse.json();
  const related = await (
    await fetch(process.env.API_HOST + '/content/' + id + '/related')
  ).json();

  return { props: { content, related } };
};

const Content: NextPage<Props> = ({ content, related }) => {
  const { previous, next, recommended } = related;
  return (
    <Layout>
      <Head>
        <title>{content.title} - EffiTizer</title>
        <meta name="description" content={content.content.substring(0, 160)} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <article>
          <h1>
            <div className={styles.bookCoverBackground}>
              <div className={styles.bookCoverParent}>
                <Image
                  src={content.book.coverUrl}
                  alt="책 표지"
                  layout="fill"
                />
              </div>
            </div>
            <div className={styles.title}>{content.title}</div>
          </h1>
          <dl className={styles.bookInfo}>
            <div className={styles.bookInfoItem}>
              <dt className={styles.bookInfoItemLabel}>책 제목</dt>
              <dd className={styles.bookInfoItemBody}>{content.book.title}</dd>
            </div>
            <div className={styles.bookInfoItem}>
              <dt className={styles.bookInfoItemLabel}>저자</dt>
              <dd className={styles.bookInfoItemBody}>{content.book.author}</dd>
            </div>
            <div className={styles.bookInfoItem}>
              <dt className={styles.bookInfoItemLabel}>출판사</dt>
              <dd className={styles.bookInfoItemBody}>
                {content.book.publisher}
              </dd>
            </div>
          </dl>
          <section className={styles.contentSection} aria-label="본문">
            <ContentBody className={styles.contentBody}>
              {content.content}
            </ContentBody>
            <section className={styles.wannaReadMore}>
              <h5 className={styles.wannaReadMoreTitle}>
                이 글을 더 읽고 싶으신가요?
              </h5>
              <p className={styles.wannaReadMoreBody}>
                EffiTizer 멤버십을 무료로 시작해보세요!
              </p>
              <Link href="/subscribe" passHref>
                <a className={styles.wannaReadMoreButton}>
                  EffiTizer 멤버십 시작하기
                </a>
              </Link>
            </section>
          </section>
        </article>
        <section aria-label="이전 글, 다음 글">
          {Object.entries({ previous, next }).map(([key, item]) => {
            if (!item) {
              return null;
            }
            return (
              <Link key={key} href={`/content/${item.id}`} passHref>
                <a
                  className={classNames(
                    styles.previousNextContent,
                    key === 'previous'
                      ? styles.previousNextContentLeft
                      : styles.previousNextContentRight
                  )}
                >
                  <ArrowIcon
                    className={classNames(
                      styles.previousNextContentIcon,
                      key === 'previous'
                        ? styles.previousNextContentIconLeft
                        : styles.previousNextContentIconRight
                    )}
                    width={48}
                    height={48}
                    color="currentColor"
                  />
                  <div className={styles.previousNextContentTitle}>
                    {key === 'previous' ? '이전 글' : '다음 글'}
                  </div>
                  <h3 className={styles.previousNextContentBookTitle}>
                    {item.title}
                  </h3>
                  <div className={styles.previousNextContentBookSubtitle}>
                    {item.chapter}
                  </div>
                </a>
              </Link>
            );
          })}
        </section>
        <section className={styles.recommendedListSection}>
          <h2 className={styles.recommendedListTitle}>
            이 글을 읽은 분들은 이것도 좋아하셨어요
          </h2>
          <ul className={styles.recommendedList}>
            {recommended.map(({ id, title, book }) => (
              <li key={id} className={styles.recommendedListItem}>
                <Link href={`/content/${id}`} passHref>
                  <a className={styles.recommendedListItemLink}>
                    <div className={styles.recommendedListItemText}>
                      <h3 className={styles.recommendedListItemTitle}>
                        {title}
                      </h3>
                      <div className={styles.recommendedListItemBody}>
                        {book.title} / {book.author} / {book.publisher}
                      </div>
                    </div>
                    <div className={styles.recommendedListItemImageWrapper}>
                      <Image
                        layout="fill"
                        src={book.coverUrl}
                        objectFit="contain"
                        alt="책 표지"
                        style={{ transform: 'scale(0.75)' }}
                      />
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
};

export default Content;
