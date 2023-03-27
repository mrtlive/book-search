import { useState } from "react";
import Header from "./components/Header";
import Books from "./components/Books";
import "./App.css";

import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-full h-full">
      <Header />
      <Books />
      <Footer />
    </div>
  );
}

export default App;
