"use client";
import { useState } from "react";
import TabsImg from "../../public/hero-1.jpg"
import TabsImg1 from "../../public/hero-2.jpg"
import TabsImg2 from "../../public/hero-3.jpg"
import Image from "next/image";

const tabs = [
  { 
    id: "description",
     label: "Description"
 },
  { 
    id: "reviews", 
    label: "Reviews(1)" 
},
  { 
    id: "size", 
    label: "Size Chart" 
},
  { 
    id: "image", 
    label: "Image Tab" 
},
];

const ProductsTabs = () => {

     const [active, setActive] = useState("description");

  return (
    <div className="pb-[100px]">

                <div className="border rounded-md bg-white">
                    {/* ----------------Tabs------ */}
                    <div className="flex border-b overflow-x-auto">
                        {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`px-5 py-3 text-[20px] whitespace-nowrap transition-colors
                            ${
                                active === tab.id
                                ? "border-b-2 border-black font-medium text-black"
                                : "text-gray-500 hover:text-black"
                            }`}
                        >
                            {tab.label}
                        </button>
                        ))}
                    </div>
                    {/* ----------------Content------ */}               
                    <div className="p-4">
                        {active === "description" && (
                            <div className="">
                                <Image src={TabsImg} alt="Room interior" className="w-full h-[500px] object-cover rounded-xl"/>
                                <p className="text-[18px] w-[80%] leading-[25px] mt-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde minus esse dolores eligendi eius cupiditate voluptatem rem,
                                 molestiae explicabo quia, ex, fuga iure. Quod obcaecati maxime, placeat odio dignissimos consectetur!, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde minus esse dolores eligendi eius cupiditate voluptatem rem, 
                                 molestiae explicabo quia, ex, fuga iure. Quod obcaecati maxime, placeat odio dignissimos consectetur!</p>
                                 <p className="text-[18px] w-[80%] leading-[25px] mt-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde minus esse dolores eligendi eius cupiditate voluptatem rem,
                                 molestiae explicabo quia, ex, fuga iure. Quod obcaecati maxime, placeat odio dignissimos consectetur!, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde minus esse dolores eligendi eius cupiditate voluptatem rem, 
                                 molestiae explicabo quia, ex, fuga iure. Quod obcaecati maxime, placeat odio dignissimos consectetur!</p>
                            </div>
                        )}                       
                        {active === "reviews" && ( <p className="text-gray-700">1 customer review goes here.</p>)}
                        {active === "size" && 
                        <p className="text-gray-700">Size chart content.</p>
                        }
                        {active === "image" &&
                         <div className="flex justify-between gap-[25px] w-full h-[400px] rounded-lg overflow-hidden">
                            <Image className="w-full h-full object-cover rounded-lg" src={TabsImg1} alt="TabsImg"/>
                            <Image className="w-full h-full object-cover rounded-lg" src={TabsImg2} alt="TabsImg"/>                            
                        </div>
                         }                       
                    </div>
         
            </div>
    
    </div>
  )
}

export default ProductsTabs