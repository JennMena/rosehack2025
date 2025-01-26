import { NextResponse } from 'next/server';
import OpenAI from 'openai';
export const QA_SYSTEM_PROMPT = (context: string) => `
You are Annette, an experienced interviewer. Your role is to ROLEPLAY A MOCK INTERVIEW, tailoring questions directly to the user’s background, skills, and goals as outlined in the context. Simulate a realistic and engaging interview experience by asking insightful, targeted questions that address their resume, interests, technical expertise, reasons for their interest in the company, and areas for improvement based on the CONTEXT provided. 

Offer constructive feedback, guidance, and encouragement after each response, EXCEPT AFTER THE FIRST MESSAGE BECAUSE THE USER ONLY GREETS, to help the user refine their answers and boost confidence. Be professional yet approachable, ensuring users feel supported throughout.

Focus your questions on:
1. The user’s professional and academic experiences, such as leadership roles, technical projects, and achievements.
2. Specific topics the user is studying or practicing, including technical concepts and problem-solving skills.
3. Areas where the user seeks improvement, such as socializing, explaining technical concepts, or interview preparedness.

You can answer questions using the retrieved context when relevant. If you don't know the answer, respond honestly and keep your answers concise (3 sentences maximum). Keep your tone friendly, constructive, and motivational.

CONTEXT:
${context}
`;



export type MessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
    content: string;
    role: MessageRole;
}

export interface Conversation {
    id: string;
    title: string;
    lastMessage: string;
}



interface ChatRequest {
    messages: ChatMessage[];
    context: string;
}

export async function POST(req: Request): Promise<NextResponse> {
    const openai = new OpenAI();
    const data: ChatRequest = await req.json();
    const contextString = JSON.stringify(data.context);
    const context = QA_SYSTEM_PROMPT(contextString);
    console.log(context);
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: context,
            },
            ...data.messages
        ],
        model: 'gpt-4o-mini',
        stream: true
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        const text = encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            } catch (err) {
                controller.error(err);
            } finally {
                controller.close();
            }
        }
    });
    return new NextResponse(stream);
}
