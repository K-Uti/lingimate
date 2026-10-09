'use client';

import LanguageSelector from '../components/LangSelector';
import Link from 'next/link';
import { useLanguage } from '../context/LangContext';

const translations = {
	en: {
		talk: 'Talk?',
	},
	ua: { talk: 'Поговоримо?' },
};
export default function Nav() {
	const { lang } = useLanguage();
	const t = translations[lang];
	return (
		<nav className='flex items-center space-x-6 text-sm font-medium text-zinc-400'>
			<Link href='/talk' className='hover:text-zinc-100 transition-colors'>
				{t.talk}
			</Link>
			<LanguageSelector />
		</nav>
	);
}
