const fetch = require("node-fetch");
const csv = require("csv-parser");

const fetchCsvData = async (url) => {
  const rows = [];
  const response = await fetch(url);
  const body = response.body;
  await new Promise((resolve, reject) => {
    body
      .pipe(csv({ headers: true }))
      .on("data", (data) => {
        const rowObject = {};
        if (rows.length === 0) {
          // First row is the header row
          for (const header of Object.keys(data)) {
            rowObject[header] = data[header];
          }
        } else {
          // Other rows are data rows
          for (const header of Object.keys(data)) {
            rowObject[rows[0][header]] = data[header];
          }
        }
        rows.push(rowObject);
      })
      .on("error", (error) => reject(error))
      .on("end", () => {
        rows.shift(); // remove header row
        resolve(rows);
      });
  });
  return rows;
};

module.exports = { fetchCsvData };
