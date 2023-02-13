const express = require("express")
const cluster = require("cluster")
const os = require("os")

// Cluster Is Round Robin Approacch
// 1 -2 - 3 - 4 ....and son on

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())


const numCpu = os.cpus().length


//   <------------------ All Route Start From Here ------------------>

app.get("/demo", (req, res) => {

  for (let i = 0; i < 1e9; i++) {

  }
  res.send(`ok... ${process.pid}`) // To know which worker is working
  cluster.worker.kill() // To kill the worker
})


/*
To Check if the process is Master process or not
then it fork a new worker process, then it will listen to the worker process

*/

if (cluster.isMaster) {

  for (let i = 0; i < numCpu; i++) {   // To Create New Worker Process as many cpu core have
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Woker ${worker.process.pid} died`);
    cluster.fork() // if any worker died any reasons mistakely....create and create and worker instance
  })

} else {
  app.listen(port, () => {
    console.log(`Server ${process.pid} is runnin at ${port}`)
  })
}




//   <------------------ All Route End Here ------------------>
//Server Listen Port


