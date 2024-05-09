import { titleFont } from "@/config/fonts";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>holaaa</h1>
      <h1 className={ `${titleFont.className} font-bold` }>holaaa</h1>
    </div>
  );
}
