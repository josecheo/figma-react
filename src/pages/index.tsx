import Image from "next/image";
import { Poppins } from "next/font/google";
import Button from "@/components/Button";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <main className={`${poppins.variable}`}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#F3F8FC",
        }}
      >
        <Button
          variant="primary"
          label="Get Started"
          onClick={() => {}}
          size="small"
          disabled={false}
        />
      </div>
    </main>
  );
}
