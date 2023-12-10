"use client";

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import styles from "../../page.module.css";
import { useRouter } from "next/navigation";
import { NoticesContext } from "@/app/provider/notices-provider";

interface Props {
  params: {
    _id: string;
  };
}

export default function Edit({ params: { _id } }: Props) {
  const { updateNotice } = useContext(NoticesContext);
  const { push } = useRouter();

  const [values, setValues] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    const fetchNotices = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/notices/${_id}`
      );
      const { data } = await res.json();
      setValues({
        title: data.notice.title,
        body: data.notice.body,
      });
    };

    fetchNotices();
  }, []);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = (event.target as HTMLFormElement).elements;
    const titleElement = formElements.namedItem("title") as HTMLInputElement;
    const bodyElement = formElements.namedItem("body") as HTMLTextAreaElement;

    const title = titleElement.value;
    const body = bodyElement.value;

    updateNotice({ _id, title, body });
    push("/");
  };

  return (
    <div className={styles.main}>
      <h1>Edit</h1>
      <form onSubmit={onSubmit} action="" className={styles.main}>
        <span>title</span>
        <input
          onChange={onChange}
          value={values.title}
          type="text"
          name="title"
        />
        <span>body</span>
        <textarea
          onChange={onChange}
          value={values.body}
          name="body"
          id="body"
          cols={30}
          rows={10}
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
