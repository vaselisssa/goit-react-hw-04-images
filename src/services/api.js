import axios from 'axios';

const KEY = '38915840-62f3bbb09c35f3e37ff6ed2c8';

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};

export default fetchImages;
