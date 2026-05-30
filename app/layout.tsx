import "./globals.css";
import SiteShell from "@/components/SiteShell";




export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
  <html lang="zh-Hant">
    <body style={{ margin: 0, background: "#f8fafc" }}>
      <SiteShell>{children}</SiteShell>
    </body>
  </html>
);
}







