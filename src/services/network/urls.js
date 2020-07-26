const getBaseUrl = () => {
  
  return 'http://www.omdbapi.com/'
};

export const getUrl = (type) => {
  const baseUrl = getBaseUrl();
  const api_key = process.env.REACT_APP_API_KEY_MOVIE;
  switch (type) {
    //Common
    
    case 'GET_LIST':
      return `${baseUrl}?apikey=${api_key}&type=movie&s=bad`;
    default:
      return `${baseUrl}`;
  }
};
