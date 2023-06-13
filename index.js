// import 'dotenv/config'
import { Octokit, App } from "octokit"

const octokit = new Octokit({ 
    // Use when running locally
    //auth: process.env.TOKEN,

    // Use when running on the repo
    auth: process.argv[2]
});

// Get number of users
const numUsers = await octokit.graphql({query: `query MyQuery {
    organization(login: "ImmortalHedgehogs") {
        membersWithRole(first: 1) {
            totalCount
        }
    }
  }`,
  headers: {
  'X-GitHub-Api-Version': '2022-11-28',
  }
})

// Get list of users
const userData = await octokit.graphql({query: `query MyQuery {
    organization(login: "ImmortalHedgehogs") {
        membersWithRole(first: ${numUsers.organization.membersWithRole.totalCount}) {
            nodes {
                login
            }
        }
    }
  }`,
  headers: {
  'X-GitHub-Api-Version': '2022-11-28',
  }
})

// Populate text file

import fs from 'fs';
import path from 'path';
import { createWriteStream } from 'fs';
import { format } from 'util';

const logFile = path.join('.', 'output.json');
const logStream = createWriteStream(logFile, { flags: 'w' });

// Redirect console.log to the logStream
console.log = function (message) {
  logStream.write(format(message) + '\n');
};

// Usage
console.log(userData.organization.membersWithRole.nodes);
