import express from "express";
import cors from "cors";
import mongoose, {Schema} from "mongoose";
import ejs from "ejs";
// ['x', '', '0', 'x', 'x', 'x', '', '0', '0']
let db = mongoose.connect(
  "mongodb+srv://user:user@cluster0.nelnz2q.mongodb.net/?retryWrites=true&w=majority"
);
// ejs

let schema = new Schema({
    state: Array
})

let xo = mongoose.model('xo', schema)

let app = express();
app.use(cors())
app.set('view engine', 'ejs')

app.get("/", function (req, res) {
    res.render('index.ejs')
})


app.get("/update/:list", async function (req, res) {
    let list = req.params.list;
    console.log(list)
    list = JSON.parse(list)
    xo.insertMany({
      state: list,
    });
  res.send({data: 'ok'});
});

app.get("/get-update", async function (req, res) {
  let result = await xo.find({});
  res.send({ data: result[result.length-1] });
});


app.listen(5600);