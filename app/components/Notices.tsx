"use client";

import { useContext } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { Notice } from "@/src/types/Notice";
import { NoticesContext } from "../provider/notices-provider";

export const Notices = () => {
  const { notices, deleteNotice } = useContext(NoticesContext);
  const { push } = useRouter();

  const handleRemove = async (_id: string) => {
    deleteNotice(_id);
  };

  return (
    <div>
      {notices?.map((notice: Notice) => (
        <div className={styles.container} key={notice._id}>
          <h2 className={styles.title}>{notice.title}</h2>
          <p className={styles.date}>{notice.date}</p>
          <p className={styles.body}>{notice.body}</p>
          <button
            className={styles.button}
            type="button"
            onClick={() => handleRemove(notice._id)}
          >
            remove
          </button>
          <button
            onClick={() => push(`/edit/${notice._id}`)}
            className={styles.button}
            type="button"
          >
            edit
          </button>
        </div>
      ))}
    </div>
  );
};
