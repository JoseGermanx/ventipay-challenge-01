/**
 * Instructions
 *
 * Implement an endpoint that lists all payment methods and accepts a filter by "type"
 * Implement an endpoint that shows the details of a single payment method
 * Implement an endpoint that deletes a single payment method
 * Implement an endpoint that exports all payments methods in CSV format
 *
 * Make sure you handle errors (not found, server error, etc.) with a proper HTTP status
 * Use async/await when possible
 * All endpoints must send a valid JSON response
 * The server must be started using a non-privileged port
 * You don't need to use a database to handle data, using an in-memory object is OK just make sure the delete endpoint works and that you provide an initial seed
 * A Payment Method record must use the following schema:
 * {
 *  id: <some random ID>,
 *  brand: <string, one of [visa,master,amex,discovery]>,
 *  type: <string, one of [credit_card,debit_card]>,
 *  last4: <int(4)>,
 *  created_at: <datetime>
 * }
 *
 */

const express = require("express");

const server = express();
const fs = require("fs"); //TODO JG acceder al sistema de archivos
const cors = require("cors"); //TODO JG implementar cors
//TODO JG configure
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

//TODO JG modify to filter by type an return all payment methods with refactor to use try/catch

server.get("/payment_methods", (req, res) => {
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
});

//TODO JG implement endpoint to find a single payment method
server.get("/payment_methods/details/:id", (req, res) => {
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
});

//TODO JG implement endpoint to delete a single payment method
server.delete("/payment_methods/delete/:id", (req, res) => {
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
                res.status(500).json({ message: "Can not access to the database" });
                console.log("Can not access to the database", error);
              }
            } );
          }
       
          

        });
      } else {
        res.status(404).json({ message: "No payment id method found" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

server.listen({ port: process.env.PORT || 80 }, () => {
  console.log(`🚀 API Server instance ready`);
});
