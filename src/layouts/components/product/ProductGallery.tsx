"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import type { Swiper as TSwiper } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingProductThumb from "../loading/LoadingProductThumb";

export interface ImageItem {
  url: string;
  altText: string;
  width: number;
  height: number;
}

const ProductGallery = ({ images }: { images: ImageItem[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<TSwiper | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loadingThumb, setLoadingThumb] = useState(true);

  const searchParams = useSearchParams().get("color");

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const altTextArray = images.map((item: any) => item.altText);

  const filteredImages = images.filter(
    (item: any) => item.altText === altTextArray[activeIndex],
  );

  useEffect(() => {
    if (searchParams) {
      const foundIndex = altTextArray.indexOf(searchParams);
      setActiveIndex(foundIndex);
    }
    setLoadingThumb(false);
  }, [searchParams, altTextArray]);

  const handleSlideChange = (swiper: TSwiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  // useEffect(() => {

  //   if (searchParams) {
  //     const index = altTextArray.findIndex(alt => alt === searchParams)
  //     setActiveIndex(index);
  //     console.log({ searchParams, altTextArray, index })
  //   }

  // }, [searchParams]);

  const handleThumbSlideClick = (clickedUrl: string) => {
    const foundIndex = filteredImages.findIndex(
      (item: any) => item.url === clickedUrl,
    );
    setActiveIndex(foundIndex);
  };

  if (loadingThumb) {
    return <LoadingProductThumb />;
  }

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSlideChange={handleSlideChange}
        >
          {filteredImages.map((item: any) => (
            <SwiperSlide key={item.url}>
              <InnerImageZoom
                src={item.url}
                zoomSrc={item.url}
                width={722}
                height={623}
                className="mb-6 border rounded-md max-h-[623px]"
              />
            </SwiperSlide>
          ))}
          <div
            className={`hidden lg:block w-full absolute top-1/2 -translate-y-1/2 z-10 px-6 text-dark ${
              isHovered
                ? "opacity-100 transition-opacity duration-300 ease-in-out"
                : "opacity-0 transition-opacity duration-300 ease-in-out"
            }`}
          >
            <div
              ref={prevRef}
              className="p-2 lg:p-4 rounded-md bg-body cursor-pointer shadow-sm absolute left-4"
            >
              <HiOutlineArrowNarrowLeft size={24} />
            </div>
            <div
              ref={nextRef}
              className="p-2 lg:p-4 rounded-md bg-body cursor-pointer shadow-sm absolute right-4"
            >
              <HiOutlineArrowNarrowRight size={24} />
            </div>
          </div>
        </Swiper>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {filteredImages.map((item: any, index: number) => (
          <SwiperSlide key={item.url}>
            <div
              onClick={() => handleThumbSlideClick(item.url)}
              className={`rounded-md border cursor-pointer overflow-hidden ${
                filteredImages[activeIndex]?.url === item.url
                  ? "border border-primary dark:border-blue-500"
                  : ""
              }`}
            >
              <Image
                src={item.url}
                alt={item.altText}
                width={168}
                height={146}
                className="max-h-[146px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductGallery;
