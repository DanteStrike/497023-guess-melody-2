import axios from "axios";
import {Time} from "../utils/time/time";

const configureAPI = () => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/guess-melody`,
    timeout: 5 * Time.MILLISECONDS_IN_SECOND,
    // withCredentials: true
  });

  return api;
};

export default configureAPI;
