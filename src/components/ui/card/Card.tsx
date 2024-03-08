// Base card component

import styles from './Card.module.css';

export default function Card({
  children,
  subType,
}: {
  children: React.ReactNode;
  subType?: string;
}) {
  // If no subType is passed, just return the base card with the children
  if (!subType) {
    return <div className={styles.card}>{children}</div>;
  }

  return <div className={`${styles.card} ${styles[subType]}`}>{children}</div>;
}
