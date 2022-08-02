const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware whatever that is
app.use(cors());
app.use(express.json());
//
// ROUTES

//create a todo THIS IS AN EXAMPLE FOR YALL TO GET STARTED
app.post("/OrderDML", async (reque, respon) => {
	try {
		// console.log(reque.body);
		const { deliveryStatus, orderDate, quantity, coid, cid } = reque.body;
		const newTodo = await pool.query(
			`INSERT INTO "OCR"."Order" (deliveryStatus, orderDate, quantity, coid, cid) VALUES($1, $2, $3, $4, $5)`,
			[deliveryStatus, orderDate, quantity, coid, cid]
		);
		respon.json({
			message: "New Order created",
			body: {
				order: { deliveryStatus, orderDate, quantity, coid, cid }
			}
		});
	} catch (err) {
		respon.json(err);
		console.error(err.message);
	}
});

//get all Orders
app.get("/OrderDML", async (reque, respon) => {
	try {
		const allOrders = await pool.query(`SELECT * FROM "OCR"."Order";`);
		respon.json(allOrders.rows);
	} catch (err) {
		respon.json(err);
		console.error(err.message);
	}
});

//get an Order by id
app.get("/OrderDML/:id", async (reque, respon) => {
	try {
		const { id } = reque.params;
		const Order = await pool.query(
			`SELECT * FROM "OCR"."Order" WHERE oid = $1`,
			[id]
		);
		respon.json(Order.rows[0]);
	} catch (err) {
		respon.json(err);
		console.error(err.message);
	}
});

//update an Order
app.put("/OrderDML/:id", async (reque, respon) => {
	try {
		const id = parseInt(req.params.id);
		const { deliveryStatus, orderDate, quantity, coid, cid } = reque.body;

		const updateTodo = await pool.query(
			`UPDATE "OCR"."Order" SET deliveryStatus = $1, orderDate = $2, quantity = $3, coid = $4, cid = $5 WHERE oid = $6`,
			[ deliveryStatus, orderDate, quantity, coid, cid, id]
		);
		respon.json("Order was updated");
	} catch (err) {
		respon.json(err);
		console.error(err.message);
	}
});

//delete an Order
app.delete("/OrderDML/:id", async (reque, respon) => {
	try {
		const { id } = reque.params;
		const deleteTodo = await pool.query(`DELETE FROM "OCR"."Order" WHERE oid = $1`, [
			id,
		]);
		respon.json("todo was deleted");
	} catch (err) {
		respon.json(err);
		console.error(err.message);
	}
});

app.listen(3001, () => {
	console.log("server has started on port 3001");
});
