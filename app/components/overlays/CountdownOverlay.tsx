interface CountdownOverlayProps {
	countdown: number;
}

export default function CountdownOverlay({ countdown }: CountdownOverlayProps) {
	return (
		<div className='fixed inset-0 bg-base-100/90 backdrop-blur-sm flex flex-col items-center justify-center text-center z-50 p-4'>
			<div className='card w-full max-w-xs sm:max-w-sm md:max-w-md bg-base-300 shadow-xl overflow-hidden'>
				<div className='card-body items-center p-4 sm:p-6'>
					<h2 className='text-xl sm:text-2xl text-error mb-2 sm:mb-4 neon-flicker'>
						The numbers ain&apos;t numbering, Will Hunting...
					</h2>
					<div className='countdown font-mono text-4xl sm:text-5xl md:text-6xl text-primary'>
						<span
							style={
								{ '--value': countdown } as React.CSSProperties
							}
						></span>
					</div>
					<p className='mt-2 sm:mt-4 text-base sm:text-lg'>
						Game ending soon
					</p>
				</div>
			</div>
		</div>
	);
}
