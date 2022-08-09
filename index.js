const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//Server index.js file

//middleware whatever that is
app.use(cors());
app.use(express.json());
//
// ROUTES


//create a todo THIS IS AN EXAMPLE FOR YALL TO GET STARTED
app.post("/OrderDML", async (reque, respon) => {
	try {
		// console.log(reque.body);
		const { orderid,deliveryStatus, orderDate, quantity, coid, cid } = reque.body;
		console.log(reque.body)
		const newTodo = await pool.query(
			`INSERT INTO "OCR"."Orders" (deliveryStatus, order_date, quantity, coid, cid,orderid) VALUES($1, $2, $3, $4, $5, $6)`,
			[deliveryStatus, orderDate, quantity, coid, cid, orderid]
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

//get all orders
app.get("/OrderDML", async (reque, respon) => {
	try {
		const allOrders = await pool.query(`SELECT * FROM "OCR"."Orders";`);
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
			`UPDATE "OCR"."Orders" SET deliveryStatus = $1, order_date = $2, quantity = $3, coid = $4, cid = $5 WHERE orderid = $6`,
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
		const deleteTodo = await pool.query(`DELETE FROM "OCR"."Orders" WHERE orderid = $1`, [
			id,
		]);
		respon.json("todo was deleted");
	} catch (err) {
		respon.json(err);
		console.error(err.message);
	}
});


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

//
//
//
//
//
//
//
//
//
// Aaron Chan
//Propduct and catagory Entity
//courier stuff


app.post("/ProductDML", async (req, res) => {
	try {
		const { name, description, cost, color, catid, sid, quantity, url, size } =
			req.body;
		const response = await pool.query(
			`INSERT INTO "OCR"."Product"  ("name", "description", "cost", "color", "catid", "sid", "quantity", "url", "size") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
			[name, description, cost, color, catid, sid, quantity, url, size]
		);
		res.json({
			message: "A new Product was created",
			body: {
				product: {
					name,
					description,
					cost,
					color,
					catid,
					sid,
					quantity,
					url,
					size,
				},
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
		const { name, description, cost, color, catid, sid, quantity, url, size } =
			req.body;

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
		const deleteProduct = await pool.query(
			`DELETE FROM "OCR"."Product" WHERE pid = $1`,
			[id]
		);
		respon.json("Product was deleted");

	} catch (err) {
		respon.json(err);
		console.error(err.message);
	}
});


app.post("/CategoryDML", async (req, res) => {

	try {
		const { category_name } = req.body;
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
			[category_name, id]
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
		const deleteCategory = await pool.query(
			`DELETE FROM "OCR"."Category" WHERE catid = $1`,
			[id]
		);
		respon.json("Category was  deleted");
	} catch (err) {
		respon.json(err);
		console.error(err.message);
	}
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











//
//
//
//
//
//
//
//
//
// Ram 
//Courier Entity
//courier stuff
//Update Courier by id
app.put("/CourierDML/:id", async (req, res) => {
	try {
	  const id = parseInt(req.params.id);
	  const { name, address, phone } = req.body;
  
	  const response = await pool.query(
		`UPDATE "OCR"."Courier" SET name = $1, address = $2, phone = $3 WHERE coid = $4`,
		[ name, address, phone, id ]
	  );
	  console.log(response);
	  res.json("Courier was Updated");
	} catch (err) {
	  res.json(err);
	  console.error(err.message);
	}
});


//delete  a Courier
app.delete("/CourierDML/:id", async (reque, respon) => {
	try {
		const { id } = reque.params;
		const deleteCourier = await pool.query(`DELETE FROM "OCR"."Courier" WHERE coid = $1`, [
			id,
		]);
		respon.json("Courier was  deleted");
	} catch (err) {
		respon.json(err);
        console.error(err.message);
	};

});

// post a new one couriuers
app.post("/CourierDML", async (req, res) => {
    try {
	const { name, address, phone } = req.body;
	const response = await pool.query(
	    `INSERT INTO "OCR"."Courier"  (name, address, phone) VALUES ($1, $2, $3)`,
	    [name, address, phone]
	);
	res.json({
	    message: "A new Courier was created",
	    body: {
		courier: { name, address, phone },
	    },
	});
    } catch (err) {
	res.json(err);
	console.error(err.message);
    }
});

//get all couriers
app.get("/CourierDML", async (reque, respon) => {
	try {
		const allCouriers = await pool.query(`SELECT * FROM "OCR"."Courier";`);
		respon.json(allCouriers.rows);

	} catch (err) {
		respon.json(err);
		console.error(err.message);		
	}
});

//get a Courier by id
app.get("/CourierDML/:id", async (reque, respon) => {
	try {
		const { id } = reque.params;
		const Courier = await pool.query(
			`SELECT * FROM "OCR"."Courier" WHERE coid = $1`,
			[id]
		);
		respon.json(Courier.rows[0]);
	} catch (err) {
		respon.json(err);
		console.error(err.message);
	}
});


//
//
//
//
//
//
//
//
//
// Arturo Villalobos
// date: August 5 2021
// consumer Consumer Entity
//get all customers
app.get("/customer", async (req, res) => {
	try {
		const allCustomers = await pool.query(`SELECT * FROM "OCR"."Customer"`);
		res.json(allCustomers.rows);
	} catch (err) {
		console.error(err.message);
	}
});
//
//get a customer by id
app.get("/customer/:cid", async (req, res) => {
	try {
		const { cid } = req.params;
		const customer = await pool.query(
			`SELECT * FROM "OCR"."Customer" WHERE cid = $1`,
			[cid]
		);
		res.json(customer.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});





//update a customer
app.put("/customer/:cid", async (req, res) => {
	try {
		const { cid } = req.params;
		const {name, phone, password, zip_code, address, payment_type, payment_info, email, admin } = req.body;

		const updateCustomer = await pool.query(
			`UPDATE "OCR"."Customer" SET name = $1, phone = $2, password = $3, zip_code = $4, address = $5, payment_type = $6, payment_info = $7, email = $8, admin = $9 WHERE cid = $10`,
			[name, phone, password, zip_code, address, payment_type, payment_info, email, admin, cid]
		);
		res.json("customer was updated");
		console.log(cid)
	} catch (err) {
		console.error(err.message);
	}
});


//create a customer
app.post("/customer", async (req, res) => {
	try {
		const {name, phone, password, zip_code, address, payment_type, email} = req.body;
		var admin = "false";
		var payment_info = "NULL";
		const response = await pool.query(
			`INSERT INTO "OCR"."Customer"  ("name", "phone", "password", "zip_code", "address", "payment_type", "payment_info", "email", "admin") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
			[name, phone, password, zip_code, address, payment_type, payment_info, email, admin]
		);
		res.json({message: "A new Product was created",body: {product: {name, phone, password, zip_code, address, payment_type, payment_info, email, admin,},},});
	} catch (err) {
		res.json(err);
		console.error(err.message);
	}
});
//
// delete  a customer
app.delete("/customer/:cid", async (req, res) => {
	try {
		const { cid } = req.params;
		const deleteCustomer = await pool.query(`DELETE FROM "OCR"."Customer" WHERE cid = $1`, [cid]);
		res.json("customer was deleted");
	} catch (err) {
		respon.json(err);
		console.error(err.message);
	}
});

//
//
//
//
//
//
//
//
//
//
// Server start
app.listen(3001, () => {
	console.log("server has started on port 3001");
});