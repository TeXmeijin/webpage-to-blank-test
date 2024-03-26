import { CountButton } from "~features/count-button"

import "~style.css"

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      <CountButton />
    </div>
  )
}

export default IndexPopup

// const resp = await sendToBackground({
//   name: "ping",
//   body: {
//     id: 123
//   }
// })
//
// console.log(resp)
