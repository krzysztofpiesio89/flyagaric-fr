import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "flyagaric.fr - Premium Amanita Muscaria Products",
  description: "Discover the power of nature with our carefully selected Amanita Muscaria products. Quality guarantee and fast delivery.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <TopBanner />
        <Providers>
          <CartProvider>
            <TopNavbar />
            {children}
          </CartProvider>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
