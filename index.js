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

// app.get("/product_input", async (reque, respon) => {
	
// });

app.post("/product/submit_clothing", (req, res, next) => {
	 const values = [
	 				req.body.Description, 
					req.body.Cost,
					req.body.Color,
					req.body.Category, 
					req.body.SupplierID, 
					req.body.Name]
	
	
	 pool.query(`INSERT INTO "OCR"."Product"
	 			( "description", "cost", "color", "catid", "sid", "name")
	 			VALUES($1, $2, $3, $4, $5, $6)
				ON CONFLICT ON CONSTRAINT "product_pk"
				DO 
				NOTHING
				`,
	  values, (q_err, q_res) => {
	  if (q_err) return next(q_err);
	  res.json(q_res.rows);
	});
	var pid_result = pool.query(`select pid from "OCR"."Product" where "description" = '${req.body.Description}' and "name" = '${req.body.Name}'`);
	pid_result.then(function(result) {
		var pid = result.rows[0]["pid"];
		const product_sizing_values = [
			pid,
			req.body.Size, 
			req.body.Quantity
		]
		pool.query(`INSERT INTO "OCR"."Product_Sizing"
		("pid", "size", "quantity")
		VALUES
		($1, $2, $3)
		ON CONFLICT ON CONSTRAINT "product_sizing_pk"
		DO 
		UPDATE SET "quantity" = "OCR"."Product_Sizing"."quantity" + $3;`,
		product_sizing_values
	 )
	});
  });

  app.get("/get_clothes", async(req, res)=>{

	pool.query(`select * from "OCR"."Product`,
	  values, (q_err, q_res) => {
	  if (q_err) return next(q_err);
	  res.json(q_res.rows);
		});
  });

app.post("/category/submit_category", (req, res, next) => {
	console.log(req.body);
	const values = [
					req.body.Category]
	console.log(values);
	pool.query(`INSERT INTO "OCR"."Category"
				("category_name")
				VALUES($1)`,
		values, (q_err, q_res) => {
		if (q_err) return next(q_err);
		res.json(q_res.rows);
	});
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
