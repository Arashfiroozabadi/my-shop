import axios, { AxiosResponse } from 'axios';

const url: string = 'http://www.omdbapi.com/?apikey=55031f4d';

interface PropTypes {
  query: string;
  type?: 'movie' | 'series' | 'episode';
  y?: number;
  page?: number;
}

interface ResTypes {
  Search: [];
  totalResults: number;
}

function SearchApi({
  query, type, y, page = 1,
}: PropTypes): Promise<AxiosResponse<ResTypes>> {
  return axios.get(`
${url}&s=${query}
${type ? `&type=${type}` : ''}
${y ? `&y=${y}` : ''}
${page ? `&page=${page}` : `&page= ${page}`}
  `);
}
export default SearchApi;
