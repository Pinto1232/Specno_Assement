import "./App.css";
import Jumbotron from "./components/hero/Jumbotron";
import TopNav from "./components/navbar/TopNav";
import TopNavbar from "./components/navbar/TopNavbar";

function App() {
  return (
    <div>
  
     <TopNav />
      <TopNavbar />
      <Jumbotron
        title="Validate, Design & Build World-Class "
        subtitle="Digital Products"
        buttonText="Learn More"
        buttonLink="#"
      />
    </div>
  );
}




export default App;
