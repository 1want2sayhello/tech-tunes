import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SideBorder from "./components/SideBorder/SideBorder";
import Router from "./Router";
import ErrorBoundary from "./components/UI/Error/ErrorBoundary/ErrorBoundary";
import Footer from "./components/Footer/Footer";

import "./sass/main.scss";

function App() {
  const location = useLocation();
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <ErrorBoundary key={location.pathname}>
          <Router />
        </ErrorBoundary>
      </main>
      <Footer />
      <SideBorder />
    </div>
  );
}

export default App;
