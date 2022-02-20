import "./App.css";
import About from "./components/About/About";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Experience from "./components/Experience/Experience";

function App() {
  return (
    <div className="bg-dark">
      <div class="container">
          <Header />
          <Main />
          <About />
          <Experience />
      </div>
    </div>
  );
}

export default App;
