import { useState, useEffect } from "react";
import { Container, Alert, Dropdown, Row, Col } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import MyFooter from "./MyFooter";
import MovieList from "./MovieList";
import CommentArea from "./CommentArea";

const Home = () => {
  const [gallery1, setGallery1] = useState([]);
  const [gallery2, setGallery2] = useState([]);
  const [gallery3, setGallery3] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const OMDB_URL = "http://www.omdbapi.com/?apikey=24ad60e9";

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    Promise.all([
      fetch(OMDB_URL + "&s=harry%20potter")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === "True") {
            setGallery1(responseObject.Search);
          } else {
            setError(true);
          }
        }),
      fetch(OMDB_URL + "&s=avengers")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === "True") {
            setGallery2(responseObject.Search);
          } else {
            setError(true);
          }
        }),
      fetch(OMDB_URL + "&s=star%20wars")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === "True") {
            setGallery3(responseObject.Search);
          } else {
            setError(true);
          }
        }),
    ])
      .then(() => setLoading(false))
      .catch((err) => {
        setError(true);
        console.log("An error has occurred:", err);
      });
  };

  const showSearchResult = async (searchString) => {
    setSearchString(searchString);
  };

  return (
    <div>
      <MyNavbar showSearchResult={showSearchResult} />
      <Container fluid className="px-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <h2 className="mb-4">TV Shows</h2>
            <div className="ml-4 mt-1">
              <Dropdown>
                <Dropdown.Toggle
                  style={{ backgroundColor: "#221f1f" }}
                  id="dropdownMenuButton"
                  className="btn-secondary btn-sm dropdown-toggle rounded-0"
                >
                  Genres
                </Dropdown.Toggle>
                <Dropdown.Menu bg="dark">
                  <Dropdown.Item href="#/action-1">Comedy</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Thriller</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div>
            <i className="fa fa-th-large icons"></i>
            <i className="fa fa-th icons"></i>
          </div>
        </div>
        <Row>
          <Col md={8}>
            {error && (
              <Alert variant="danger" className="text-center">
                An error has occurred, please try again!
              </Alert>
            )}
            {searchString.length > 0 && (
              <MovieList
                title="Search results"
                searchString={searchString}
                changeSelectedMovie={(movieId) => setSelectedMovie(movieId)}
              />
            )}
            {!error && !searchString > 0 && (
              <>
                <MovieList
                  title="Harry Potter"
                  loading={loading}
                  movies={gallery1.slice(0, 6)}
                  changeSelectedMovie={(movieId) => setSelectedMovie(movieId)}
                />
                <MovieList
                  title="The Avengers"
                  loading={loading}
                  movies={gallery2.slice(0, 6)}
                  changeSelectedMovie={(movieId) => setSelectedMovie(movieId)}
                />
                <MovieList
                  title="Star Wars"
                  loading={loading}
                  movies={gallery3.slice(0, 6)}
                  changeSelectedMovie={(movieId) => setSelectedMovie(movieId)}
                />
              </>
            )}
          </Col>
          <Col md={4} className="text-light">
            <CommentArea movieId={selectedMovie} />
          </Col>
        </Row>
        <MyFooter />
      </Container>
    </div>
  );
};

export default Home;
