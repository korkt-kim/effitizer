import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import LoadingSession from '../components/LoadingSession';
import Radio from '../components/Radio';
import styles from '../styles/Subscribe.module.scss';
import InputMask from 'react-input-mask';
import { ComponentProps, useState } from 'react';
import classNames from 'classnames';
import addWeeks from 'date-fns/addWeeks';

const NumberInput = (props: ComponentProps<typeof InputMask>) => (
  <InputMask
    type="text"
    pattern="\d*"
    maskPlaceholder=""
    className={styles.input}
    {...props}
  />
);

const dateFormat = Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

const Subscribe: NextPage<{}> = ({}) => {
  const { status } = useSession({ required: true });

  const dayAfterWeek = addWeeks(new Date(), 1);

  if (status === 'loading') {
    return <LoadingSession />;
  }

  return (
    <Layout>
      <Head>
        <title>멤버십 가입 - EffiTizer</title>
        <meta
          name="description"
          content="쉽고 빠른 독서를 위한 숏폼 전자책 서비스, 에피타이저"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>멤버십 가입</h1>
        <div className={styles.subscribeOption}>
          <Radio defaultChecked />
          <label className={styles.subscribeOptionLabel}>
            7일 무료 체험 종료 후
            <div className={styles.subscribeOptionPrice}>월 4,900원</div>
          </label>
          <br />
        </div>
        <dl className={styles.paymentInfo}>
          <div className={styles.paymentInfoRow}>
            <dt className={styles.paymentInfoRowLabel}>오늘 결제 금액</dt>
            <dd className={styles.paymentInfoRowContent}>0원</dd>
          </div>
          <div className={styles.paymentInfoRow}>
            <dt className={styles.paymentInfoRowLabel}>첫번째 결제일</dt>
            <dd className={styles.paymentInfoRowContent}>
              {dateFormat.format(dayAfterWeek)}
            </dd>
          </div>
        </dl>
        <form className={styles.paymentInfoForm}>
          <h2 className={styles.paymentInfoFormTitle}>결제 정보 입력</h2>
          <div
            className={classNames(
              styles.paymentInfoFormField,
              styles.paymentInfoFormColumnCCNumber
            )}
          >
            <label
              className={styles.paymentInfoFormFieldLabel}
              htmlFor="cardNumber"
            >
              카드 번호
            </label>
            <NumberInput
              id="cardNumber"
              mask="9999 9999 9999 9999"
              placeholder="5555 5555 4444 4444"
              autoComplete="cc-number"
            />
          </div>
          <div className={styles.paymentInfoFormField}>
            <label
              className={styles.paymentInfoFormFieldLabel}
              htmlFor="expirationDate"
            >
              유효 기간
            </label>
            <NumberInput
              id="expirationDate"
              mask="99/99"
              placeholder="MM/YY"
              autoComplete="cc-exp"
            />
          </div>
          <fieldset className={styles.birthdayFieldset}>
            <legend className={styles.birthdayFieldsetLabel}>생년월일</legend>
            <div className={styles.birthdayFieldsetRow}>
              <div
                className={classNames(
                  styles.paymentInfoFormField,
                  styles.paymentInfoFormBirthYearField
                )}
              >
                <label
                  className={styles.paymentInfoFormFieldLabel}
                  htmlFor="birthYear"
                >
                  년
                </label>
                <NumberInput id="birthYear" mask="9999" />
              </div>
              <div className={styles.paymentInfoFormField}>
                <label
                  className={styles.paymentInfoFormFieldLabel}
                  htmlFor="birthMonth"
                >
                  월
                </label>
                <NumberInput id="birthMonth" mask="99" />
              </div>
              <div className={styles.paymentInfoFormField}>
                <label
                  className={styles.paymentInfoFormFieldLabel}
                  htmlFor="birthDay"
                >
                  일
                </label>
                <NumberInput id="birthDay" mask="99" />
              </div>
            </div>
          </fieldset>
          <div className={styles.subscribeButtonRow}>
            <button className={styles.subscribeButton} type="submit">
              구독하기
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default Subscribe;
