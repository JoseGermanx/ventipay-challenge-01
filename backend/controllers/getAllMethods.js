

const fs = require("fs"); //TODO JG acceder al sistema de archivos

const getAllMethods = (req, res) => {
    const { type } = req.query;
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
        if (type) {
          const paymentType = data.filter((e) => e.type === type);
          return res.status(200).json(paymentType);
        } else {
          res.status(200).json(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = getAllMethods;