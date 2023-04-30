import axios from "axios";

export default async function (req, res) {
  const { companyName, industry } = req.body;

  if (companyName.trim() === 0 || !companyName) {
    res.status(400).json({
      error: {
        message: "Please enter a valid company name",
      },
    });
    return;
  }

  if (industry.trim() === 0 || !industry) {
    res.status(400).json({
      error: {
        message: "Please enter a valid industry",
      },
    });
    return;
  }
  try {
    let completion = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: generatePrompt(companyName, industry),
          },
        ],
       
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization":  `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const completion_text = completion.data.choices[0].message.content;
    res.status(200).json({ data: completion_text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(companyName, industry) {
  return `Prepare review about company. Company industry is ${industry} and company name ${companyName}. Review should be at least 40 words.`;
}
