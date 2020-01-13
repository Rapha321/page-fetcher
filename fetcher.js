const url = process.argv[2];

// console.log(myArgv)

const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const filePath = './index.html';
const stats = fs.statSync(filePath);
const size = stats.size;

request(`${url}${filePath}`, (error, response, body) => {



  fs.writeFile(filePath, body, (err) => {

    // console.log("response: ", response.statusCode)
    // if (response.statusCode !== 200) {
    //   console.log('Invalid URL');
    //   process.exit();
    // }

    if (fs.existsSync(filePath)) {
      console.log(`${filePath} already exist.`)
      rl.question("Would you like to overwrite the file? If Yes press Y and hit Enter. \n", function(answer) {
        if (answer === "Y") {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.
          console.log(`Downloaded and saved ${size} bytes to ./index.html`);
          rl.close();
        }
        if (answer !== "Y") {
          rl.close();
        }
      });
    }

  })
})