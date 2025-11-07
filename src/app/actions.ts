
"use server";

/**
 * This is a server action to handle the AI prompt from the main dashboard.
 * It's a simple proof-of-concept for intent recognition.
 */
export async function handleAIPrompt(formData: FormData) {
  const prompt = formData.get("prompt") as string;

  if (!prompt) {
    return { error: "Prompt is empty." };
  }

  // Super basic intent parsing with a regex. A real app would use an LLM for this.
  // I'm just looking for "call" and then a phone number.
  const callRegex = /call\s+((?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/i;
  const match = prompt.match(callRegex);

  if (match && match[1]) {
    const phoneNumber = match[1];
    // console.log is useful for debugging on the server
    console.log(`Initiating call to: ${phoneNumber}`);
    // In a real app, you would trigger an API call to Twilio or a similar service here.
    return { message: `Dialing ${phoneNumber}...` };
  }
  
  // If no intent is matched, return a generic error.
  return { error: "Sorry, I can't handle that request yet." };
}
