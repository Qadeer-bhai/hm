export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: "Image generation failed" });
  }
      }
