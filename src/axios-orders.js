import axios from 'axios';

const instance=axios.create({
  baseURL:'https://react-my-app-9b8fa.firebaseio.com/'
});

export default instance;
