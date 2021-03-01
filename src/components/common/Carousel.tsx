import Slider, { Settings } from 'react-slick';

const defaultSettings: Settings = {
  infinite: true,

  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: false,

  speed: 1000,

  slidesToShow: 1,
  slidesToScroll: 1,

  arrows: false,
  dots: false,
};

export type CarouselProps = React.PropsWithChildren<unknown> & Settings;

export default function Carousel({ children, className, ...settings }: CarouselProps) {
  return (
    <Slider className={`h-full ${className}`} {...defaultSettings} {...settings}>
      {children}
    </Slider>
  );
}
