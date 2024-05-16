const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");

// Function to read and filter CSV data
function filterCSV(inputFilePath, outputFilePath) {
  const input = fs.createReadStream(inputFilePath);
  const output = fs.createWriteStream(outputFilePath);
  const parser = input.pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    })
  );
  const stringifier = stringify({ header: true });

  parser.on("data", (row) => {
    if (row.invalid !== "YES" && row.cheat !== "YES") {
      stringifier.write(row);
    }
  });

  parser.on("end", () => {
    console.log("CSV file has been processed and filtered.");
    stringifier.end(); // Close the writable stream
  });

  parser.on("error", (error) => {
    console.error("Error during CSV parsing:", error);
  });

  stringifier.on("error", (error) => {
    console.error("Error during CSV stringifying:", error);
  });

  stringifier.pipe(output); // Pipe the stringifier output to the output file stream
}

// Example usage
const inputFilePath = "data.csv"; // Ensure the path is correct and file exists
const outputFilePath = "data-deleted.csv";
filterCSV(inputFilePath, outputFilePath);
