document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate-button");
    const exportButton = document.getElementById("export-button");
    const textInput = document.getElementById("text-input");
    const outputSection = document.getElementById("output-section");
    const visualGuideContainer = document.getElementById("visual-guide-container");

    // Evento para generar la guía visual usando el backend
    generateButton.addEventListener("click", async () => {
        const text = textInput.value.trim();
        if (!text) {
            alert("Por favor, ingresa un texto.");
            return;
        }

        try {
            // Llamar al backend
            const response = await fetch("http://localhost:3000/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: text
                })
            });

            if (!response.ok) {
                throw new Error("Error al comunicarse con el backend.");
            }

            const data = await response.json();
            const generatedText = data.choices[0].text; // Suponiendo que la API devuelve un campo "choices"

            // Mostrar la guía visual (en este caso, texto generado)
            visualGuideContainer.innerHTML = `<pre>${generatedText}</pre>`;
            outputSection.classList.remove("hidden");
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });

    // Evento para exportar la guía visual
    exportButton.addEventListener("click", () => {
        const guideContent = visualGuideContainer.querySelector("pre");
        if (!guideContent) {
            alert("No hay una guía visual para exportar.");
            return;
        }

        // Crear un archivo de texto con el contenido
        const blob = new Blob([guideContent.textContent], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "guia_visual.txt";
        link.click();
    });
});