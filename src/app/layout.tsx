import type { Metadata } from "next";
import "./globals.css";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PetaMikke - シール好きのためのマーケット",
  description: "シールの売買・交換・情報共有ができるシール専門コミュニティアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 min-h-screen">
        <AgeVerificationModal />
        {children}
        <Footer />
      </body>
    </html>
  );
}
