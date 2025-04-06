interface DiceProps {
	values: number[];
}

export default function Dice({ values }: DiceProps) {
	// Map dice faces to dot patterns
	const renderDiceFace = (value: number) => {
		if (value === 0) return null;

		// Tailwind classes for dice dots based on the value
		return (
			<div className='relative w-full h-full grid grid-cols-3 grid-rows-3 p-2'>
				{/* Dot patterns based on dice value */}
				{value >= 1 && (
					<div className='absolute top-2 left-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary'></div>
				)}
				{value >= 2 && (
					<div className='absolute bottom-2 right-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary'></div>
				)}
				{value >= 3 && (
					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary'></div>
				)}
				{value >= 4 && (
					<div className='absolute top-2 right-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary'></div>
				)}
				{value >= 5 && (
					<div className='absolute bottom-2 left-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary'></div>
				)}
				{value === 6 && (
					<>
						<div className='absolute top-1/2 left-2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary'></div>
						<div className='absolute top-1/2 right-2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary'></div>
					</>
				)}
			</div>
		);
	};

	return (
		<div className='dice-container flex justify-center gap-4 my-6'>
			{values[0] > 0 && (
				<div className='dice w-16 h-16 md:w-20 md:h-20 bg-base-100 rounded-lg border-2 border-secondary shadow-lg transform transition-transform'>
					{renderDiceFace(values[0])}
				</div>
			)}
			{values[1] > 0 && (
				<div className='dice w-16 h-16 md:w-20 md:h-20 bg-base-100 rounded-lg border-2 border-secondary shadow-lg transform transition-transform'>
					{renderDiceFace(values[1])}
				</div>
			)}
		</div>
	);
}
