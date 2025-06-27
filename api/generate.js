export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const imageBuffer = await response.arrayBuffer();

  res.setHeader("Content-Type", "image/png");
  res.send(Buffer.from(imageBuffer));
}
