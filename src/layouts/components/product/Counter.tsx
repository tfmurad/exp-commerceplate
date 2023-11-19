"use client"
import { useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa6";

const Counter = () => {
	const [count, setCount] = useState(1);

	const incrementCount = () => {
		setCount(count + 1);
	};

	const decrementCount = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	return (
		<div className="border rounded-md flex justify-between items-center w-[116px]">
			<button className='p-2' onClick={decrementCount}><FaMinus /></button>
			<p>{count}</p>
			<button className='p-2' onClick={incrementCount}><FaPlus /></button>
		</div>
	);
};

export default Counter;