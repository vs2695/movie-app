import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const MovieInfoComponent = (props) => {
  return (
    <MovieContainer>
      {props.selectedMovie ? <div>
        <div>{props.selectedMovie.title}</div>
        <p>{props.selectedMovie.opening_crawl}</p>
        <span>Directed by: {props.selectedMovie.director}</span>
      </div> : <div>"No movie selected"</div>}
    </MovieContainer>
  );
};
export default MovieInfoComponent;