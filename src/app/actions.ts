"use server";

export async function handleAIPrompt(formData: FormData) {
  const prompt = formData.get("prompt") as string;

  if (!prompt) {
    return { error: "Prompt is empty." };
  }

  // This is a simplified intent parser. A more robust solution would use an LLM.
  const callRegex = /call\s+((?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/i;
  const match = prompt.match(callRegex);

  if (match && match[1]) {
    const phoneNumber = match[1];
    console.log(`Initiating call to: ${phoneNumber}`);
    // In a real app, you would trigger the Twilio API call here.
    return { message: `Dialing ${phoneNumber}...` };
  }
  
  return { error: "Sorry, I can't handle that request yet." };
}
