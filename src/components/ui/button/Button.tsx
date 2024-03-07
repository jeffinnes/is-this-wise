// Base Button Component
import Link from 'next/link';
import styles from './Button.module.css';
import { Url } from 'next/dist/shared/lib/router/router';

export default function Button({
  children,
  link,
  to,
}: {
  children: React.ReactNode;
  link?: boolean;
  to?: Url;
}) {
  {
    /* If link is true and url is undefined just send the user to the home page, this should never happen unless it's a bug */
  }
  return link ? (
    <Link className={styles.button} href={to || '/'}>
      {children}
    </Link>
  ) : (
    <button className={styles.button}>{children}</button>
  );
}
