import * as flickrActionTypes from '@memory_game_action_types/flickrActionTypes';
import FlickSearchApi from '@memory_game_api/FlickSearchApi';

export default function reducer(state = {
  photos: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type)
  {
    case flickrActionTypes.FETCH_KITTEN_PHOTOS + "_PENDING": {
      return {...state, fetching: true};
    }
    case flickrActionTypes.FETCH_KITTEN_PHOTOS + "_REJECTED": {
      return {...state, fetching: false, error: action.payload};
    }
    case flickrActionTypes.FETCH_KITTEN_PHOTOS + "_FULFILLED": {
      var compiledPhotos = [];
      var retrievedPhotos = action.payload.photos.photo;
      for (let photo of retrievedPhotos)
      {
        compiledPhotos.push(FlickSearchApi.fetchPhotoUrl(photo));
      }

      return {
        ...state,
        fetching: false,
        fetched: true,
        photos: compiledPhotos
      }
    }
  }

  return state;
}
