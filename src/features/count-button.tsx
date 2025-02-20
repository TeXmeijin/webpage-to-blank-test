import { useReducer } from "react"

export const CountButton = () => {
  const [count, increase] = useReducer((c) => c + 1, 0)

  const onClick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    const response = await chrome.tabs.sendMessage(tab.id, {
      type: "CREATE_TEST"
    })
    // do something with response here, not outside the function
    console.log(response)
    increase()
  }

  return (
    <button
      onClick={() => onClick()}
      type="button"
      className="plasmo-flex plasmo-flex-row plasmo-items-center plasmo-px-4 plasmo-py-2 plasmo-text-sm plasmo-rounded-lg plasmo-transition-all plasmo-border-none
      plasmo-shadow-lg hover:plasmo-shadow-md
      active:plasmo-scale-105 plasmo-bg-slate-50 hover:plasmo-bg-slate-100 plasmo-text-slate-800 hover:plasmo-text-slate-900">
      <span className="plasmo-inline-flex plasmo-items-center plasmo-justify-center plasmo-w-24 plasmo-h-4 plasmo-ml-2 plasmo-text-xs plasmo-font-semibold plasmo-rounded-full">
        {count === 0 ? "テストを生成する" : "テストを生成しました"}
      </span>
    </button>
  )
}
