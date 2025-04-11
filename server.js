const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// URL y clave de la API de NVIDIA
const API_URL = "https://api.nvidia.com/v1/models/nvidia/llama-3.1-nemotron-ultra-253b-v1:free/generate";
const API_KEY = "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";

// Endpoint para generar guías visuales
app.post("/generate", async (req, res) => {
    try {
        const { prompt } = req.body;

        // Validar que se haya enviado un prompt
        if (!prompt) {
            return res.status(400).json({ error: "El campo 'prompt' es requerido." });
        }

        // Llamar a la API de NVIDIA
        const response = await axios.post(API_URL, {
            prompt,
            max_tokens: 100
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            }
        });

        // Enviar la respuesta al frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error al comunicarse con la API:", error.message);
        res.status(500).json({ error: "Error al generar la guía visual." });
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});