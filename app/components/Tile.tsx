interface TileProps {
	value: number;
	active: boolean;
	selected: boolean;
	onClick: () => void;
}

export default function Tile({ value, active, selected, onClick }: TileProps) {
	return (
		<button
			className={`
        btn btn-lg w-16 h-16 md:w-20 md:h-20 text-2xl md:text-3xl font-bold
        transition-all duration-300 transform perspective-500 tile-flip
        ${
			active
				? selected
					? 'bg-accent text-accent-content border-accent hover:bg-accent-focus'
					: 'bg-base-300 text-primary border-primary hover:bg-base-300'
				: 'bg-neutral text-neutral-content btn-disabled inactive'
		}
      `}
			onClick={onClick}
			disabled={!active}
		>
			{value}
		</button>
	);
}
