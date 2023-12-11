import { Notices } from "./components/Notices";
import styles from "./page.module.css";
import Link from "next/link";

export default async function Home() {
  return (
    <main className={styles.main}>
      <h1>notice board</h1>
      <Link className={styles.button} href="/write">
        write
      </Link>
      <Notices />
    </main>
  );
}
