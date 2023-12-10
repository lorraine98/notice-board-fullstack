import { Notices } from "./components/Notices";
import styles from "./page.module.css";
import Link from "next/link";

const { NEXT_PUBLIC_BASE_URL } = process.env;

export default async function Home() {
  // const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/notices`);
  // const { data } = await res.json();

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
