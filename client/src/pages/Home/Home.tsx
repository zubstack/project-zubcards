import Button from "../../ui/Button/Button";
import "./Home.scss";

function Home() {
  return (<div id="home" className="home">
  <h1>Welcome to Zubcards!</h1>
  <p className="home__p">Here you wil find a amazing way to carry out study boring stuff. This project is fully inspired by Anki. <a href="https://docs.ankiweb.net/getting-started.html">Here to check it out</a></p>
  <Button>
    Create your first deck
  </Button>
  </div>
  );
}

export default Home;
