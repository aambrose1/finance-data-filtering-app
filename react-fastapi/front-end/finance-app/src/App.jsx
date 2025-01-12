/* eslint-disable react/no-unknown-property */
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <div class="font-sans whitespace-pre-wrap">
      <h1 class="text-4xl">Apple Inc.</h1>
      <p class = "italic">AAPL (United States: NASDAQ) </p>
      <p>Annual Income Statements</p>
      <span class="p-2 h-18 w-30 inline-block align-middle flex space-x-5 items-center justify-center">
        <button type="button" class="border-2 rounded-full hover:bg-slate-200"> 2020 </button>
        <button type="button" class="border-2 rounded-full hover:bg-slate-200"> 2021 </button>
        <button type="button" class="border-2 rounded-full hover:bg-slate-200"> 2022 </button>
        <button type="button" class="border-2 rounded-full hover:bg-slate-200"> 2023 </button>
        <button type="button" class="border-2 rounded-full hover:bg-slate-200"> 2024 </button>
      </span>
      </div>
    </>
  )
}

export default App
