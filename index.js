const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware whatever that is
app.use(cors());
app.use(express.json());
//
// ROUTES

//supplier
app.post("/SupplierDML", async (req, res, next) => {
	try {
		const {name, address, zipcode, country, phonenum, website} = req.body;
		const response = await pool.query(`INSERT INTO "OCR"."Supplier" (name, address, zipcode, country, phonenum, website)
		VALUES ($1, $2, $3, $4, $5, $6)`, [name, address, zipcode, country, phonenum, website]);
		res.json({
			message: "a new supplier was created",
			body: {
				supplier: {name, address, zipcode, country, phonenum, website},
			},
		});
	} catch (err) {
		res.json(err);
		console.error(err.message);
	}
});

//get all suppliers
app.get("/SupplierDML", async (req, res) => {
	try {
		const allSuppliers = await pool.query(`SELECT * FROM "OCR"."Supplier";`);
		res.json(allSuppliers.rows);
	} catch (err) {
		res.json(err);
		console.error(err.message);
	}
});

//get a supplier by id
app.get("/SupplierDML/:id", async (req, res) => {
	try {
		const {id} = req.params;
		const Supplier = await pool.query(`SELECT * FROM "OCR"."Supplier" WHERE sid = $1`, [id]);
		res.json(Supplier.rows[0]);
	} catch (err) {
		res.json(err);
		console.error(err.message);
	}
});

//update a supplier by id
app.put("/SupplierDML/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const {name, address, zipcode, country, phonenum, website} = req.body;
		const response = await pool.query(`UPDATE "OCR"."Supplier" SET name = $1, address = $2, zipcode = $3, country = $4, phonenum = $5, website = $6 WHERE sid = $7`, [name, address, zipcode, country, phonenum, website, id]);
		console.log(response);
		res.json("supplier has been updated");
	} catch (err) {
		res.json(err);
		console.error(err.message);
	}
});

//delete a supplier
app.delete("SupplierDML/:id", async (req, res) => {
	try {
		const {id} = req.params;
		const deleteCourier = await pool.query(`DELETE FROM "OCR"."Supplier" WHERE sid = $1`, [id]);
		res.json("supplier has been deleted");
	} catch (err) {
		res.json(err);
		console.error(err.message);
	}
});

/*
//create a todo THIS IS AN EXAMPLE FOR YALL TO GET STARTED
app.post("/todos", async (reque, respon) => {
	try {
		// console.log(reque.body);
		const { description } = reque.body;
		const newTodo = await pool.query(
			"INSERT INTO todo (description) VALUES($1) RETURNING *",
			[description]
		);
		respon.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});
//get all todos
app.get("/todos", async (reque, respon) => {
	try {
		const allTodos = await pool.query("SELECT * FROM todo;");
		respon.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});
//get a todo
app.get("/todos/:id", async (reque, respon) => {
	try {
		const { id } = reque.params;
		const todo = await pool.query(
			"SELECT description FROM todo WHERE todo_id = $1",
			[id]
		);
		respon.json(todo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

//update a todo
app.put("/todos/:id", async (reque, respon) => {
	try {
		const { id } = reque.params;
		const { description } = reque.body;

		const updateTodo = await pool.query(
			"UPDATE todo SET description = $1 WHERE todo_id = $2",
			[description, id]
		);
		respon.json("todo was updated");
	} catch (err) {
		console.error(err.message);
	}
});
//delete  a todo
app.delete("/todos/:id", async (reque, respon) => {
	try {
		const { id } = reque.params;
		const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
			id,
		]);
		respon.json("todo was deleted");
	} catch (err) {
		console.error(err.message);
	}
});
// END EXAMPLE
//
//
//
*/
app.listen(3001, () => {
	console.log("server has started on port 3001");
});