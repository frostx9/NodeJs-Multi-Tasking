const { spawn } = require('child_process')

const child = spawn("find", ['/']) // For Linux / Ubuntu

// const child = spawn("dir",['/'] {shell: true})   // For Windowns 
// .on - to listen

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data.toString()}`);
})

child.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
})

child.on("error", (error) => {
  console.log(`error: ${error.message}`);
})

child.on("exit", (code, signal) => {
  if (code) console.log(`Process exit with code: ${code}`);
  if (signal) console.log(`Process Killed with signal: ${signal}`);
  console.log("Done");
})


// in spanw method it wont use buffer as exec / execFile
//It use stream in terminal