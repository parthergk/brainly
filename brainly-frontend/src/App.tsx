import {Button} from "../components/ui/Button"
import {Plush} from "../components/icons/Plush"

function App () {
  return (
    <div>
      <h1>Hello</h1>
      <div><Button type="secondary" size="md" startIcon={<Plush size="md"/>} text="Click me" onclick={()=>console.log("button clicked")} /></div>
    </div>
  )
}

export default App
