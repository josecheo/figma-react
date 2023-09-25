import type { AppProps } from "next/app";
import "../utils/tailwind.css";
import { Poppins } from "next/font/google";
import './styles.css'
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
