const { execFile } = require('child_process')


/**
 * toch file.sh
 * 
 * chmod +x file.sh
 */

// in execFile there is alsd error come out maxBuffer length 

execFile("./file.sh", (error, stdout, stderr) => {
  if (error) {
    console.log(`error : ${error.message}`)
    return
  }

  if (stderr) {
    console.log(`stderr : ${stderr.message}`)
    return
  }

  console.log(`stdout : ${stdout}`);
})