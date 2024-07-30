## Introduction

This project processes the data obtained by the survey for further SPSS analysis. To be more specific, the usage of this project was: 

(1) extracting code written by participants, 

(2) calculating the four types of code similarity metrics, 

(3) trimming the raw data from a JSON to a CSV file. 

## Setup

1. Download raw data from Firebase, and change the name to "data.json".
2. To get codes written by participants, run `node getParticipantsCodes.js`, and get the participants' submitted codes. Participants' submitted codes on page three will be placed in folder `\codingTask1` , while participants' submitted codes on page four will be placed in `\codingTask2`. 
3. If you want to view all participants' submitted codes in one single file, run `node .\concatenate.js`, and get all submitted codes in file `combinedCodes.js`. 
4. You can review participants' submitted codes, and list the invalid responses in `invalidResponse.json`
5. Run `.\codesProcess.bat` to calculate code similarity. 
6. Run `genTable` to get the processed raw data. The file `data-filtered.csv` is the csv file that could be used for further analysis. 
