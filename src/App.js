import React from "react";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Routes from './Routes'
import PathFindingAlgorithms from "./pages/PathFindingAlgorithms";

function App() {
  return (
    <>
    <Header/>
      <PathFindingAlgorithms/>
        {/* <Footer/> */}
    </>
  );
}

export default App;
