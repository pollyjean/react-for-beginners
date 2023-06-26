import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Movie = ({ coverImg, coverImg2x, title, summary, year, genres, id }) => {
  return (
    <li>
      <picture>
        <source srcSet={coverImg} media="(max-width:720px)" />
        <img src={coverImg2x} alt={`${title}'s poster`} />
      </picture>
      <h2>
        <Link to={`${process.env.PUBLIC_URL}/movie/${id}`}>
          {title} {`(${year})`}
        </Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </li>
  );
};

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string,
  coverImg2x: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
