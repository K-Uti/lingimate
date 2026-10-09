import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.GROQ_API_KEY,
	baseURL: process.env.OPEN_AI_URL, // need to provide url to redirect to GROQ
});

export async function POST(req: Request) {
	try {
		const { incomingText, userDraft, tone = 'formal' } = await req.json();

		if (!incomingText || !userDraft) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		const systemPrompt = `
      You are an expert in cross-cultural business communication and professional translation.

			You are given two texts:

			The incoming text (Language A).

			The user's informal draft reply (Language B).

			Your task:

			Automatically detect Language A, the language of the incoming text.

			Translate, correct, and adapt the user's draft reply (Text 2) into Language A.

			Match the tone specified by: ${tone || 'formal'}.

			Preserve the user's original meaning and intent. Do not invent facts, add information, or make commitments that are not present in the original draft.

			Make the reply sound natural to a native speaker of Language A. Ensure it is grammatically correct, polite, and appropriate for the context.

			Output ONLY the final reply text. Do not include introductions, explanations, comments, or quotation marks.
    `;

		const userPrompt = `
      Incoming text:
      """
      ${incomingText}
      """

      user's draft reply:
      """
      ${userDraft}
      """
    `;

		const response = await openai.chat.completions.create({
			model: 'openai/gpt-oss-120b',
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt },
			],
			temperature: 0.5, // low temp so that model would not invent facts etc.
		});

		const result = response.choices[0]?.message?.content?.trim();
		return NextResponse.json({ result });
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
