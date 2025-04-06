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
        btn aspect-square h-auto
        w-[calc(11%-2px)] sm:w-[calc(11%-4px)] 
        text-lg sm:text-xl md:text-2xl font-bold
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
