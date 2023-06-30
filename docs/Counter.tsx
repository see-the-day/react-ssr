import {useState} from "react"

export default function Counter () {
  const [count, setCount] = useState(0)
  return (<div>
    <p>{count}1</p>
    <button onClick={() => setCount((count) => count+1)}>点击+1</button>
  </div>)
}