const express = require("express");
require("./mongConnection");
const allroutes = require("./routes/allroutes");

const app = express();
const PORT = 3000;

app.use('/', allroutes);

app.listen(PORT, function(err) {
    if(err) {
        console.log(err);
        return false;
    }
    console.log(`Server started and available at http://localhost:${PORT}`);
});