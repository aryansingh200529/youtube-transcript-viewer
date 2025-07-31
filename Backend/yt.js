import express from "express";
import transcriptRoutes from "./routes/transcript.js"; 
import cors from "cors";

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/api", transcriptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
