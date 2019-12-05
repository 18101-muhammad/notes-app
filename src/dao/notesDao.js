const fs = require('fs')

const fileName = './src/db/notes.json';
var notesDao = {
    getAll: getAll,
    add:add,
    update:update,
    remove:remove,
    getById: getById
    
}

function getAll(user) {
    return new Promise(async(resolve, reject) => {
        const fileContents = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        let notes = fileContents.filter(u=>{return u.user == user});
        resolve(notes);
    });
}

function getById(id) {
    return new Promise(async(resolve, reject) => {
        const fileContents = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        let notes = fileContents.filter(u=>{return u._id == id});
        if(notes.length <= 0){
            notes = undefined;
        }else{
            notes= notes[0]
        }
        resolve(notes);
    });
}

function add(note) {
    return new Promise((resolve, reject) => {
        let fileContents = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        fileContents.push(note);

        fs.writeFileSync(fileName, JSON.stringify(fileContents));
        resolve(note);
    })
}

function update(id, note) {
    return new Promise((resolve, reject) => {
        const fileContents = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        for(let i = 0 ; i < fileContents.length ;i++){
            if(fileContents[i]._id == id){
                fileContents[i].title = note.title;
                fileContents[i].description = note.description;
                break;
            }
        }

        fs.writeFileSync(fileName, JSON.stringify(fileContents));
        resolve(note);
        
    })
}

function remove(noteId) {
    return new Promise((resolve, reject) => {
        const fileContents = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        let found = -1;
        for(let i = 0 ; i < fileContents.length ;i++){
            if(fileContents[i]._id == noteId){
                found = i;
                break;
            }
        }
        fileContents.splice(found, 1);
        fs.writeFileSync(fileName, JSON.stringify(fileContents));
        resolve(true);
        
    })
}


module.exports = notesDao;

