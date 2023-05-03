import styles from "../../../styles/skeletons/skeleton.module.css";

const SkeletonResult = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonPrimary}></div>
        <div className={styles.buttonSecondary}></div>
      </div>
    </div>
  );
};

export { SkeletonResult };
