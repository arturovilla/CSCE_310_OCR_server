const Pool = require("pg").Pool;

const pool = new Pool({
  user: 'xgpvbekjjzcxad',
  host: 'ec2-18-214-35-70.compute-1.amazonaws.com',
  database: 'dfc4huahpc3nln',
  password: '49771384d5e50747a7d2f36b33b3c2087697e3f8895db087a1fe83812e70d28c',
  port: 5432,
  ssl: {
		rejectUnauthorized: false,
	}
});
module.exports = pool;
