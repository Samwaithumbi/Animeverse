import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors()); // Enable CORS

app.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ error: "Query parameter is required" });

        const response = await axios.get(`https://api.consumet.org/anime/gogoanime/${query}`);
        console.log("API Response:", response.data); // Debugging

        res.json(response.data); // Send response to frontend
    } catch (error) {
        console.error("Error fetching anime:", error);
        res.status(500).json({ error: "Failed to fetch anime" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
