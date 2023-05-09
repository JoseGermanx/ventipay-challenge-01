
const fs = require("fs"); //TODO JG acceder al sistema de archivos

const getMethodDetail = (req, res) => {
    const { id } = req.params;
    try {
      fs.readFile("./data/data.json", (error, file) => {
        if (error) {
          res.status(500).json({ message: "Can not access to the database" });
          console.log("Can not access to the database", error);
        }
        const data = JSON.parse(file);
        console.log(data);
        const paymentMethod = data.filter((e) => e.id.toString() === id);
        if (paymentMethod.length === 0) {
          res.status(404).json({ message: "No payment method found" });
        } else {
          res.status(200).json(paymentMethod);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = getMethodDetail