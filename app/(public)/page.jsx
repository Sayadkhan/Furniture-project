import BedRoomsection from "@/components/Home_page/BedRoomsection";
import CartImg from "@/components/Home_page/CartImg";
import CategoryIcons from "@/components/Home_page/CategoryIcons";
import CategoryProduct from "@/components/Home_page/CategoryProduct";
import FeaturedCategory from "@/components/Home_page/Featured";
import Featured from "@/components/Home_page/Featured";
import Hero from "@/components/Home_page/Hero";
import LatestProducts from "@/components/Home_page/LatestProduct";
import PersentFerniture from "@/components/Home_page/PersentFerniture";
import PopularBrands from "@/components/Home_page/PopularBrands";
import TopPicks from "@/components/Home_page/TopPicks";
import { Suspense } from "react";


export default function Home() {
  return (   
   <>
      <Hero />
      <CategoryIcons />
      <Suspense fallback={<p>Loading featured category...</p>}>
          <FeaturedCategory/>
      </Suspense>
        <Suspense fallback={<p>Loading top picks...</p>}>
        <TopPicks />
      </Suspense>
      <PersentFerniture />   
      <Suspense fallback={<p>Loading Latestest product....</p>}>
          <LatestProducts />
      </Suspense>
      <BedRoomsection />

    <Suspense fallback={<p>Loading categorywise product....</p>}>
      <CategoryProduct/>
    </Suspense>

      
      <PopularBrands />
   </>
  );
}
