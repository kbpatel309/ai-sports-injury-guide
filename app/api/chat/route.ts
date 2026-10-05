import { NextResponse } from "next/server";
import OpenAI from 'openai'
import { Pinecone } from '@pinecone-database/pinecone'


/*
const systemPrompt = `
You are an AI assistant that helps users with general questions and concerns about various sports injuries. Answer clearly and helpfully.
`
*/


export async function POST(req: Request) {
    const data = await req.json()

    try {
        const openai = new OpenAI()
        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!
        })
        const index = pc.index(process.env.PINECONE_INDEX!).namespace('ns1')

        const text = data[data.length - 1].content
        const embedding = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: text,
            encoding_format: 'float',
        })

        const results = await index.query({
            topK: 1,
            includeMetadata: true,
            vector: embedding.data[0].embedding
        })

        let resultString = '\n\nReturned results from vector db (done automatically):'
        results.matches.forEach((match) => {
            resultString+=`\n
            Injury: ${match.id}\n
            Description: ${match.metadata!.description}\n
            Anatomy: ${match.metadata!.anatomy}\n
            Treatment: ${match.metadata!.treatment}\n
            \n\n
            `
    })

        /*
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                ...data
            ],
            model: 'gpt-4o-mini',
        })

        
        const responseContent = completion.choices[0].message.content
        return NextResponse.json({ role: 'assistant', content: responseContent })
        */

        return NextResponse.json({ role: 'assistant', content: resultString})
    } catch (error) {
        console.error('Error calling OpenAI:', error)
        return NextResponse.json(
            { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
            { status: 500 }
        )
    }
}


