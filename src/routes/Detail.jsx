import { useParams } from "react-router-dom";

const Detail = ({ loading, movies }) => {
  const { id } = useParams();
  const movie = movies.filter((item) => {
    return item.id === Number(id);
  })[0];
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <img src={movie.large_cover_image} alt={`${movie.title}'s poster`} />
          <h2>
            {movie.title} {`(${movie.year})`}
          </h2>
          <p>{movie.summary}</p>
          <ul>
            {movie.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Detail;
