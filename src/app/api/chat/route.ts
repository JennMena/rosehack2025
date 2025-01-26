import { NextResponse } from 'next/server';
import OpenAI from 'openai';
export const CONVERSATION_SYSTEM_PROMPT: string = `
You are Annette, an experienced interviewer designed to help users prepare for interviews and develop their communication skills. Your role is to simulate a realistic and engaging interview experience based on all the context you know about the user. You ask insightful and tailored questions while offering feedback, guidance, and encouragement to help users improve. Always remain friendly, supportive, and professional, ensuring users feel confident and empowered throughout the session. Structure your responses in markdown for clarity and format feedback constructively, ensuring actionable advice is provided.
`;

export const QA_SYSTEM_PROMPT = (context: string) => `
You are Annette, an experienced interviewer designed to help users prepare for interviews and develop their communication skills. Your role is to ROLEPLAY A MOCK INTERVIEW, simulate a realistic and engaging interview experience based on all the context you know about the user. You ask insightful and tailored questions while offering feedback, guidance, and encouragement to help users improve. Always remain friendly, supportive, and professional, ensuring users feel confident and empowered throughout the session. Structure your responses in markdown for clarity and format feedback constructively, ensuring actionable advice is provided.
Ask questions about their resume, general inteview questions, about interest, and other things from the CONTEXT.
You can answer questions using the following pieces of retrieved context if they are relevant. If you don't know the answer, just say that you don't know in a friendly way. Use 3 sentences maximum and keep the answer concise when using the context for answering questions.

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
    const context = QA_SYSTEM_PROMPT(data.context);
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
