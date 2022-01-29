const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs")
app.use(express.static("public"));

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'teendok'
})


app.get("/", function(req, res) {
    const q = "SELECT * FROM feladatok";
    pool.query(q, function(error,results){
        if (!error){
            res.render("todo", {
                lista: results
            })
        }
    })
});

app.post("/", function(req, res) {
    const q = "INSERT INTO feladatok (feladat) VALUES (?)";
    pool.query(q,[req.body.ujElem],
        function(error, results){
            if(!error){
                res.redirect("/");
            }
        })
        
});
app.post("/delete", function(req, res) {
    const q = "DELETE FROM feladatok WHERE id=?";
    pool.query(q,[req.body.id],
        function(error, results){
            if(!error){
                res.redirect("/");
            }
        })
        
});

app.listen(3000, function() {
    console.log("Server elindítva a 3000-es porton...");
});

