document.getElementById("resumeBtn").addEventListener("click", async function (event) {
    event.preventDefault();

    try {
        const response = await fetch("./resume.pdf");

        if (!response.ok) {
            throw new Error("Resume not found");
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "Pallavi_Resume.pdf";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error(error);
        alert("Unable to download resume.");
    }
});