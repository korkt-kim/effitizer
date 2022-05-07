import { FC, ReactNode, useState } from 'react';
import styles from './index.module.scss';
import Image from '../Image';
import InstagramIcon from '../InstagramIcon';
import LogoType from '../LogoType';
import MenuIcon from '../MenuIcon';
import CloseIcon from '../CloseIcon';
import classNames from 'classnames';
import Link from 'next/link';

const emailAddress = 'interaction0318@naver.com';

const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <header className={styles.header}>
        <LogoType fill="currentColor" />
        <button type="button" className={styles.iconButton}>
          <MenuIcon
            fill="currentColor"
            aria-label="메뉴 열기"
            onClick={() => setIsMenuOpen(true)}
          />
        </button>
        {isMenuOpen && (
          <div className={styles.menuWrapper}>
            <nav className={styles.menu}>
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
                <Link href="/login" passHref={true}>
                  <a className={styles.loginButton}>로그인</a>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
      {children}
      <footer className={styles.footer}>
        <div className={styles.aboutEffitizer}>
          <Image src="/logo.png" alt="로고" width={76} height={89} />
          <p>
            식전에 가볍게 먹는 에피타이저처럼 ‘쉽고 빠른 독서를 위한 숏폼 전자책
            서비스’를 제공하고 있습니다.
          </p>
        </div>
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
        <a href="https://instagr.am/effitizer" target="_blank" rel="noreferrer">
          <InstagramIcon aria-label="Instagram" />
        </a>
        <small className={styles.copyright}>
          Copyright © 2021 WASD Pte. Ltd. All rights reserved
        </small>
      </footer>
    </div>
  );
};

export default Layout;
