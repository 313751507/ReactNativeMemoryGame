import flickrConfig from '@memory_game_config/flickrConfig'

var API_KEY = flickrConfig.API_KEY;
var API_URL = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1';
var PARAMS = `&api_key=${API_KEY}&per_page=`;
var REQUEST_URL = API_URL + PARAMS;

var api = {
  getPhotos(tag, pageSize = 15)
  {
    tag = tag.toLowerCase().trim();
  	var method = (tag && tag != '') ? 'flickr.photos.search' : 'flickr.photos.getRecent';
    var url = `${REQUEST_URL}${pageSize}&tags=${tag}&method=${method}`;
    console.log(url);
    return fetch(url).then((res) => res.json());
  },
  getKittenPhotos()
  {
    return this.getPhotos('kitten', 4);
  },
  fetchPhotoUrl(photoData)
  {
    if (photoData)
    {
      var uri = `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`;
      return uri;
    }
    return null;
  }
};

export default api;
