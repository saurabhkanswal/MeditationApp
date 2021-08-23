import database from '@react-native-firebase/database';
import {
  SET_FEMALE_MUSIC_LIST,
  SET_MALE_MUSIC_LIST,
  SET_MALE_MUSIC_LIST_LOADING,
  SET_FEMALE_MUSIC_LIST_LOADING,
  SET_MEDITATE_MUSIC_LIST,
} from './action.types';

export const getMusicList = data => async dispatch => {
  const {courseId, voiceId} = data;

  if (voiceId === 0) {
    database()
      .ref(`/songs/${courseId}/${voiceId}/`)
      .once('value')
      .then(snapshot => {
        dispatch({
          type: SET_MALE_MUSIC_LIST,
          payload: snapshot.val(),
        });
      })
      .then(() => {
        dispatch({
          type: SET_MALE_MUSIC_LIST_LOADING,
          payload: false,
        });
      });
  } else if (voiceId === 1) {
    database()
      .ref(`/songs/${courseId}/${voiceId}/`)
      .once('value')
      .then(snapshot => {
        dispatch({
          type: SET_FEMALE_MUSIC_LIST,
          payload: snapshot.val(),
        });
      })
      .then(() => {
        dispatch({
          type: SET_FEMALE_MUSIC_LIST_LOADING,
          payload: false,
        });
      });
  }
};

export const getMeditateMusicList = data => async dispatch => {
  try {
    database()
      .ref(`/songList/`)
      .once('value')
      .then(snapshot => {
        dispatch({
          type: SET_MEDITATE_MUSIC_LIST,
          payload: snapshot.val(),
        });
      });
  } catch (error) {
    console.error(error);
  }
};
