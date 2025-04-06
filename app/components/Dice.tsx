interface DiceProps {
	values: number[];
}

export default function Dice({ values }: DiceProps) {
	return (
		<div className='dice-container'>
			{values[0] > 0 && (
				<div className='die'>
					{/* You can use CSS to style the die or use images */}
					{values[0]}
				</div>
			)}
			{values[1] > 0 && <div className='die'>{values[1]}</div>}
		</div>
	);
}
