import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateContents, MainContainer, NavBar } from "./components";

const App = () => {
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-purple-50">
        <NavBar />

        <main className="w-full mt-24 p-8">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContents />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
