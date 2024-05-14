// hyper-parameters
const jsonFileName = "data.json";
const investigatedProject = undefined;
const investigatedBatch = undefined;
const investigatedParticipant = undefined;

const fs = require("fs");

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
        let code1Key = "lcwSurvey-3-0: " + participant["taskFile"].slice(0, -3); // remove ".md"
        let code2Key =
          "lcwSurvey-4-0: " + participant["lcwSurveyRandomMd"].slice(0, -3);
        let code1 = participant[code1Key].replace(/\\n/g, "\n");
        let code2 = participant[code2Key].replace(/\\n/g, "\n");
        combinedCode += `// Code for participant ${participantKey} in ${projectKey} of batch ${batchKey}\n`;
        combinedCode += `// ${code1Key}:\n`;
        combinedCode += `${code1}\n\n`;
        combinedCode += `// ${code2Key}:\n`;
        combinedCode += `${code2}\n\n`;
        console.log(projectKey, batchKey, participantKey);
      }
    }
  }

  // Output the combined and formatted code to a new file
  fs.writeFile("combinedCode.js", combinedCode, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log(
      "Combined and formatted code was successfully written to combinedCode.js"
    );
  });
});
