import NavBar from "./component/NavBar/NavBar";
import { ThemContextProvider } from "./Context/ThemContext";



function App() {
  return (
    <div className="App">
      <ThemContextProvider>
        <NavBar/>
      </ThemContextProvider>
    </div>
  );
}

export default App;
