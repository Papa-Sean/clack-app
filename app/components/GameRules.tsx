import { useState } from 'react';

interface GameRulesProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function GameRules({ isOpen, onClose }: GameRulesProps) {
	return (
		<dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
			<div className='modal-box bg-base-200 max-w-xs sm:max-w-sm md:max-w-md text-base-content'>
				<button
					className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
					onClick={onClose}
				>
					✕
				</button>

				<h3 className='font-bold text-primary text-xl sm:text-2xl mb-3 neon-flicker'>
					House Rules
				</h3>

				<div className='space-y-4 overflow-y-auto max-h-[70vh]'>
					<div>
						<h4 className='font-bold text-secondary text-lg mb-1'>
							Objective
						</h4>
						<p className='text-sm sm:text-base'>
							Flip down all numbered tiles (1-9) by rolling dice
							and matching combinations. The lowest score wins!
						</p>
					</div>

					<div>
						<h4 className='font-bold text-secondary text-lg mb-1'>
							Core Mechanics
						</h4>
						<ul className='list-disc pl-5 text-sm sm:text-base space-y-2'>
							<li>
								Roll 2 dice (or 1 die when only tiles 7-9
								remain)
							</li>
							<li>
								Select tiles that{' '}
								<span className='text-accent font-bold'>
									sum exactly
								</span>{' '}
								to the dice total
							</li>
							<li>Continue until no valid moves remain</li>
							<li>
								Score is the sum of remaining tiles (goal is 0)
							</li>
						</ul>
					</div>

					<div>
						<h4 className='font-bold text-secondary text-lg mb-1'>
							Example
						</h4>
						<p className='text-sm sm:text-base'>
							If you roll a 7, you can select:
						</p>
						<ul className='list-disc pl-5 text-sm sm:text-base'>
							<li>Just tile 7</li>
							<li>Tiles 1 + 6</li>
							<li>Tiles 2 + 5</li>
							<li>Tiles 3 + 4</li>
							<li>Tiles 1 + 2 + 4</li>
							<li>Any other combination that sums to 7</li>
						</ul>
					</div>

					<div>
						<h4 className='font-bold text-secondary text-lg mb-1'>
							Special Outcomes
						</h4>
						<ul className='list-disc pl-5 text-sm sm:text-base'>
							<li>
								<span className='text-success font-bold'>
									Perfect Game:
								</span>{' '}
								Flip all tiles (score 0)
							</li>
							<li>
								<span className='text-error font-bold'>
									Game Over:
								</span>{' '}
								When no valid moves are possible
							</li>
						</ul>
					</div>

					<div>
						<h4 className='font-bold text-secondary text-lg mb-1'>
							Multiplayer
						</h4>
						<p className='text-sm sm:text-base'>
							Each player takes turns trying to achieve the lowest
							score. The player with the lowest score after all
							players have gone wins!
						</p>
					</div>

					<div className='divider divider-primary'>Coming Soon</div>

					<div>
						<h4 className='font-bold text-accent text-lg mb-1'>
							Future Features
						</h4>
						<ul className='list-disc pl-5 text-sm sm:text-base'>
							<li>Online multiplayer</li>
							<li>Custom house rules</li>
							<li>Achievements</li>
							<li>Game statistics</li>
						</ul>
					</div>
				</div>

				<div className='modal-action'>
					<button
						className='btn btn-primary'
						onClick={onClose}
					>
						Got it!
					</button>
				</div>
			</div>
			<div
				className='modal-backdrop bg-base-100/80 backdrop-blur-sm'
				onClick={onClose}
			></div>
		</dialog>
	);
}
