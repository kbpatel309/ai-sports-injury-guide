import { NextResponse } from "next/server";
import OpenAI from 'openai'

const systemPrompt = `
You are an AI assistant that helps users with general questions and concerns about various sports injuries. Answer clearly and helpfully.
`

export async function POST(req: Request) {
    const data = await req.json()

    try {
        const openai = new OpenAI()

        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                ...data
            ],
            model: 'gpt-4o-mini',
        })

        const responseContent = completion.choices[0].message.content
        return NextResponse.json({ role: 'assistant', content: responseContent })
    } catch (error) {
        console.error('Error calling OpenAI:', error)
        return NextResponse.json(
            { role: 'assistant', content: 'Sorry, something went wrong talking to the AI. Please try again.' },
            { status: 500 }
        )
    }
}


