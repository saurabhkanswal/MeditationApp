import {
  SET_MALE_MUSIC_LIST,
  SET_FEMALE_MUSIC_LIST,
  RESET_FEMALE_MUSIC_LIST,
  RESET_MALE_MUSIC_LIST,
  SET_MALE_MUSIC_LIST_LOADING,
  SET_FEMALE_MUSIC_LIST_LOADING,
  SET_MEDITATE_MUSIC_LIST,
  SET_ACTIVE_SONG_ID,
  SET_ACTIVE_SONG_DATA,
  RESET_ACTIVE_SONG_ID,
} from '../action/action.types';

const initialState = {
  maleMusicList: null,
  femaleMusicList: null,
  maleMusicListLoading: true,
  femaleMusicListLoading: true,
  meditateSongList: [],
  activeSongId: null,
  activeSongData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MALE_MUSIC_LIST:
      return {
        ...state,
        maleMusicList: action.payload,
      };
    case SET_FEMALE_MUSIC_LIST:
      return {
        ...state,
        femaleMusicList: action.payload,
      };
    case RESET_FEMALE_MUSIC_LIST:
      return {
        ...state,
        femaleMusicList: null,
      };
    case RESET_MALE_MUSIC_LIST:
      return {
        ...state,
        maleMusicList: null,
      };
    case SET_MALE_MUSIC_LIST_LOADING:
      return {
        ...state,
        maleMusicListLoading: action.payload,
      };
    case SET_FEMALE_MUSIC_LIST_LOADING:
      return {
        ...state,
        femaleMusicListLoading: action.payload,
      };
    case SET_MEDITATE_MUSIC_LIST:
      return {
        ...state,
        meditateSongList: action.payload,
      };
    case SET_ACTIVE_SONG_ID:
      return {
        ...state,
        activeSongId: action.payload,
      };
    case SET_ACTIVE_SONG_DATA:
      return {
        ...state,
        activeSongData: action.payload,
      };
    case RESET_ACTIVE_SONG_ID:
      return {
        ...state,
        activeSongId: null,
      };
    default:
      return state;
  }
};
