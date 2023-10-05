import {} from "@/components";
import styles from "./styles.module.css";

export default function Test() {
  return (
    <div className={styles.test}>
      <div className={styles.rectangle}>
        <div className={styles.frame1}></div>
        <div className={styles.frame2}></div>
        <div className={styles.frame3}></div>
        <div className={styles.frame4}></div>
        <div className={styles.frame5}></div>
        <div className={styles.frame6}></div>
        <div className={styles.frame7}></div>
      </div>
    </div>
  );
}
