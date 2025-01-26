'use server';
import axios from 'axios';
import pdf from 'pdf-parse';

export default async function handler(req: { method: string; body: { fileUrl: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; text?: string; }): any; new(): any; }; }; }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fileUrl } = req.body;

  if (!fileUrl) {
    return res.status(400).json({ error: 'File URL is required' });
  }

  try {
    // Fetch the file from the URL
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const fileBuffer = Buffer.from(response.data);

    // Extract text from the PDF
    const pdfData = await pdf(fileBuffer);
    const extractedText = pdfData.text;

    return res.status(200).json({ text: extractedText });
  } catch (error) {
    console.error('Error extracting text:', (error as any).message);
    return res.status(500).json({ error: 'Failed to extract text from file' });
  }
}
