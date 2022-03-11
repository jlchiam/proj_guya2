const express = require("express");
const cors = require("cors");
const { router } = require("./routers");
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use(router);

app.listen(process.env.PORT || 3000, (errors) => {
    if (errors) {
      console.log(errors);
    } else {
      console.log("Server started on port 3000");
    }
    
  });
