import * as flickrActionTypes from '@memory_game_action_types/flickrActionTypes';
import FlickSearchApi from '@memory_game_api/FlickSearchApi';

export function fetchKittenPhotos()
{
  return {
    type: flickrActionTypes.FETCH_KITTEN_PHOTOS,
    payload: FlickSearchApi.getKittenPhotos()
  }
}
