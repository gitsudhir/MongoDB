const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const xlsx = require("xlsx");

if (isMainThread) {
  const express = require("express");
  const multer = require("multer");
  const xlsx = require("xlsx");
  const mongoose = require("mongoose");
  const cors = require("cors");
  const { run, insertData } = require("./database");
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(cors());
  // Multer configuration for file upload
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  // Express route to handle file upload
  app.post("/upload", upload.single("file"), (req, res) => {
    try {
      const worker = new Worker(__filename, {
        workerData: req.file.buffer,
      });

      // Listen for messages from the worker thread
      worker.on("message", (data) => {
        data.forEach((item) => {
          item.dob = convertExcelDateToJSDate(item.dob);
          item.policy_start_date = convertExcelDateToJSDate(
            item.policy_start_date
          );
          item.policy_end_date = convertExcelDateToJSDate(item.policy_end_date);
        });
        const convertedData = data.map((item) => ({
          agent: item.agent,
          user: {
            firstname: item.firstname,
            dob: item.dob,
            address: item.address,
            phonenumber: item.phone,
            state: item.state,
            zip: item.zip,
            email: item.email,
            gender: "", // You'll need to provide this value separately
            userType: item.userType,
            account_name: item.account_name,
          },
          policy_category: item.category_name,
          policy_carrier: item.company_name,
          policy: {
            policynumber: item.policy_number,
            policy_start_date: item.policy_start_date,
            policy_end_date: item.policy_end_date,
            policy_collection_id: "", // You'll need to provide this value separately
            company_collection_id: "", // You'll need to provide this value separately
            user_id: "", // You'll need to provide this value separately
          },
        }));
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
        insertData(convertedData)
          .then((v) => {
            console.log(v);
            res.send(convertedData);
          })
          .catch((e) => {
            console.log(e);
            res.status(500).send("Error Inserting  data");
          });
      });

      // Listen for errors from the worker thread
      worker.on("error", (error) => {
        console.error(error);
        res.status(500).send("Error processing file");
      });

      //   res.json({ convertedData });
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
} else {
  // Worker thread logic
  const buffer = workerData;

  // Parse Excel file
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  // Send the parsed data back to the main thread
  parentPort.postMessage(data);
}
