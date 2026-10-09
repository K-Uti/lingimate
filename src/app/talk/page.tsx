'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LangContext';

const translations = {
	en: {
		title: "Let's write proper answer",
		subTitle:
			'Reply to letters from banks or other organizations in the language you are not fluent in',
		message: 'Enter the message you received',
		messagePlaceholder: 'Letter from bank in foreign language',
		reply:
			"Write something you want to reply (don't worry, you can even make mistakes)",
		replyPlaceholder:
			'What do you want to answer? Write it in your language...',
		tone: 'Select the tone',
		formal: 'formal',
		casual: 'casual',
		friendly: 'friendly',
		generating: 'Generating flawless answer...',
		generate: 'Generate answer',
		result: 'Result',
		generatingText: "We're generating the text",
		answer: "That's where you get the answer",
		copied: 'Copied! ✓',
		copy: 'Copy text',
	},
	ua: {
		title: 'Давай напишемо відповідь',
		subTitle:
			'Відповідай на листи з банків та інших організацій мовою якою навіть не розмовляєш',
		message: 'Додай повідомлення або лист, який отримав',
		messagePlaceholder: 'Лист з банку іноземною мовою',
		reply: 'Напиши щось у відповідь (не хвилюйся: можеш робити помилки)',
		replyPlaceholder: 'Як ти хочешь відповісти? Напиши своєю мовою...',
		tone: 'Обери тон',
		formal: 'формальний',
		casual: 'повсякденний',
		friendly: 'дружній',
		generating: 'Створюємо неперевершену відповідь...',
		generate: 'Створити відповідь',
		result: 'Результат',
		generatingText: 'Ми створюємо текст',
		answer: 'Ось тут будет відповідь',
		copied: 'Скопійовано! ✓',
		copy: 'Нумо Скопіюй',
	},
};

export default function Talk() {
	const [incomingText, setIncomingText] = useState('');
	const [userDraft, setUserDraft] = useState('');
	const [tone, setTone] = useState('formal');
	const [result, setResult] = useState('');
	const [loading, setLoading] = useState(false);
	const [copied, setCopied] = useState(false);

	const { lang } = useLanguage();
	const t = translations[lang];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!incomingText || !userDraft) return;

		setLoading(true);
		setResult('');

		try {
			const response = await fetch('/api/generate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ incomingText, userDraft, tone }),
			});

			const data = await response.json();
			if (data.result) {
				setResult(data.result);
			} else {
				alert(data.error || 'Something went wrong');
			}
		} catch (err) {
			console.log('Failed to generate response', err);
		} finally {
			setLoading(false);
		}
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(result);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<main className='min-h-screen bg-dark text-slate-900 p-6 md:p-12'>
			<div className='max-w-6xl mx-auto'>
				<header className='mb-8'>
					<h1 className='text-3xl font-bold tracking-tight text-slate-200'>
						{t.title}
					</h1>
					<p className='text-slate-300 mt-2'>{t.subTitle}</p>
				</header>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<form
						onSubmit={handleSubmit}
						className='space-y-6 bg-dark p-6 rounded-2xl shadow-sm border border-slate-500'
					>
						<div>
							<label className='block text-sm font-semibold text-slate-300 mb-2'>
								1. {t.message}
							</label>
							<textarea
								value={incomingText}
								onChange={e => setIncomingText(e.target.value)}
								placeholder={t.messagePlaceholder}
								className='w-full h-40 p-3 rounded-lg border border-slate-500 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm text-slate-300 placeholder-slate-500'
								required
							/>
						</div>

						<div>
							<label className='block text-sm font-semibold text-slate-300 mb-2'>
								{`2. ${t.reply}`}
							</label>
							<textarea
								value={userDraft}
								onChange={e => setUserDraft(e.target.value)}
								placeholder={t.replyPlaceholder}
								className='w-full h-40 p-3 rounded-lg border border-slate-500 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm text-slate-300 placeholder-slate-500'
								required
							/>
						</div>

						<div>
							<label className='block text-sm font-semibold text-slate-200 mb-2'>
								3. {t.tone}
							</label>
							<div className='flex gap-4'>
								{['formal', 'casual', 'friendly'].map(tn => (
									<label
										key={tn}
										className='flex items-center gap-2 capitalize text-sm text-slate-300 cursor-pointer'
									>
										<input
											type='radio'
											name='tone'
											value={tn}
											checked={tone === tn}
											onChange={e => setTone(e.target.value)}
											className='text-gray-600 focus:ring-gray-500'
										/>
										{tn === 'formal'
											? t.formal
											: tn === 'casual'
											? t.casual
											: t.friendly}
									</label>
								))}
							</div>
						</div>

						<button
							type='submit'
							disabled={loading}
							className='w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{loading ? t.generating : t.generate}
						</button>
					</form>

					{/* Right side: Result */}
					<div className='bg-dark p-6 rounded-2xl shadow-sm border border-slate-500 flex flex-col justify-between min-h-[400px]'>
						<div>
							<h2 className='text-sm font-semibold text-slate-200 mb-4'>
								{t.result}
							</h2>
							{loading && (
								<div className='flex flex-col items-center justify-center space-y-4 py-20'>
									<div className='w-8 h-8 border-4 border-gray-600 border-t-transparent rounded-full animate-spin'></div>
									<p className='text-sm text-slate-400'>{t.generatingText}</p>
								</div>
							)}
							{!loading && result && (
								<div className='whitespace-pre-wrap text-sm text-slate-100 bg-slate-800 p-4 rounded-xl border border-slate-100 max-h-[450px] overflow-y-auto leading-relaxed'>
									{result}
								</div>
							)}
							{!loading && !result && (
								<div className='text-center py-20 text-slate-300 text-sm'>
									{t.answer}
								</div>
							)}
						</div>

						{!loading && result && (
							<button
								onClick={copyToClipboard}
								className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition text-sm ${
									copied
										? 'bg-green-600 text-white'
										: 'bg-slate-800 hover:bg-slate-700 text-slate-200'
								}`}
							>
								{copied ? t.copied : t.copy}
							</button>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
