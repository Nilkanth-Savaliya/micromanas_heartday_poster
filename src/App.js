import Home from "./pages/home/Home";
import { Routes,Route,} from 'react-router-dom'
import SelectDoctor from "./pages/selectDoctor/SelectDoctor";
import RegisterMr from "./pages/RegisterMr/RegisterMr";

function App() {
  return (
    <>
      <div className="mainDiv" >
        <div className="mainSubDiv">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<SelectDoctor />} />
          {/* <Route path="/registerMr" element={<RegisterMr />} /> */}
        </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
