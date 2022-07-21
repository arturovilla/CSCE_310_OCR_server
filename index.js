const express = require("express");
const cors = require("cors");
const app = express();

//middleware whatever that is
app.use(cors());
app.use(express.json());
//
app.listen(3000, () => {
	console.log("server has started on port 3000");
});
