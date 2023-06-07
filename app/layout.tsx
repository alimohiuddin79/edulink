import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthProvider from "./context/AuthContext";
import { ChakraProviders } from "./context/ChakraContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={montserrat.className}>
        <AuthProvider>
          <ChakraProviders>
            <ThemeProvider>
              <div
                className="
              max-w-screen-xl
              min-h-screen
              overflow-x-hidden
              flex
              flex-col
              justify-between
              py-4
              mx-auto
            "
              >
                <Header />
                {children}
                <Footer />
              </div>
            </ThemeProvider>
          </ChakraProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
