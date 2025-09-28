import BedRoomsection from "@/components/Home_page/BedRoomsection";
import CartImg from "@/components/Home_page/CartImg";
import CategoryIcons from "@/components/Home_page/CategoryIcons";
import Featured from "@/components/Home_page/Featured";
import Hero from "@/components/Home_page/Hero";
import LatestProducts from "@/components/Home_page/LatestProduct";
import PersentFerniture from "@/components/Home_page/PersentFerniture";
import PopularBrands from "@/components/Home_page/PopularBrands";
import TopPicks from "@/components/Home_page/TopPicks";


export default function Home() {
  return (   
   <>
      <Hero />
      <CategoryIcons />
      <Featured />  
      <TopPicks />
      <PersentFerniture />   
      <LatestProducts />
      <BedRoomsection />
      <PopularBrands />
   </>
  );
}
