"use client";

import { apiClient } from "@/src/lib/client-api/notices";
import { Notice } from "@/src/types/Notice";
import { PropsWithChildren, createContext, useState } from "react";

interface NoticesContextValue {
  notices: Notice[];
  addNotice: (props: { title: string; body: string }) => Promise<void>;
  deleteNotice: (_id: string) => Promise<void>;
  updateNotice: (props: {
    _id: string;
    title: string;
    body: string;
  }) => Promise<void>;
}

const defaultNoticesContextValue: NoticesContextValue = {
  notices: [],
  addNotice: (props: { title: string; body: string }) => Promise.resolve(),
  deleteNotice: (_id: string) => Promise.resolve(),
  updateNotice: (props: { _id: string; title: string; body: string }) =>
    Promise.resolve(),
};

export const NoticesContext = createContext<NoticesContextValue>(
  defaultNoticesContextValue
);

interface Props extends PropsWithChildren {
  initialNotices: Notice[];
}

export default function NoticesProvider({ children, initialNotices }: Props) {
  const [notices, setNotices] = useState(initialNotices);

  const addNotice = async ({
    title,
    body,
  }: {
    title: string;
    body: string;
  }) => {
    try {
      const { response, data } = await apiClient.postNotice({ title, body });

      if (response.status !== 200) {
        throw new Error("server error");
      }
      setNotices((prev) => [...prev, data.notice]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotice = async (_id: string) => {
    try {
      const { response } = await apiClient.deleteNotice(_id);

      if (response.status !== 200) {
        throw new Error("server error");
      }

      setNotices((prev) => prev.filter((notice) => notice._id !== _id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateNotice = async ({
    _id,
    title,
    body,
  }: {
    _id: string;
    title: string;
    body: string;
  }) => {
    try {
      const { response, data } = await apiClient.patchNotice({
        _id,
        title,
        body,
      });

      if (response.status !== 200) {
        throw new Error(data?.error);
      }

      setNotices((prev) =>
        prev.map((notice) =>
          notice._id === _id ? { ...notice, title, body } : notice
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NoticesContext.Provider
      value={{ notices, addNotice, deleteNotice, updateNotice }}
    >
      {children}
    </NoticesContext.Provider>
  );
}
