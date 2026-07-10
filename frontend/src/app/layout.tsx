import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "IMS - Inventory Management System",
    template: "%s | IMS",
  },
  description:
    "Invoice Maker - Create, manage, and print professional invoices for your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
