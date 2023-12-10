import "./globals.css";
import NoticesProvider from "./provider/notices-provider";

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata = {
  title: "home",
  description: "home",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/notices`);
  const { data } = await res.json();

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
