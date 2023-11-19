"use client";

import ImageFallback from '@/helpers/ImageFallback';
import { Categories } from '@/types';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const CategoriesSlider = ({ categories }: { categories: any }) => {
	
	const [_, setInit] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const prevRef = useRef(null);
	const nextRef = useRef(null);

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Swiper
				modules={[Pagination, Navigation]}
				// navigation={true}
				slidesPerView={2}
				spaceBetween={10}
				breakpoints={{
					640: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 24,
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 24,
					}
				}}

				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}}
				//trigger a re-render by updating the state on swiper initialization
				onInit={() => setInit(true)}
			>

				{categories.slice(1).map((item:any) => {
					const {title, handle, image, path, products} = item;
					return(
						<SwiperSlide key={handle}>
						<div
							className='text-center relative'
						>
							<ImageFallback
								src={image?.url}
								width={424}
								height={306}
								alt={title}
								className="h-[150px] md:h-[250px] lg:h-[306px] object-cover rounded-md"
							/>
							<div className="py-6">
								<h3 className='mb-2 font-medium h4'>
									<Link className="after:absolute after:inset-0" href={path}>
									{title}
									</Link>
								</h3>
								<p className="text-light dark:text-darkmode-light text-xs md:text-xl">{item.products?.edges.length} items</p>
							</div>
						</div>
					</SwiperSlide>
					)
				})}

				<div
					className={`hidden md:flex justify-between w-full absolute top-[33%] z-10 px-4 text-dark ${isHovered ? 'opacity-100 transition-opacity duration-300 ease-in-out' : 'opacity-0 transition-opacity duration-300 ease-in-out'
						}`}
				>
					<div ref={prevRef} className="p-2 lg:p-3 rounded-md bg-body cursor-pointer shadow-sm"><HiOutlineArrowNarrowLeft size={24} /></div>
					<div ref={nextRef} className="p-2 lg:p-3 rounded-md bg-body cursor-pointer shadow-sm"><HiOutlineArrowNarrowRight size={24} /></div>
				</div>
			</Swiper>
		</div>
	)
}

export default CategoriesSlider;