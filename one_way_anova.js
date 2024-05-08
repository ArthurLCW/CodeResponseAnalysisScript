const jStat = require("jstat").jStat;

function performOneWayANOVA(data) {
  const groups = Object.keys(data).map((key) => data[key]);
  const fScore = jStat.anovafscore(groups);

  // Check if fScore is a finite number
  if (Number.isFinite(fScore)) {
    const pValue = jStat.anovaftest(
      fScore,
      groups.length - 1,
      groups.reduce((acc, curr) => acc + curr.length, 0) - groups.length
    );
    return { F: fScore, pValue: pValue };
  } else {
    return { error: "F-score calculation failed", fScore };
  }
}

const data = {
  with: [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0.78, 1, 1, 1, 1, 0.67, 0.56, 1, 0.56, 0.84, 1,
    0.95, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ],
  without: [
    1, 0, 1, 0.25, 1, 1, 0, 1, 1, 0.67, 1, 0.44, 1, 0.44, 1, 1, 0.56, 0.68, 1,
    1, 0, 1, 0, 1, 1, 1, 1, 1,
  ],
};

console.log(jStat.mean(data["with"]));
console.log(jStat.mean(data["without"]));
console.log(jStat.median(data["with"]));
console.log(jStat.median(data["without"]));

const result = performOneWayANOVA(data);
console.log(result);
