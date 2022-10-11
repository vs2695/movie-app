import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { axiosRequest } from "./utils/api"
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SortButton = styled.button`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const searchMovie = (keyword) => {

    if (keyword !== '') {
      let results = movieList.filter((movie) => {
        return movie.title.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      console.log(results);
      updateMovieList(results);
      // this is not working
      console.log(movieList);
      // } else {
      //   updateMovieList(movieList);
      //   If the text field is empty, show all movies
    }
    updateSearchQuery(keyword);
  };

  const apiCall = () => {
    axiosRequest.get('https://swapi.dev/api/films')
    .then(res => updateMovieList(res.data.results))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    apiCall();
  }, []);

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => searchMovie(e.target.value), 1000);
    updateTimeoutId(timeout);
  };

  const sortByDate = (movieList) => {
    const movieWithDate = movieList.map(movie => {
      return { ...movie, date: new Date(movie.release_date) };
    });

    console.log(movieWithDate);

    movieWithDate.sort(
      (objA, objB) => Number(objA.date) - Number(objB.date),
    );

    //updateMovieList(movieWithDate);
  }

  return (
    <Container>
      <Header>
        <AppName>
          <SortButton onClick={sortByDate(movieList)}>Sort</SortButton>
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <MovieContainer>
        <MovieListContainer>
          {movieList?.length ? (
            movieList.map((movie) => (
              <MovieComponent
                key={movie}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          ) : (
            <Placeholder src="logo.svg" />
          )}
        </MovieListContainer>
        {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
      </MovieContainer>
    </Container>
  );
}

export default App;