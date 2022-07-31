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


//get all Couriers
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

//
//
//
app.listen(3001, () => {
	console.log("server has started on port 3001");
});