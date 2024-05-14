## Introduction

This project analyzes the data obtained by the survey in Changwen's UniMelb research.

## Setup

1. Download raw data from firebase, change the name as "data.json".
2. run `getParticipantsCodes.js`, get the participants' responses.
3. Use Jplag to get the code similarity for each programming problem. Copy and paste the codes of a programming problem into the `submission` folder and alter the code in `ai` folder.
4. run with `java -jar jplag-5.0.0-jar-with-dependencies.jar -new .\submissions\ -l javascript --cluster-skip -t 6 -n -1`
5. Use `similarityRecordFilter.js` to filter the similarity records related to AI, copy them to `similarity_records`.
6. Run `genTable` to get the processed raw data.
