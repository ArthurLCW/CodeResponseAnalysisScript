// this file generates the table from json data
// do not erase existing data, directly add data after the existing data

// hyper-parameters
const jsonFileName = "data.json";
const csvFileName = "data.csv";
const investigatedProject = undefined;
const investigatedBatch = undefined;
const investigatedParticipant = undefined;
const removedKeys = [
  "currentPage",
  "initPageNum",
  "lcwRecordInfo",
  "sessionId",
  "studyId",
];
// const neededKeys = [];
const neededKeys = [
  "prolificId",
  "project",
  "batch",
  "questionSet",
  "leaveFullScreenTimes",
  "runRecords3",
  "runRecords4",
  "submitRecords3",
  "submitRecords4",
];
const coding1Num = "3-0: ";
const coding2Num = "4-0: ";

const fs = require("fs");
const { parse } = require("csv-parse/sync");
const { stringify } = require("csv-stringify/sync");
const bruteForceSimilarity = require("./bruteForceSimilarity");
const readJplagSimilarity = require("./readJplagSimilarity");

// check runRecord/submitRecord data, output 1 if pass, 0.1 if fail, 0 if do not exist
function checkRunRecord(records) {
  if (!records) return 0;
  const arrAll = JSON.parse(records);
  let isAllCorrect = false;
  for (let i = 0; i < arrAll.length; i++) {
    const arrBatch = arrAll[i];
    let isBatchCorrect = true;
    arrBatch.forEach((testcase) => {
      if (testcase.status.id !== 3) isBatchCorrect = false;
    });
    if (isBatchCorrect) {
      isAllCorrect = true;
      break;
    }
  }
  if (isAllCorrect) return 1;
  else return 0.1;
}

// concentration check
function checkLeaveFullScreen(leaves) {
  if (!leaves) return "";
  const obj = JSON.parse(leaves);
  let freq = 0;
  let duration = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      freq += obj[key][0];
      duration += obj[key][1];
    }
  }
  if (freq > 2 || duration > 2) {
    return "YES";
  } else return "";
}

// Function to read existing CSV data and convert it back to JSON
function readCSVtoJSON(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const csvContent = fs.readFileSync(filePath, "utf8");
  return parse(csvContent, { columns: true, skip_empty_lines: true });
}

// Function to update and write to the CSV
function updateCSV(filePath, newJsonData, removedKeys) {
  let existingRecords = readCSVtoJSON(filePath);

  // remove unnecessary keys
  removedKeys.forEach((key) => delete newJsonData[key]);

  // keep needed keys
  let coding1KeyName = ""; // get coding key in advance
  let coding2KeyName = "";
  if (neededKeys.length > 0) {
    for (const key in newJsonData) {
      if (!newJsonData.hasOwnProperty(key)) continue;
      if (!neededKeys.includes(key)) {
        if (key.includes(coding1Num)) {
          coding1KeyName = key.slice(10);
        } else if (key.includes(coding2Num)) {
          coding2KeyName = key.slice(10);
        } else delete newJsonData[key];
      }
    }
  }

  // remove all 'lcwSurvey-' in keys
  // remove the value of the two coding questions in the csv
  for (const key in newJsonData) {
    if (!newJsonData.hasOwnProperty(key)) continue;
    if (key.includes("lcwSurvey-")) {
      newJsonData[key.slice(10)] = JSON.parse(JSON.stringify(newJsonData[key]));
      delete newJsonData[key];
    }
  }

  // deal with run and submit
  newJsonData["runRecords3"] = checkRunRecord(newJsonData["runRecords3"]);
  newJsonData["runRecords4"] = checkRunRecord(newJsonData["runRecords4"]);
  newJsonData["submitRecords3"] = checkRunRecord(newJsonData["submitRecords3"]);
  newJsonData["submitRecords4"] = checkRunRecord(newJsonData["submitRecords4"]);
  const codeExecutionSummary =
    newJsonData["runRecords3"] +
    newJsonData["runRecords4"] +
    newJsonData["submitRecords3"] +
    newJsonData["submitRecords4"];
  if (codeExecutionSummary >= 1) newJsonData["codeExecutionSummary"] = 1;
  else if (codeExecutionSummary > 0) newJsonData["codeExecutionSummary"] = 0;
  else if (codeExecutionSummary === 0) newJsonData["codeExecutionSummary"] = -1;

  // deal with leave full screen
  newJsonData["cheat"] = checkLeaveFullScreen(
    newJsonData["leaveFullScreenTimes"]
  );

  // calculate brute force similarity
  const bruteforceSimObj = bruteForceSimilarity(
    newJsonData[coding2KeyName],
    newJsonData["questionSet"]
  );
  newJsonData["BF_P_Sim"] = bruteforceSimObj["BF_P_Similarity"];
  newJsonData["BF_AI_Sim"] = bruteforceSimObj["BF_AI_Similarity"];
  delete newJsonData[coding1KeyName];
  delete newJsonData[coding2KeyName];
  console.log(coding1KeyName, coding2KeyName);

  // record JPlag
  const jplagSimObj = readJplagSimilarity(newJsonData["prolificId"]);
  newJsonData["JPlag_P_Sim"] = jplagSimObj["JPlag_P_Sim"];
  newJsonData["JPlag_AI_Sim"] = jplagSimObj["JPlag_AI_Sim"];

  // translate to csv logics...
  // Combine existing and new records to ensure all fields are captured
  const combinedData = existingRecords.concat(newJsonData);

  // Extract all unique keys (column headers) from all records
  const allKeys = new Set();
  combinedData.forEach((record) => {
    Object.keys(record).forEach((key) => allKeys.add(key));
  });

  // Prepare columns for stringifying using extracted keys
  const columns = Array.from(allKeys).map((header) => ({
    key: header,
    header,
  }));

  // Convert the combined JSON data to CSV with dynamic columns
  const csvString = stringify(combinedData, { header: true, columns });

  // Write the CSV file
  fs.writeFileSync(filePath, csvString);
  // console.log("CSV file has been updated with dynamic columns.");
}

// Load the JSON data from the file
fs.readFile(jsonFileName, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);
  let combinedCode = "";

  // iterate projects
  for (const projectKey in jsonData) {
    if (!jsonData.hasOwnProperty(projectKey)) continue;
    if (investigatedProject && projectKey !== investigatedProject) continue;

    // iterate batch
    const project = jsonData[projectKey];
    for (const batchKey in project) {
      if (!project.hasOwnProperty(batchKey)) continue;
      if (investigatedBatch && batchKey !== investigatedBatch) continue;

      // iterate participant
      const batch = project[batchKey];
      for (const participantKey in batch) {
        if (!batch.hasOwnProperty(participantKey)) continue;
        if (
          investigatedParticipant &&
          participantKey !== investigatedParticipant
        )
          continue;

        // read participant's data
        const participant = batch[participantKey];
        updateCSV(csvFileName, participant, removedKeys);
      }
    }
  }
});
