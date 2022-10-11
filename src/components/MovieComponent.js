import React, { useEffect, useState } from "react";
import { convertToRoman } from "../utils/algos";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: flex-start;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  padding: 10px;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
  cursor: pointer;
`;

const MovieComponent = (props) => {
    const [movieInfo, setMovieInfo] = useState();

    //console.log(movieInfo);
    useEffect(() => {
        setMovieInfo(props.movie);
    }, [movieInfo]);

    const episodeRoman = convertToRoman(movieInfo?.episode_id);

    return (
        <Container
        onClick={() => {
            props.onMovieSelect(movieInfo);
          }}>
            {movieInfo ? (
                <>
                    <div>
                        <MovieInfo>
                            <span>Episode {movieInfo?.episode_id}</span>
                        </MovieInfo>
                        <MovieInfo>
                            <span>Episode-{episodeRoman} {movieInfo?.title}</span>
                        </MovieInfo>
                        <MovieInfo>
                            <span>{movieInfo?.release_date}</span>
                        </MovieInfo>
                    </div>
                </>
            ) : (
                "Loading..."
            )}
        </Container>
    );
};
export default MovieComponent;