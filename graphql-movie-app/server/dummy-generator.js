const Directors = require("./models/Director");
const Movies = require("./models/Movie");
const fs = require("fs");
const connectDatabase = require('./helpers/db');

const dotenv = require("dotenv");

const path = "./dummy/";

const directors = JSON.parse(fs.readFileSync(path + "directors.json" ));
const movies = JSON.parse(fs.readFileSync(path + "movies.json" ));

dotenv.config({
    path : "./config/env/config.env"
});

connectDatabase();

const importAllData = async function(){
    try {
        await Directors.create(directors);
        await Movies.create(movies);
        console.log("Import Process Successful");
    }   
    catch(err) {
        console.log(err);
        console.err("There is a problem with import process");
    }
    finally {
        process.exit();
    }
};

const deleteAllData = async function(){
    try {
        await Directors.deleteMany();
        await Movies.deleteMany();
        console.log("Delete Process Successful");
    }   
    catch(err) {
        console.log(err);
        console.err("There is a problem with delete process");
    }
    finally {
        process.exit();
    }
};

if (process.argv[2] == "--import"){
    importAllData();
}
else if (process.argv[2] == "--delete"){
    deleteAllData();
}
