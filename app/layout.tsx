import { apiClient } from "@/src/lib/client-api/notices";
import "./globals.css";
import NoticesProvider from "./provider/notices-provider";

export const metadata = {
  title: "home",
  description: "home",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await apiClient.getNotices();

  return (
    <html lang="en">
      <body>
        <NoticesProvider initialNotices={data.notices}>
          {children}
        </NoticesProvider>
      </body>
    </html>
  );
}
