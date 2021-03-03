import Image from 'next/image';
import Carousel from 'src/components/common/Carousel';
import Testimonials from 'src/components/pages/home/Tesimonials';
import AboutUs from 'src/components/pages/home/AboutUs';
import Hero from 'src/components/pages/home/Hero';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Sample Application</title>
      </Head>

      <div className="carousel">
        <Carousel>
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
      </div>

      <div className="container mx-auto">
        <AboutUs className="mt-24" />
        <Testimonials className="mt-24" />
        <Hero className="mt-24" />
      </div>

      <style jsx>{`
        .carousel {
          height: calc(100vh - var(--header-height));
        }
      `}</style>
    </>
  );
}
