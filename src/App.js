import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage'
import TVShows from "./components/TVShows"
import MovieDetails from './components/MovieDetails'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/tv-shows" element={<TVShows />} />
                <Route path="/details/:movieId" element={<MovieDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
