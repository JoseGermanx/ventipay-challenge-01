const fs = require("fs"); //TODO JG acceder al sistema de archivos

const deleteMethod = (req, res) => {
    const { id } = req.params;
    try {
      fs.readFile("./data/data.json", (error, file) => {
        if (error) {
          res.status(500).json({ message: "Can not access to the database" });
          console.log("Can not access to the database", error);
        }
        const data = JSON.parse(file);
        const idValidatorDb = data.find((e) => e.id.toString() === id);
        if (idValidatorDb) {
          data.forEach((e) => {
            if (e.id === Number(id)) {
              data.splice(data.indexOf(e), 1);
              const methodDeleted = JSON.stringify(data, null, 2);
              res.status(200).json({ data });
              fs.writeFile("./data/data.json", methodDeleted, (error) => {
                if (error) {
                  res
                    .status(500)
                    .json({ message: "Can not access to the database" });
                  console.log("Can not access to the database", error);
                } else {
                  console.log("Data deleted");
                }
              });
            }
          });
        } else {
          res.status(404).json({ message: "No payment id method found" });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = deleteMethod;