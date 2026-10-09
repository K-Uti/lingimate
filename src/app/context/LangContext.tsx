'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Lang = 'en' | 'ua';

interface LangContextType {
	lang: Lang;
	setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: React.ReactNode }) {
	const [lang, setLang] = useState<Lang>('ua');

	useEffect(() => {
		const savedLang = localStorage.getItem('app_lang') as Lang;
		if (savedLang && (savedLang === 'ua' || savedLang === 'en')) {
			setLang(savedLang);
		}
	}, []);

	const changeLang = (newLang: Lang) => {
		setLang(newLang);
		localStorage.setItem('app_lang', newLang);
	};

	return (
		<LangContext.Provider value={{ lang, setLang: changeLang }}>
			{children}
		</LangContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LangContext);
	if (!context) throw new Error('useLanguage must be used within LangProvider');
	return context;
}
