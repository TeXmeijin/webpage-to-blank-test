import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://docs.plasmo.com/*"]
}

chrome.runtime.onMessage.addListener(function (
  request: { type: "CREATE_TEST" },
  sender,
  sendResponse
) {
  if (request.type === "CREATE_TEST") {
    concealRandomWords()
    sendResponse({ message: "Test created" })
  }
})

function concealRandomWords() {
  const textElements = document.querySelectorAll("p, span")
  const allWords: { element: Element; word: string; index: number }[] = []

  textElements.forEach((element) => {
    const words = element
      .textContent!.split(/\s+/)
      .filter((word) => word.length > 0)
    words.forEach((word, index) => {
      allWords.push({ element, word, index })
    })
  })

  // ランダムに10個の単語を選択（ただし重複しないように）
  const selectedWords = selectRandomElements(allWords, 30)

  selectedWords.forEach(({ element, word, index }) => {
    const newHtml = element
      .textContent!.split(/\s+/)
      .map((currentWord, currentIndex) => {
        if (currentIndex === index) {
          return `<span onclick="this.outerHTML='${word}'" style="cursor: pointer; color: red; font-weight: bold; display: inline-block; background-color: white; border-radius: 5px; padding: 5px; margin: 0 2px;">See Answer</span>`
        } else {
          return currentWord
        }
      })
      .join(" ")

    element.innerHTML = newHtml
  })
}

function selectRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = array.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
