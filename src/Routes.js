import React from "react";
import { Route, Routes } from "react-router-dom";
import PathFindingAlgorithms from "./pages/PathFindingAlgorithms";
import SortingAlgorithms from "./pages/SortingAlgorithms";
import PhysicsSimulations from "./pages/PhysicsSimulations";
import Welcome from "./pages/Welcome";

const routes = () => {
  return (
    <Routes>
      <Route path='/path-finding-algorithms' element={<PathFindingAlgorithms/>} />
      <Route path='/sorting-algorithms' element={<SortingAlgorithms/>} />
      <Route path='/physics-simulations' element={<PhysicsSimulations/>} />
      <Route path='/' element={<Welcome/>} />
    </Routes>
  );
};

export default routes;
