import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "@components/navbar/Navbar";
import RegisterModal from "@components/modals/RegisterModal";
import ToasterProvider from "@providers/ToasterProvider";
import LoginModal from "@components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HotelsApp",
  description: "A clone project of airbnb",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const currentUser = await getCurrentUser();
  return (
    <html lang="es">
      <body className={nunito.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
