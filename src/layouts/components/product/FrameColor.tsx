"use client"
import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';

const FrameColor = () => {
	const [selectedColor, setSelectedColor] = useState<number | null>(null);

	// sample colors 
	const colors = [
		{ name: "Medium Gray", hex: "#888888" },
		{ name: "Light Gray", hex: "#CCCCCC" },
		{ name: "Dark Gray", hex: "#555555" }
	];

	const handleColorClick = (colorIndex: number) => {
		if (selectedColor === colorIndex) {
			setSelectedColor(null);
		} else {
			setSelectedColor(colorIndex);
		}
	};
	return (
		<div className="flex gap-4 mt-4">
			{colors.map((color, index) => {
				return (
					<button
						key={index}
						className={`h-10 w-10 rounded-md`}
						style={{ backgroundColor: color.hex }}
						onClick={() => handleColorClick(index)}
					>
						{selectedColor === index && (
							<span className="text-white flex items-center justify-center"><BsCheckLg size={25} /></span>
						)}
					</button>
				)
			})}
		</div>
	)
}

export default FrameColor