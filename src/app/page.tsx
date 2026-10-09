import Image from 'next/image';

export default function Home() {
	return (
		<div className='max-w-3xl mx-auto space-y-8'>
			<main className='flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start'>
				<Image
					className='h-20 w-[260px]'
					src='/lingimate-logo-tr.png'
					alt='Next.js logo'
					width={1500}
					height={500}
					priority
				/>
				Reply with confidence, even in a language you’re not fluent in.
			</main>
		</div>
	);
}
