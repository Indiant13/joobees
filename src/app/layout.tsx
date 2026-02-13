import type { Metadata } from "next";
import { Header } from "@/components/header/Header";
import { BRAND } from "@/config/brand";
import { Footer } from "@/components/footer/Footer";
import { FOOTER_LINKS } from "@/components/footer/Footer.links";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { AuthModal } from "@/features/auth/AuthModal";
import { MotionLayout } from "@/components/layout/MotionLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: BRAND.meta.title,
  description: BRAND.meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>
      <body>
        <div id="modal-root" />
        <AuthProvider>
          <MotionLayout>
            <Header
              title={BRAND.name}
              subtitle={BRAND.tagline}
            />
            {children}
            <Footer
              brandName={BRAND.name}
              tagline={BRAND.tagline}
              links={FOOTER_LINKS}
              copyright={`© ${new Date().getFullYear()} ${BRAND.name}`}
            />
          </MotionLayout>
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
