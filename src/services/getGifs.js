const apiKey = 'JfVuI5vVmaEyQw2VOGbfNdEzxvJqVm5S'

export default function getGifs ({ keyword = 'panda' } = {}) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=25&offset=0&rating=g&lang=en`
  return fetch(url)
    .then(resp => resp.json())
    .then(response => {
      const { data } = response
      const gifs = data.map(gif => {
        const { images, title, id } = gif
        const { url } = images.downsized_medium
        return { title, id, url }
      })
      return gifs
    })
}
