const { Octokit } = require("octokit");
require('dotenv').config();
const core = require('@actions/core');
const fs = require('fs');
const github = require('@actions/github');

// const token = process.env.MY_TOKEN;
const octokit = new Octokit({
    auth: process.env.MY_TOKEN,
});
function getFile(){
    console.log("grabbing json file");
    try {
        fs.readFile(core.getInput('users'), (err, data) =>{
            if(err) throw err;
            const userDat = JSON.parse(data);
            console.log(userDat);
        })
        console.log('json object from prev job: ', userDat);
    }catch(e){
        core.setFailed(e.message);
    }

    return userDat;
}


//prolly grab only the necessary shit from here
async function createRepo(userDat){
    try{
       let res = await octokit.graphql({
            query: `mutation{
                createRepository(input:{name: "${userDat.userlog}", visibility: public}){
                    repository{
                        url
                        id
                    }
                }
            }`
        })
        console.log(res.repository);
    }catch(e){
        console.log(e);
    }

    console.log("repo created");
}
function driver(){
    let data = getFile(); 
    createRepo(data);
}
driver();

