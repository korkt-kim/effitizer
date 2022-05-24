import { FC, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './index.module.scss';
import Image from '../Image';
import InstagramIcon from '../InstagramIcon';
import LogoType from '../LogoType';
import MenuIcon from '../MenuIcon';
import CloseIcon from '../CloseIcon';
import ResponsiveLinebreak from '../ResponsiveLineBreak';

const emailAddress = 'interaction0318@naver.com';

const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');

      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    }
  }, [isMenuOpen]);

  return (
    <div>
      <header className={styles.header}>
        <Link href="/" passHref>
          <a>
            <LogoType fill="currentColor" aria-label="EffiTizer" />
          </a>
        </Link>
        <button
          type="button"
          className={classNames(styles.iconButton, styles.openMenuButton)}
        >
          <MenuIcon
            fill="currentColor"
            aria-label="메뉴 열기"
            onClick={() => setIsMenuOpen(true)}
          />
        </button>
        <nav className={styles.desktopMenu}>
          <div className={styles.desktopMenuContainer}>
            <Link href="/" passHref>
              <a className={styles.desktopMenuItem}>전체 콘텐츠</a>
            </Link>
            <Link href="/subscribe" passHref>
              <a className={styles.desktopMenuItem}>멤버십 가입</a>
            </Link>
          </div>
          {session ? (
            <Link href="/mypage" passHref={true}>
              <a className={styles.loginButton}>마이페이지</a>
            </Link>
          ) : (
            <Link href="/login" passHref={true}>
              <a className={styles.loginButton}>로그인</a>
            </Link>
          )}
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                key="menuBackdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.menuWrapper}
                onMouseUp={(event) => {
                  if (event.target === event.currentTarget) {
                    setIsMenuOpen(false);
                  }
                }}
              ></motion.div>
              <motion.nav
                key="menu"
                className={styles.menu}
                initial={{ scaleX: 0, transformOrigin: 'right' }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
              >
                <button
                  type="button"
                  className={classNames(
                    styles.iconButton,
                    styles.closeMenuButton
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <CloseIcon />
                </button>
                <div className={styles.menuBody}>
                  <ul className={styles.menuList}>
                    <li className={styles.menuListItem}>
                      <Link href="/">전체 콘텐츠</Link>
                    </li>
                    <li className={styles.menuListItem}>
                      <Link href="/subscribe">멤버십 가입</Link>
                    </li>
                  </ul>
                  {session ? (
                    <Link href="/mypage" passHref={true}>
                      <a className={styles.loginButton}>마이페이지</a>
                    </Link>
                  ) : (
                    <Link href="/login" passHref={true}>
                      <a className={styles.loginButton}>로그인</a>
                    </Link>
                  )}
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>
      {children}
      <footer className={styles.footer}>
        <div className={styles.footerContentWrapper}>
          <div className={styles.aboutEffitizer}>
            <img src="/logo.png" alt="로고" className={styles.logo} />
            <p>
              식전에 가볍게 먹는 에피타이저처럼
              <ResponsiveLinebreak /> ‘쉽고 빠른 독서를 위한 숏폼 전자책
              서비스’를 제공하고 있습니다.
            </p>
          </div>
          <div className={styles.footerInfo}>
            <ul className={styles.footerLinks}>
              <li>
                <a>서비스 소개</a>
              </li>
              <li>
                <a>개인정보처리방침</a>
              </li>
              <li>
                <a>고객센터</a>
              </li>
              <li>
                <a>이용약관</a>
              </li>
            </ul>
            <div className={styles.companyInfo}>
              <div>대표: 노상호 | 사업자등록번호 : 000-00-00000</div>
              <div>
                이메일 : <a href={'mailto:' + emailAddress}>{emailAddress}</a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerCopyrightWrapper}>
          <a
            href="https://instagr.am/effitizer"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon aria-label="Instagram" />
          </a>
          <small className={styles.copyright}>
            Copyright © 2022 EffiTizer. All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
