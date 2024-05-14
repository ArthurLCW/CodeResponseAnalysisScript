// const jStat = require("jstat").jStat;

// const data = [
//   { diet: "Vegan", exercise: "Regular", cholesterol: 180 },
//   { diet: "Vegan", exercise: "Regular", cholesterol: 190 },
//   { diet: "Vegan", exercise: "None", cholesterol: 200 },
//   { diet: "Vegan", exercise: "None", cholesterol: 210 },
//   { diet: "Meat-based", exercise: "Regular", cholesterol: 220 },
//   { diet: "Meat-based", exercise: "Regular", cholesterol: 230 },
//   { diet: "Meat-based", exercise: "None", cholesterol: 240 },
//   { diet: "Meat-based", exercise: "None", cholesterol: 250 },
// ];

// function extractGroups(data, factor) {
//   return data.reduce((acc, d) => {
//     const key = d[factor];
//     acc[key] = acc[key] || [];
//     acc[key].push(d.cholesterol);
//     return acc;
//   }, {});
// }

// function performOneWayAnova(data, factor) {
//   const groups = extractGroups(data, factor);
//   const groupValues = Object.values(groups);
//   const anovaResult = jStat.anovaftest(...groupValues);
//   console.log(`One-Way ANOVA F-test for ${factor}: F = ${anovaResult}`);
// }

// function performTwoWayAnova(data, factor1, factor2) {
//   const groupCombination = data.map((d) => `${d[factor1]}-${d[factor2]}`);
//   const uniqueGroups = Array.from(new Set(groupCombination));
//   const groupedData = uniqueGroups.map((group) => {
//     return data
//       .filter((d) => `${d[factor1]}-${d[factor2]}` === group)
//       .map((d) => d.cholesterol);
//   });
//   const anovaResult = jStat.anovaftest(...groupedData);
//   console.log(
//     `Two-Way ANOVA F-test for ${factor1} and ${factor2}: F = ${anovaResult}`
//   );
// }

// // Perform One-Way ANOVA for each factor
// performOneWayAnova(data, "diet");
// performOneWayAnova(data, "exercise");

// // Perform Two-Way ANOVA for interaction between factors
// performTwoWayAnova(data, "diet", "exercise");

const anova = require("anova-multway");

const data = [
  { diet: "Vegan", exercise: "Regular", cholesterol: 180 },
  { diet: "Vegan", exercise: "Regular", cholesterol: 190 },
  { diet: "Vegan", exercise: "None", cholesterol: 200 },
  { diet: "Vegan", exercise: "None", cholesterol: 210 },
  { diet: "Meat-based", exercise: "Regular", cholesterol: 220 },
  { diet: "Meat-based", exercise: "Regular", cholesterol: 230 },
  { diet: "Meat-based", exercise: "None", cholesterol: 240 },
  { diet: "Meat-based", exercise: "None", cholesterol: 250 },
];

// Reformat data for the anova-multway library
const formattedData = data.map((item) => ({
  factors: { diet: item.diet, exercise: item.exercise },
  response: item.cholesterol,
}));

// Conduct the two-way ANOVA
const results = anova(formattedData, ["diet", "exercise"]);

console.log("ANOVA Table:");
console.log("Source\t\tSS\t\tDF\t\tMS\t\tF\t\tp-value");
results.table.forEach((row) => {
  console.log(
    `${row.source}\t\t${row.ss.toFixed(2)}\t\t${row.df}\t\t${row.ms.toFixed(
      2
    )}\t\t${row.f.toFixed(2)}\t\t${row.p.toFixed(5)}`
  );
});
