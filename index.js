const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware whatever that is
app.use(cors());
app.use(express.json());
//
// ROUTES

// updateName: newProduct.name,
//     updateDescription: newProduct.description,
//     updateColor: newProduct.color,
//     updateCategory: newProduct.category,
//     updateSupplierID: newProduct.supplierID,
//     updateCost: newProduct.cost,
//     updateSize: newProduct.size,
//     updateQuantity: newProduct.quantity
app.post("/ProductDML", async (req, res) => {
    try {
	const {name, description, cost, color, catid, sid, quantity, url, size} = req.body;
	const response = await pool.query(
	    `INSERT INTO "OCR"."Product"  ("name", "description", "cost", "color", "catid", "sid", "quantity", "url", "size") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
	    [name, description, cost, color, catid, sid, quantity, url, size]
	);
	res.json({
	    message: "A new Product was created",
	    body: {
		product: {name, description, cost, color, catid, sid, quantity, url, size},
	    },
	});
    } catch (err) {
	res.json(err);
	console.error(err.message);
    }
});

app.get("/ProductDML", async (reque, respon) => {
	try {
		const allProducts = await pool.query(`SELECT * FROM "OCR"."Product";`);
		respon.json(allProducts.rows);
	} catch (err) {
		respon.json(err);
		console.error(err.message);		
	}
});


//Update Category by id
app.put("/ProductDML/:id", async (req, res) => {
	try {
	  const id = parseInt(req.params.id);
	  const { name, description, cost, color, catid, sid, quantity, url, size} = req.body;
	
	  const response = await pool.query(
		`UPDATE "OCR"."Product" SET name = $1, description = $2, cost = $3, color = $4, catid = $5, sid = $6, quantity = $7, url = $8, size = $9 WHERE pid = $10 `,
		[name, description, cost, color, catid, sid, quantity, url, size, id]
	  );
	  res.json("Category was Updated");
	} catch (err) {
	  res.json(err);
	  console.error(err.message);
	}
  });


//delete  a Category
app.delete("/ProductDML/:id", async (reque, respon) => {
	try {
		const { id } = reque.params;
		const deleteProduct = await pool.query(`DELETE FROM "OCR"."Product" WHERE pid = $1`, [
			id,
		]);
		respon.json("Product was deleted");
	} catch (err) {
		respon.json(err);
        console.error(err.message);
	};

});

app.post("/CategoryDML", async (req, res) => {
    try {
	const { category_name} = req.body;
	const response = await pool.query(
	    `INSERT INTO "OCR"."Category"  (category_name) VALUES ($1)`,
	    [category_name]
	);
	res.json({
	    message: "A new Category was created",
	    body: {
		Category: { name },
	    },
	});
    } catch (err) {
	res.json(err);
	console.error(err.message);
    }
});


//get all Categorys
app.get("/CategoryDML", async (reque, respon) => {
	try {
		const allCategorys = await pool.query(`SELECT * FROM "OCR"."Category";`);
		respon.json(allCategorys.rows);
	} catch (err) {
		respon.json(err);
		console.error(err.message);		
	}
});

//get a Category by id
app.get("/CategoryDML/:id", async (reque, respon) => {
	try {
		const { id } = reque.params;
		const Category = await pool.query(
			`SELECT * FROM "OCR"."Category" WHERE coid = $1`,
			[id]
		);
		respon.json(Category.rows[0]);
	} catch (err) {
		respon.json(err);
		console.error(err.message);
	}
});

//Update Category by id
app.put("/CategoryDML/:id", async (req, res) => {
	try {
	  const id = parseInt(req.params.id);
	  const { category_name } = req.body;
	  const response = await pool.query(
		`UPDATE "OCR"."Category" SET category_name = $1 WHERE catid = $2`,
		[ category_name, id]
	  );
	  res.json("Category was Updated");
	} catch (err) {
	  res.json(err);
	  console.error(err.message);
	}
  });


//delete  a Category
app.delete("/CategoryDML/:id", async (reque, respon) => {
	try {
		const { id } = reque.params;
		const deleteCategory = await pool.query(`DELETE FROM "OCR"."Category" WHERE catid = $1`, [
			id,
		]);
		respon.json("Category was  deleted");
	} catch (err) {
		respon.json(err);
        console.error(err.message);
	};

});


app.use('/check_login', (req, res) => {
	const values = [req.body.email, req.body.password]
	var cid_result = pool.query(`SELECT cid from "OCR"."Customer" where "email" = $1 and "password" = $2 `, values);
	cid_result.then(function(result){
		if(result.rows.length > 0){
			res.json({"valid_login": true, "cid": result.rows[0]["cid"]});
		}
		else{
			res.json({"valid_login": false});
		}
	})
  });
//create a todo THIS IS AN EXAMPLE FOR YALL TO GET STARTED
app.post("/todos", async (reque, respon) => {
	try {
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


app.post("/product/submit_clothing", (req, res, next) => {
	 const values = [
	 				req.body.Description, 
					req.body.Cost,
					req.body.Color,
					req.body.Category, 
					req.body.SupplierID, 
					req.body.Name]
		
	//product_pk constraint defined by this code
	//ALTER TABLE "OCR"."Product" ADD CONSTRAINT "product_pk" UNIQUE ("name", "description", "color");
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
		//product_sizing_pk constraint defined by this sql code
		//ALTER TABLE "OCR"."Product_Sizing" ADD CONSTRAINT "product_sizing_pk" UNIQUE ("pid", "size");
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

  app.get("/get_clothes", async(req, res, next)=>{

	pool.query(`select * from "OCR"."Product"`,
	   (q_err, q_res) => {
	  if (q_err) return next(q_err);
	  res.send(q_res.rows);
		});
  });

app.post("/category/submit_category", (req, res, next) => {
	const values = [
					req.body.Category]
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
