import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import styles from './index.module.scss';

export default function ContentBody({
  children,
  className,
  ...props
}: ReactMarkdownOptions) {
  return (
    <ReactMarkdown
      className={classNames(styles.contentBody, className)}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
}
