'use client';

import { useLanguage } from '../context/LangContext';

export default function LanguageSelector() {
	const { lang, setLang } = useLanguage();

	return (
		<div className='flex bg-slate-100 p-1 rounded-xl'>
			<button
				onClick={() => setLang('ua')}
				className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
					lang === 'ua'
						? 'bg-white text-slate-800 shadow-sm'
						: 'text-slate-500 hover:text-slate-800'
				}`}
			>
				UA
			</button>
			<button
				onClick={() => setLang('en')}
				className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
					lang === 'en'
						? 'bg-white text-slate-800 shadow-sm'
						: 'text-slate-500 hover:text-slate-800'
				}`}
			>
				EN
			</button>
		</div>
	);
}
