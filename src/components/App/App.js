import Routing from "../../pages";
import {BrowserRouter} from "react-router-dom";
import {CurrentUserProvider} from "@/hoc/CurrentUserProvider";

function App() {
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <Routing/>
      </CurrentUserProvider>
    </BrowserRouter>
  );
}

export default App;
