import Image from 'next/image';
import Carousel from 'src/components/home/Carousel';
import Testimonials from 'src/components/home/Tesimonials';
import AboutUs from 'src/components/home/AboutUs';
import Hero from 'src/components/home/Hero';

export default function Home() {
  return (
    <>
      <Carousel className="h-screen">
        <Image
          src="/images/picsum-289-1920x1080.jpg"
          height={1080}
          width={1920}
          objectFit="cover"
        />
        <Image
          src="/images/picsum-650-1920x1080.jpg"
          height={1080}
          width={1920}
          objectFit="cover"
        />
      </Carousel>

      <AboutUs className="mt-24" />
      <Testimonials className="mt-24" />
      <Hero className="mt-24" />
    </>
  );
}
