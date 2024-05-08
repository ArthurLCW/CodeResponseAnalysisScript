const fs = require("fs");
const path = require("path");

// Directory containing the JSON files
const directoryPath = path.join(__dirname, "similarity_records");

/**
 * Searches JSON files in a specified directory that contain a given ID in their filenames.
 * Reads and returns the 'first_similarity' value from the JSON content synchronously.
 *
 * @param {string} id The ID to search for in the filenames.
 * @returns {Object} An object containing similarity data.
 */
function readJplagSimilarity(id) {
  // Read directory for JSON files synchronously
  const files = fs.readdirSync(directoryPath);

  // Filter files that contain the id in their filenames
  const filteredFiles = files.filter(
    (file) => file.includes(id) && file.endsWith(".json")
  );

  if (filteredFiles.length === 0) {
    return {};
  }

  // Process the first matching file
  const filePath = path.join(directoryPath, filteredFiles[0]);
  const data = fs.readFileSync(filePath, "utf8");
  try {
    const jsonData = JSON.parse(data);
    return {
      JPlag_P_Sim:
        jsonData.id1 !== "ai"
          ? jsonData.first_similarity
          : jsonData.second_similarity,
      JPlag_AI_Sim:
        jsonData.id1 !== "ai"
          ? jsonData.second_similarity
          : jsonData.first_similarity,
    };
  } catch (parseErr) {
    console.error("Error parsing JSON from file: " + filePath, parseErr);
    return {};
  }
}

// console.log("before");
// const result = readJplagSimilarity("5db9a74d4a8687000b9ef833");
// console.log(result);
// console.log("after");

module.exports = readJplagSimilarity;
