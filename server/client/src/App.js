//import { useQuery, gql } from '@apollo/client'
import { Container, Navbar, Nav, Row, Image } from "react-bootstrap";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Reviews from "./components/Reviews";
import Contactme from "./components/Contactme";
import imgLogo from "./components/images/thelogo.png";

function App() {
  const history = createBrowserHistory();
  const changeActiveLink = (e) => {                             // "e" as event
    e.preventDefault();

    let allNavLinks = document.querySelectorAll(".iLinks");     // Bright the nav link if is the active one
    for (let specificNode of allNavLinks) {                     //
      specificNode == e.target                                  //
        ? specificNode.classList.add("active")                  //
        : specificNode.classList.remove("active");              //
      const targetLink = e.target.href.split("/");              //
      history.push("/" + targetLink[targetLink.length - 1]);    //
    }                                                           // Scale the NaLinks if is the active one
    for (let specificNode of allNavLinks) {                     //
      if (specificNode.classList.contains("active"))            //
        specificNode.style.transform = "scale(2,2)";            //
      else specificNode.style.transform = "scale(1,1)";         //
    }
  };
  return (
    <>
      <header>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand style={{ cursor: "pointer" }} href="/">
              <Image
                className="m1"
                src={imgLogo}
                fluid
                style={{ maxHeight: "9vh", filter: "invert(1)" }}
              />
            </Navbar.Brand>
            <Nav className="d-flex justify-content-around w-100">
              <Nav.Link
                className="iLinks"
                onClick={changeActiveLink}
                active={true}
                href="/"
              >
                Scentifolia
              </Nav.Link>
              <Nav.Link
                className="iLinks"
                onClick={changeActiveLink}
                active={false}
                href="/blog"
              >
                Blog
              </Nav.Link>
              <Nav.Link
                className="iLinks"
                onClick={changeActiveLink}
                active={false}
                href="/reviews"
              >
                Reviews
              </Nav.Link>
              <Nav.Link
                className="iLinks"
                onClick={changeActiveLink}
                active={false}
                href="/contactme"
              >
                Contact
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <section className="container mt-5 mb-5 ">
        <Row>
          <article className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9">
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/blog" component={Blog} />
                <Route path="/reviews" component={Reviews} />
                <Route path="/contactme" component={Contactme} />
              </Switch>
            </Router>
          </article>
          <aside className="bg-light col-12 col-sm-12 col-md-12 col-lg-4 col-xl-3">
            <h3 className="text-center">Scentifolia</h3>
            <p>
              un blog sobre el quinto sentido y el arte en su honor: La
              perfumeria. Siganme para compartir con ustedes pequeñas
              impreciones sobre fragmentos embotellados de olor.
            </p>
          </aside>
        </Row>
      </section>
      <footer className="fixed-bottom h-10 bg-info text-light">
        <Nav.Link target="_blank" href="http://portafoliodigital.epizy.com/">
          Web Master Site
        </Nav.Link>
      </footer>
    </>
  );
}

export default App;
