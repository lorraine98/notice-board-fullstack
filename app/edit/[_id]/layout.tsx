export const metadata = {
  title: "edit",
  description: "edit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
