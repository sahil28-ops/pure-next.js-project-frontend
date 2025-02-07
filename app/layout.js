import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./_components/common/Navigation";
import Footer from "./_components/common/Footer";
import { AuthProvider } from "./_components/_context/auth";
import { Addcart } from "./_components/_context/addCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <Addcart>
            <Navigation />
            {children}
            <Footer />
          </Addcart>
        </AuthProvider>
      </body>
    </html>
  );
}
