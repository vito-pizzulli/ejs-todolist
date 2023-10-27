import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let toDoList = [];
let id = 0;
let editShow = false;

app.get("/", (req, res) => {
    res.render("index.ejs", {toDoList: toDoList, editShow: editShow});
})

app.post("/submit", (req, res) => {
    const toDo = req.body;
    toDo.id = id++;
    toDoList.push(toDo);
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const itemToDelete = req.body.itemToDelete;
    toDoList = toDoList.filter(item => item.id !== Number(itemToDelete));
    editShow = false;
    res.redirect('/');
});

app.post('/edit', (req, res) => {
    const itemToEdit = Number(req.body.itemToEdit);
    const findItem = toDoList.find(item => item.id === itemToEdit);
    const nameToEdit = findItem.name;
    const descriptionToEdit = findItem.description;
    editShow = true;
    res.render("index.ejs", {toDoList: toDoList, editShow: editShow, itemToEdit: itemToEdit, nameToEdit: nameToEdit, descriptionToEdit: descriptionToEdit});
});

app.post('/put', (req, res) => {
    const editedItem = Number(req.body.editedItem);
    const editedName = req.body.name;
    const editedDescription = req.body.description;
    const itemToEdit = toDoList.find(item => item.id === editedItem);

    if (itemToEdit) {
        if (editedName) {
            itemToEdit.name = editedName;
        }
        if (editedDescription) {
            itemToEdit.description = editedDescription;
        }
    }
    editShow = false;
    res.redirect('/');
});

app.post('/cancel-edit', (req, res) => {
    editShow = false;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})