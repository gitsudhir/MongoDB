const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Express route to handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    // Parse Excel file
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Insert data into MongoDB
    Data.insertMany(data, (err, docs) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error uploading data to MongoDB");
      } else {
        console.log("Data uploaded successfully:", docs);
        res.status(200).send("Data uploaded successfully");
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).send("Error parsing Excel file");
  }
});
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is Good!." });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
