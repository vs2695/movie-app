import axios from "axios";
export const axiosRequest = axios.create({
  baseUrl: "https://swapi.dev/api/films/?format=json"
});


export const apiCall = () => {
  axiosRequest.get('https://swapi.dev/api/films')
  .then(res => res)
  .catch(err => console.log(err));
}