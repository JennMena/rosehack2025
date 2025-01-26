import { NextResponse } from 'next/server';
import { OpenAI } from 'openai'; // Ensure you have OpenAI package installed

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Extract resume content from the request body
    const { resumeContent } = await req.json();

    // Define the prompt for extracting structured data from the resume
    const prompt = `
      Extract the following details from the resume:

      1. Role titles
      2. Overall job title
      3. Work experience (with dates)
      4. Skills (both hard and soft skills)
      5. Projects (with descriptions)
      6. Interests
      7. Observations on strengths
      8. Observations on weaknesses

      The answer should be in the following JSON format:

      {
        "roles": ["list of role titles"],
        "overallJobTitle": "overall job title",
        "workExperience": [
          {"company": "Company Name", "role": "Role", "dates": "Date Range", "description": "Job Description"}
        ],
        "skills": ["list of skills"],
        "projects": [
          {"projectTitle": "Project Title", "description": "Project Description"}
        ],
        "interests": ["list of interests"],
        "strengths": "Strengths Observations",
        "weaknesses": "Weaknesses Observations"
      }

      Resume content:
      ${resumeContent}
    `;

    // Request OpenAI API for structured data extraction
    const completion = await openaiClient.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt,
      max_tokens: 1000,
      temperature: 0.5,
    });

    const extractedData = completion.choices[0]?.text?.trim();

    if (!extractedData) {
      throw new Error('Failed to extract information');
    }

    // Parse the JSON string returned by GPT
    const parsedData = JSON.parse(extractedData);

    return NextResponse.json({ data: parsedData });
  } catch (error) {
    console.error('Error extracting resume data:', error);
    return NextResponse.json({ error: 'Failed to process resume content' }, { status: 500 });
  }
}
