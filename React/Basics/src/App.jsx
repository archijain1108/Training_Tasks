import Cards from './Cards'
import About from "./About";
import Home from './Home'
import Counter from "./Counter";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  


  return (
    <div>
      <Counter /> 
      <Cards />

      <BrowserRouter>

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          
        </Routes>
        
      </BrowserRouter>
    </div>
  );
};

export default App;
