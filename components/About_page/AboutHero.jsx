import Image from 'next/image'
import AboutHeroImg from "../../public/about-1.png"

const AboutHero = () => {
  return (
    <div className='py-[80px]'>
        <div className="container">
            <div className="w-full h-[600px]">
                <Image className='w-full h-full object-cover' src={AboutHeroImg} alt='' />
            </div>
        </div>
    </div>
  )
}

export default AboutHero