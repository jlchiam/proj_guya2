const express = require("express");
const cors = require("cors");
const { router } = require("./routers");
const app = express();

var http = require('http').Server(app);

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/api/database/status',function(req,res) {
	console.log('API CALL: /api/database/status');
	var retvalSettingValue = "?";
	mysql_pool.getConnection(function(err, connection) {
		if (err) {
			connection.release();
	  		console.log(' Error getting mysql_pool connection: ' + err);
	  		throw err;
	  	}
	    connection.query('SELECT SettingValue FROM your_database_table WHERE SettingKey =\'DatabaseStatus\'', function(err2, rows, fields) {	
	    	if (err2) {
				var data = { "Time":"", "DatabaseStatus":"" };
				data["Time"] = (new Date()).getTime();
				data["DatabaseStatus"] = "Down";
				res.json(data); 
			} else {
				var dbretval = rows[0].SettingValue;
				if (dbretval == 1 ) {
					var data = { "Time":"", "DatabaseStatus":"" };
					data["Time"] = (new Date()).getTime();
					data["DatabaseStatus"] = "Up";
					res.json(data); 
				} else {
					var data = { "Time":"", "DatabaseStatus":"" };
					data["Time"] = (new Date()).getTime();
					data["DatabaseStatus"] = "Down";
					res.json(data); 
				}
			}
			console.log(' mysql_pool.release()');
			connection.release();
	    });
	});
});


app.use(router);

app.listen(process.env.PORT || 3000, (errors) => {
    if (errors) {
      console.log(errors);
    } else {
      console.log("Server started on port 3000");
    }
    
  });
