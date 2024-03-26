import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  res.send({
    message: "test dayo message"
  })
}

export default handler
