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
const cors = require("cors"); //TODO JG implementar cors
const getAllMethods = require("./controllers/getAllMethods");
const getMethodDetail = require("./controllers/getDetailsMethod");
const deleteMethod = require("./controllers/deleteMethod");
const exportCsv = require("./controllers/createCSV");
//TODO JG configure
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

//TODO JG modify to filter by type an return all payment methods with refactor to use try/catch

server.get("/payment_methods", getAllMethods );

//TODO JG implement endpoint to find a single payment method
server.get("/payment_methods/details/:id", getMethodDetail );

//TODO JG implement endpoint to delete a single payment method
server.delete("/payment_methods/delete/:id", deleteMethod);

//TODO JG implement endpoint to export all payment methods in CSV format
server.get("/payment_methods/export", exportCsv);

server.listen({ port: process.env.PORT || 80 }, () => {
  console.log(`🚀 API Server instance ready`);
});
