import axios from "axios";

export default axios.create({
  //это временное для отладки baseURL: 'https://infinite-forest-56486.herokuapp.com',
  baseURL: 'http://localhost:3000',
  // responseType: "json"
});