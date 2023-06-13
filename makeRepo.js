const { Octokit } = require("octokit");
require('dotenv').config();


// const token = process.env.MY_TOKEN;
const octokit = new Octokit({
    auth: process.env.MY_TOKEN,
});
// function getFile(){
//     console.log("grabbing json file");
//     try {
//         fs.readFile(core.getInput('users'), (err, data) =>{
//             if(err) throw err;
//             const userDat = JSON.parse(data);
//             console.log(userDat);
//         })
//         console.log('json object from prev job: ', userDat);
//     }catch(e){
//         core.setFailed(e.message);
//     }

//     return userDat;
// }


//prolly grab only the necessary shit from here
async function createRepo(){
    let userlogin = process.argv;
    console.log(userlogin);
    try{
       let res = await octokit.graphql({
            query: `mutation{
                createRepository(input:{name: "${userlogin}", visibility: public}){
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

