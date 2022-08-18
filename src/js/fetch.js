
export const Fetch = (value, page) => { 
  return   fetch(`https://pixabay.com/api/?key=28460134-7b12f16a69bff4fc5524ed994&q=${value}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (response.ok) { return response.json(); }

          else {
            return Promise.reject(new Error(`There are no images for this query:  ${value} `),);
          }
        })
};
