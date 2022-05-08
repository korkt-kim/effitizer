import { GetServerSideProps, NextPage } from 'next/types';
import Image from '../../components/Image';
import Layout from '../../components/Layout';
import styles from '../../styles/Content.module.scss';

type Props = {
  content: ContentItemDetail;
  related: {
    previous: ContentItem;
    next: ContentItem;
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
  return (
    <Layout>
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
          <div className={styles.contentBody}>{content.content}</div>
        </article>
      </main>
    </Layout>
  );
};

export default Content;
