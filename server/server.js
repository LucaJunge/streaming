import ConnectionHandler from "./src/ConnectionHandler.js"
import express from "express"
import crypto from "crypto"
import WebSocket, { WebSocketServer } from "ws"
import ejs from "ejs"

const expressPort = 3000
const wsPort = 1234
const app = express()
const wss = new WebSocketServer({ port: wsPort })
const connectionHandler = new ConnectionHandler()
const clients = new Map()

app.set("view engine", "ejs")
app.use("/css", express.static("css"))
app.use("/js", express.static("js"))

// CONTROL INTERFACE
app.get("/", (req, res) => {
  res.render("index", { title: "🎛️🕹️ CONTROL" })
})

// LIVE VIEW
app.get("/live", (req, res) => {
  res.render("live", { title: "🎙️🔴 LIVE", isDebug: false })
})

wss.on("connection", (ws) => {
  const id = crypto.randomUUID()
  const type = "init"
  const name = "client-" + id
  const metadata = { id, name, type }
  clients.set(ws, metadata)
  console.log(`Client ${id} connected.`)
  ws.send(JSON.stringify(metadata))

  ws.on("message", (_message) => {
    const message = JSON.parse(_message)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(_message)
      }
    })

    switch (message.type) {
      case "info":
        break
    }
    console.log(message)
    /*clients.keys().forEach((client) => {
      console.log(`Sending to ${client.metadata.name}`)
      client.send(JSON.stringify(message))
    })*/
  })

  ws.on("close", (code, reason) => {
    console.log(`Client disconnected with status ${code}`)
  })
})

app.listen(expressPort, () => {
  console.log(`We're live at http://localhost:${expressPort}`)
})
