import CartImg from "@/components/Home_page/CartImg";
import Featured from "@/components/Home_page/Featured";
import Hero from "@/components/Home_page/Hero";
import TopPicks from "@/components/Home_page/TopPicks";
import Image from "next/image";

export default function Home() {
  return (   
   <>
      <Hero />
      <Featured />      
      <TopPicks />
   </>
  );
}
