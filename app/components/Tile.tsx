interface TileProps {
	value: number;
	active: boolean;
	selected: boolean;
	onClick: () => void;
}

export default function Tile({ value, active, selected, onClick }: TileProps) {
	return (
		<button
			className={`tile ${active ? 'active' : 'inactive'} ${
				selected ? 'selected' : ''
			}`}
			onClick={onClick}
			disabled={!active}
		>
			{value}
		</button>
	);
}
