'use client';

import { useLanguage } from './context/LangContext';

import Image from 'next/image';

const translations = {
	en: {
		info: 'Reply with confidence, even in a language you’re not fluent in.',
	},
	ua: { info: 'Відповідай впевнено навіть незнайомою мовою' },
};

export default function Home() {
	const { lang } = useLanguage();
	const t = translations[lang];
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
				{t.info}
			</main>
		</div>
	);
}
