const { exec } = require('child_process')


//stderr - Standard Error = > It means command its execuated, but there is problem in terminal
//                            Error Come After Command Execuated


//stdout - Standard Output. It Give us human readable Byte Format in file system

// There is a problem with exec that all standard output taken into buffer and then print out. For Hugh standard ouput it will show error

// exec alwys shell open first, then run command
// spanw run comand first the opne shell

exec("ls -lh", (error, stdout, stderr) => {
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


// exec("ls -lh", {1024 * 1024 * 4}, (error, stdout, stderr)   = > Mnaully Increase Buffer Length to 4 mb. By default 1 mb

// Command - copy, mkdir, start, type