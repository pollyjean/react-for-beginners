import Movie from '../components/Movie';

const Home = ({ loading, movies }) => {
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <ul>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                coverImg={movie.medium_cover_image}
                coverImg2x={movie.large_cover_image}
                title={movie.title}
                summary={movie.summary}
                year={movie.year}
                genres={movie.genres}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
