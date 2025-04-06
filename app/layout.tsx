import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Shut the Box',
	description: 'A classic dice game implementation',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			data-theme='arcadeBar'
		>
			<body className='min-h-screen bg-base-100 text-base-content'>
				{children}
			</body>
		</html>
	);
}
