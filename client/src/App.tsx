import "./App.css";
import Common from "./Common";
import axios from "axios";

function App() {
  
  axios.defaults.withCredentials = true;
  return (
    <div className="flex justify-start items-center w-full space-x-5 overflow-x-scroll overflow-y-hidden p-5">
      <Common text={"Incomplete"} color={"red"} />
      <Common text={"To Do"} color={"blue"} />
      <Common text={"Doing"} color={"yellow"} />
      <Common text={"Under Review"} color={"red"} />
      <Common text={"Completed"} color={"red"} />
      <Common text={"Completed"} color={"red"} />
      <Common text={"Completed"} color={"red"} />
      <Common text={"Completed"} color={"red"} />
    </div>
  );
}

export default App;
