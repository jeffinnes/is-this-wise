// Base card component

import styles from './Card.module.css';

export default function Card({
  children,
  subType,
}: {
  children: React.ReactNode;
  subType?: string;
}) {
  return <div className={`${styles.card} ${subType}`}>{children}</div>;
}
