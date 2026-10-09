import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { LangProvider } from './context/LangContext';
import Nav from './components/Nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Lingimate',
	description: 'Your email and translation helper',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang='en' className='h-full antialiased'>
			<LangProvider>
				<body
					className={`${inter.className} min-h-screen bg-zinc-950 text-zinc-50 antialiased`}
				>
					{/* NAVIGATION */}
					<header className='border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-50'>
						<div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
							<div className='flex items-center space-x-8'>
								<Link
									href='/'
									className='font-bold text-lg tracking-tight bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'
								>
									LINGIMATE
								</Link>
								<Nav />
							</div>
						</div>
					</header>

					{/* Page content */}
					<div className='max-w-7xl mx-auto px-4 py-8'>{children}</div>
				</body>
			</LangProvider>
		</html>
	);
}
