'use client';

import Game from './components/Game';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center py-6 overflow-x-none'>
			<Game />
		</main>
	);
}
