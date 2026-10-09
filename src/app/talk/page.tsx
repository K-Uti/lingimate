'use client';

import { useState } from 'react';

export default function Talk() {
	const [incomingText, setIncomingText] = useState('');
	const [userDraft, setUserDraft] = useState('');
	const [tone, setTone] = useState('formal');
	const [result, setResult] = useState('');
	const [loading, setLoading] = useState(false);
	const [copied, setCopied] = useState(false);

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
		<main className='min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12'>
			<div className='max-w-6xl mx-auto'>
				<header className='mb-8'>
					<h1 className='text-3xl font-bold tracking-tight text-slate-800'>
						{"Let's write proper answer"}
					</h1>
					<p className='text-slate-500 mt-2'>
						Reply to letters from banks or other organizations in the language
						you are not fluent in
					</p>
				</header>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<form
						onSubmit={handleSubmit}
						className='space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100'
					>
						<div>
							<label className='block text-sm font-semibold text-slate-700 mb-2'>
								1. Enter the message you received
							</label>
							<textarea
								value={incomingText}
								onChange={e => setIncomingText(e.target.value)}
								placeholder='Letter from bank in foreign language'
								className='w-full h-40 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
								required
							/>
						</div>

						<div>
							<label className='block text-sm font-semibold text-slate-700 mb-2'>
								{
									"2. Write something you want to reply (don't worry, you can even make mistakes)"
								}
							</label>
							<textarea
								value={userDraft}
								onChange={e => setUserDraft(e.target.value)}
								placeholder='What do you want to answer? Write it in your language...'
								className='w-full h-40 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
								required
							/>
						</div>

						<div>
							<label className='block text-sm font-semibold text-slate-700 mb-2'>
								3. Select the tone
							</label>
							<div className='flex gap-4'>
								{['formal', 'casual', 'friendly'].map(t => (
									<label
										key={t}
										className='flex items-center gap-2 capitalize text-sm text-slate-600 cursor-pointer'
									>
										<input
											type='radio'
											name='tone'
											value={t}
											checked={tone === t}
											onChange={e => setTone(e.target.value)}
											className='text-blue-600 focus:ring-blue-500'
										/>
										{t === 'formal'
											? 'Formal 👔'
											: t === 'casual'
											? 'Casual ☕'
											: 'Friendly 👋'}
									</label>
								))}
							</div>
						</div>

						<button
							type='submit'
							disabled={loading}
							className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{loading ? 'Generating flawless answer...' : 'Generate answer ✨'}
						</button>
					</form>

					{/* Right side: Result */}
					<div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between min-h-[400px]'>
						<div>
							<h2 className='text-sm font-semibold text-slate-700 mb-4'>
								Result
							</h2>
							{loading && (
								<div className='flex flex-col items-center justify-center space-y-4 py-20'>
									<div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
									<p className='text-sm text-slate-400'>
										{"We're generating the text"}
									</p>
								</div>
							)}
							{!loading && result && (
								<div className='whitespace-pre-wrap text-sm text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-100 max-h-[450px] overflow-y-auto leading-relaxed'>
									{result}
								</div>
							)}
							{!loading && !result && (
								<div className='text-center py-20 text-slate-300 text-sm'>
									{"That's where you get the answer"}
								</div>
							)}
						</div>

						{!loading && result && (
							<button
								onClick={copyToClipboard}
								className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition text-sm ${
									copied
										? 'bg-green-600 text-white'
										: 'bg-slate-100 hover:bg-slate-200 text-slate-700'
								}`}
							>
								{copied ? 'Copied! ✓' : 'Copy text'}
							</button>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
