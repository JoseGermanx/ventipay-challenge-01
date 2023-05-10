const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs"); //TODO JG acceder al sistema de archivos

const exportCsv = (req, res) => {
  try {
    fs.readFile("./data/data.json", (error, file) => {
      const data = JSON.parse(file);
      if (error) {
        res.status(500).json({ message: "Can not access to the database" });
        console.log("Can not access to the database", error);
      }
      if (file.length === 0) {
        res.status(404).json({ message: "No payment methods found" });
      }
      const workSheetColumnName = [
        "id",
        "brand",
        "type",
        "last4",
        "created_at",
      ];

      const workSheetName = "report";
      const filePathCsv = "./assets/report.csv";

      const dataBook = data.map((o) => {
        return [o.id, o.brand, o.type, o.last4, o.created_at];
      });

      const workBook = XLSX.utils.book_new();
      const workSheetData = [workSheetColumnName, ...dataBook];

      const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
      XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
      XLSX.writeFile(workBook, path.resolve(filePathCsv));

      res.status(200).json({ message: "Report created" });
      return true;
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = exportCsv;
