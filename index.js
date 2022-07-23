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
app.listen(3001, () => {
	console.log("server has started on port 3001");
});
