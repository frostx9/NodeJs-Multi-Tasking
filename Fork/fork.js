const express = require("express")
const app = express()
const { fork } = require('child_process')


const port = process.env.PORT || 5000

app.use(express.json())


function longComputaion() {
  let sum = 0
  for (let i = 0; i < 1e9; i++) {
    sum += i
  }
  return sum
}

function longComputaionPromise() {
  return new Promise((resolve, reject) => {
    let sum = 0
    for (let i = 0; i < 1e9; i++) {
      sum += i
    }
    resolve(sum)
  })
}


//   <------------------ All Route Start From Here ------------------>

app.get("/one", (req, res) => {
  const sum = longComputaion()
  res.send(`Sum : ${sum}`)
})

app.get("/two", async (req, res) => {
  const sum = await longComputaionPromise()
  res.send(`Sum : ${sum}`)
})

app.get("/three", (req, res) => {
  const child = fork("./longtask.js")  // Pathe the file 

  child.send("start")  // Start Child Process 

  child.on("message", (sum) => {
    res.send({ sum: sum })
  })
})




//   <------------------ All Route End Here ------------------>
//Server Listen Port
app.listen(port, () => {
  console.log(`Server is runnin at ${port}`)
})


