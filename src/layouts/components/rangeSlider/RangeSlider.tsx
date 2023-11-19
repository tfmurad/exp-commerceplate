import { createUrl } from "@/lib/utils";
import MultiRangeSlider from "multi-range-slider-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from 'react';
import "./rangeSlider.css";

const RangeSlider = ({ maxPriceData }: { maxPriceData: { maxProductPrice: number, maxProductCurrency: string } }) => {

	const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(0);
	const [minValue2, setMinValue2] = useState(0);
	const [maxValue2, setMaxValue2] = useState(1000);

	const router = useRouter();
	const searchParams = useSearchParams();
	const getMinPrice = searchParams.get('minPrice');
	const getMaxPrice = searchParams.get('maxPrice');

	// Define the priceChange function
	function priceChange(minValue: number, maxValue: number) {
		const newParams = new URLSearchParams(searchParams.toString());

		// Retain existing query parameters
		newParams.forEach((value, key) => {
			if (key !== 'minPrice' && key !== 'maxPrice') {
				newParams.delete(key);
			}
		});

		if (minValue || maxValue !== undefined) {
			newParams.set('minPrice', minValue.toString());
			newParams.set('maxPrice', maxValue.toString());
		}

		router.push(createUrl('/products', newParams), { scroll: false });
	};


	return (
		<div>
			<div className="flex justify-between">
				<p>৳{minValue2} {maxPriceData.maxProductCurrency}</p>
				<p>৳{maxValue2} {maxPriceData.maxProductCurrency}</p>
			</div>

			<MultiRangeSlider
				style={{ border: 'none', boxShadow: 'none' }}
				ruler="false"
				label="false"
				min="0"
				// max={maxPriceData.maxProductPrice}
				max="3000"
				minValue={getMinPrice! || 0}
				maxValue={getMaxPrice! || 1000}
				onInput={(e) => {
					setMinValue2(e.minValue);
					setMaxValue2(e.maxValue);
					// priceChange(e.minValue, e.maxValue);
				}}
				// onChange={(e) => {
				// 	setMinValue2(e.minValue);
				// 	setMaxValue2(e.maxValue);
				// 	priceChange(e.minValue, e.maxValue);
				// }}
			/>

			{/* <button className="btn btn-sm btn-primary w-full hidden" onClick={() => { priceChange(minValue2, maxValue2) }}>sumbit</button> */}

			<button
				className={`btn btn-sm btn-primary w-full transition-opacity duration-300 ${minValue2 === 0 && maxValue2 === 1000 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
				onClick={() => { priceChange(minValue2, maxValue2) }}
			>
				submit
			</button>


		</div>
	);
}

export default RangeSlider;
