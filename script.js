const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'))

const uri = 'mongodb+srv://seeker:blackwolf99157@cluster0.5ncyljk.mongodb.net/Collection0';

async function connect () {
    try {
        await mongoose.connect(uri);
        console.log('connected');
    } catch (error) {
        console.log(error);
    }
}

connect();

const notesSchema = {
    title: String,
    content: String
}

const Note = mongoose.model('Note', notesSchema)

app.post(('/join-us'), (req, res)=> {
    let newNote = new Note({
        title: req.body.name,
        content: req.body.address,
    });
    newNote.save()
    console.log(newNote);
    res.redirect('/pages/join-us.html');
})

app.listen(8080, ()=> {
    console.log('server started on 8080');
})