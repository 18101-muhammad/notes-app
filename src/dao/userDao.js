const fs = require('fs')

const fileName = './src/db/users.json';

var userDao = {
    getAll: getAll,
    add:add,
    update:update,
    remove:remove,
    getByEmail: getByEmail,
    getById: getById
    
}

function getAll() {
    return new Promise(async(resolve, reject) => {
        const fileContents = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        resolve(fileContents);
    });
}


function getByEmail(email) {
    return new Promise(async(resolve, reject) => {
        const fileContents = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        console.log("flecon"+  JSON.stringify(fileContents));
        let user = fileContents.filter(u=>{return u.email == email});
        if(user.length <= 0){
            user = undefined;
        }else{
            user = user[0]
        }
        console.log("user"+  JSON.stringify(user));
        resolve(user);
    });
}

function getById(id) {
    return new Promise(async(resolve, reject) => {
        const fileContents = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        let user = fileContents.filter(u=>{return u._id == id});
        if(user.length <= 0){
            user = undefined;
        }else{
            user= user[0]
        }
        resolve(user);
    });
}

function add(user) {
    return new Promise((resolve, reject) => {
        let fileContents = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        fileContents.push(user);

        fs.writeFileSync(fileName, JSON.stringify(fileContents));
        resolve(user);
    })
}

function update(user) {
    return new Promise((resolve, reject) => {
        const fileContents = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        for(let i = 0 ; i < fileContents.length ;i++){
            if(fileContents[i]._id == user._id){
                fileContents[i] = user;
                break;
            }
        }

        fs.writeFileSync(fileName, JSON.stringify(fileContents));
        resolve(user);
        
    })
}

function remove(userId) {
    return new Promise((resolve, reject) => {
        const fileContents = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        let found = -1;
        for(let i = 0 ; i < fileContents.length -1;i++){
            if(fileContents[i]._id == userId){
                found = i;
                break;
            }
        }
        fileContents.splice(found, 1);
        fs.writeFileSync(fileName, JSON.stringify(fileContents));
        resolve(true);
        
    })
}


module.exports = userDao;

