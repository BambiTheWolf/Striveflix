import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {

    const [movieDetails, setMovieDetails] = useState(null)
    const [comments, setComments] = useState([])

    const { movieId } = useParams()

    const getMovieDetails = async () => {
        try {
            let response = await fetch('https://www.omdbapi.com/?apikey=24ad60e9&i=' + movieId)
            if(response.ok) {
                let data = await response.json()
                setMovieDetails(data)
            } else {
                alert('We got an error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getMovieComments = async () => {
        try {
            let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + movieId,
                {
                    headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThkMzg2YTVmMzRhZDAwMTUzOWYxOWEiLCJpYXQiOjE2MzcwOTk1MjAsImV4cCI6MTYzODMwOTEyMH0.HpX1SiL-O7Tt6CkHENFSGQbtHVRMPKWwiWnEIoMYTSI",
                    }
                })
            if(response.ok) {
                let data = await response.json()
                setComments(data)
            } else {
                alert('We got an error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovieDetails()
        getMovieComments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="text-light text-center mt-4">
            {
                movieDetails && (
                    <>
                        <h2>{movieDetails.Title}</h2>
                        <img src={movieDetails.Poster} alt="movie poster" />
                        <ul style={{listStyleType: 'none'}}>
                            {
                                comments.map(c => (
                                    <li className="my-3" key={c._id}>
                                        {c.comment}
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                )
            }
        </div>
    )
}

export default MovieDetails