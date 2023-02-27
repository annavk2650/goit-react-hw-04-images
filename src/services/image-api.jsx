function fetchImages(findValue, pageNumber) {
  const KEY = '33168603-ec2cdd614dfa5cc2d19959754';
  const URL = 'https://pixabay.com/api/';

  return fetch(
    `${URL}?q=${findValue}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Oh no... We cant find ${findValue}`));
    })
    .then(res => {
      return res.hits;
    });
}
const api = { fetchImages };

export default api;
