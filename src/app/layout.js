import NavBar from "@/components/NavBar1";
import localFont from "next/font/local";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const fraunces = localFont({ src: "./fonts/Fraunces--latin_basic.woff2" });

export const metadata = {
  title: "selinand's halloween",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ScrollToTop />
      <body
        className={`bg-background ${fraunces.className} font-thin text-2xl`}
        style={{ fontVariationSettings: `"WONK" 1` }}
      >
        <NavBar />
        <div className="mt-3 pb-8">{children}</div>
      </body>
    </html>
  );
}
