const ws = await connect()
const data = null

init()

async function connect() {
  console.log("Connecting...")
  const ws = new WebSocket("ws://localhost:1234/ws")

  ws.onmessage = (_message) => {
    const message = JSON.parse(_message.data)

    switch (message.type) {
      case "init":
        console.log("Initializing")
        //setUUID(message.id)
        break
      //TODO: define message types
      default:
        console.log("Unknown message type")
    }
  }

  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (ws.readyState === 1) {
        console.log("Connected!")
        clearInterval(timer)
        resolve(ws)
      }
    })
  })
}

function setUUID(uuid) {
  let elem = document.querySelector("#ws-id")
  elem.classList.remove("hidden")
  elem.innerHTML = uuid
}

function init() {
  let button = document.querySelector("#button")
  let id = document.querySelector("#live-id").value
  button.addEventListener("click", () => {
    ws.send(JSON.stringify({ target: id, message: "hello", type: "info" }))
  })
}
