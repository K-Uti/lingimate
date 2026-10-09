import Image from 'next/image';

export default function Home() {
	return (
		<div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
			<main className='flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
				<Image
					className='dark:invert h-20 w-[250px]'
					src='/lingimate-logo.png'
					alt='Next.js logo'
					width={1000}
					height={500}
					priority
				/>
				Reply with confidence, even in a language you’re not fluent in.
			</main>
		</div>
	);
}
