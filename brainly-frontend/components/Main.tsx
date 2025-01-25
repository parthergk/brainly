import { useRef } from "react"
import Input from "./ui/Input"
const Main = () => {
  const usernameRef = useRef<any>();

  return (
    <div className=" bg-sky-600 w-full h-full">Main
    <div>
      <Input refrence={usernameRef}/>
    </div>
    </div>
  )
}

export default Main