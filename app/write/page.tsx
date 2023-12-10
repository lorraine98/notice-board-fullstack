"use client";

import { FormEvent, useContext } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { NoticesContext } from "../provider/notices-provider";

export default function Write() {
  const { push } = useRouter();
  const { addNotice } = useContext(NoticesContext);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = (event.target as HTMLFormElement).elements;
    const titleElement = formElements.namedItem("title") as HTMLInputElement;
    const bodyElement = formElements.namedItem("body") as HTMLTextAreaElement;

    const title = titleElement.value;
    const body = bodyElement.value;

    addNotice({ title, body });
    push("/");
  };

  return (
    <div className={styles.main}>
      <h1>Write</h1>
      <form onSubmit={onSubmit} action="" className={styles.main}>
        <span>title</span>
        <input type="text" name="title" />
        <span>body</span>
        <textarea name="body" id="body" cols={30} rows={10} />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
