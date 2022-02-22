import "./App.css";
import { Navbar } from './components';
import { Header, About, Experience, Projects, Contacts } from './containers';

function App() {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <About />
      <Experience />
      <Projects />
      <Contacts />
    </div>
  );
}

export default App;
