export default async function handler(req, res) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const train = req.query.train;

  if (!train) {
    return res.status(400).json({
      error: "Train number required"
    });
  }

  try {

    const response = await fetch(
      `https://train-running-api.p.rapidapi.com/api/LiveTrainApi?trainnumber=${train}&start_day=0`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": "train-running-api.p.rapidapi.com"
        }
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}
