const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const mongoose = require("mongoose");
const { run } = require("./database");
run("this is text").then(console.log).catch(console.dir);
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

    data.forEach((item) => {
      item.dob = convertExcelDateToJSDate(item.dob);
      item.policy_start_date = convertExcelDateToJSDate(item.policy_start_date);
      item.policy_end_date = convertExcelDateToJSDate(item.policy_end_date);
    });

    // Function to convert Excel date to JavaScript Date object
    function convertExcelDateToJSDate(excelDate) {
      const dateOffset = (excelDate - 25569) * 86400 * 1000; // Offset in milliseconds
      const jsDate = new Date(dateOffset);
      const day = jsDate.getDate();
      const month = jsDate.getMonth() + 1; // Months are zero-based
      const year = jsDate.getFullYear();

      // Ensure day and month are formatted with leading zeros if necessary
      const formattedDay = day < 10 ? "0" + day : day;
      const formattedMonth = month < 10 ? "0" + month : month;

      return formattedDay + "-" + formattedMonth + "-" + year;
    }
    res.json({ data });
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
