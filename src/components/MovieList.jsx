import { useState, useEffect } from "react";
import { Row, Spinner } from "react-bootstrap";
import SingleMovie from "./SingleMovie";

const MovieList = (props) => {
  const OMDB_URL = "http://www.omdbapi.com/?apikey=24ad60e9";

  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(false);

  const fetchSearchResult = async () => {
    try {
      const response = await fetch(OMDB_URL + "&s=" + props.searchString);
      if (response.ok) {
        const data = await response.json();
        if (data.Response === "True") {
          setSearchResult(data.Search);
          setError(false);
        } else {
          setError(true);
        }
      } else {
        setError(true);
        console.log("an error occurred");
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.searchString) {
      fetchSearchResult();
    }
  }, []);

  useEffect(() => {
    if (props.searchString === "") {
      setError(false);
      setSearchResult([]);
    } else {
      fetchSearchResult();
    }
  }, [props.searchString]);

  return (
    <>
      <h4>{props.title}</h4>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 text-center">
        {props.loading
          ? [...Array(6).keys()].map((movie) => (
              <div className="spinner-container" key={movie}>
                <Spinner animation="border" variant="light" />
              </div>
            ))
          : props.movies &&
            props.movies.map((movie) => (
              <SingleMovie
                data={movie}
                key={movie.imdbID}
                changeSelectedMovie={(movieId) =>
                  props.changeSelectedMovie(movieId)
                }
              />
            ))}
        {searchResult.map((movie) => (
          <SingleMovie
            data={movie}
            key={movie.imdbID}
            changeSelectedMovie={(movieId) =>
              props.changeSelectedMovie(movieId)
            }
          />
        ))}
      </Row>
    </>
  );
};

export default MovieList;
