interface CountdownOverlayProps {
	countdown: number;
}

export default function CountdownOverlay({ countdown }: CountdownOverlayProps) {
	return (
		<div className='fixed inset-0 bg-base-100/90 backdrop-blur-sm flex flex-col items-center justify-center text-center z-50'>
			<div className='card w-full max-w-md bg-base-300 shadow-xl'>
				<div className='card-body items-center'>
					<h2 className='text-2xl text-error mb-4 neon-flicker'>
						The numbers ain't numbering, Will Hunting...
					</h2>
					<div className='countdown font-mono text-6xl text-primary'>
						<span
							style={
								{ '--value': countdown } as React.CSSProperties
							}
						></span>
					</div>
					<p className='mt-4 text-lg'>Game ending soon</p>
				</div>
			</div>
		</div>
	);
}
