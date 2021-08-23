import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {IS_AUTHENTICATED, IS_NEW_USER} from './action.types';

export const signUpUser = data => async dispatch => {
  const {email, name, password} = data;
  console.log('=>>>>>>>>>>>>>>>>>>>', email);
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      console.log('User Created Successfully');
      console.log('USER SIGNUP DATA: ', data);
      dispatch({
        type: IS_NEW_USER,
        payload: data.additionalUserInfo.isNewUser,
      });
      database()
        .ref('/users/' + data.user.uid)
        .set({
          email,
          password,
          name,
          image:
            'https://firebasestorage.googleapis.com/v0/b/food-app-14c81.appspot.com/o/GirlAvatart.png?alt=media&token=2335b8ab-810e-4d5c-ad2f-fd144f2630c8',
          uid: data.user.uid,
        })
        .then(() => {
          console.log('data set success!');
          dispatch({
            type: IS_AUTHENTICATED,
            payload: true,
          });
        });
    })
    .catch(error => {
      console.error(error);
    });
};

export const signIn = data => async dispatch => {
  // console.log(data)
  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      console.log('signIn success');
      console.log('SIGN IN DATA', data);
      dispatch({
        type: IS_NEW_USER,
        payload: data.additionalUserInfo.isNewUser,
      });
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      console.log('signOut success!');
    })
    .catch(error => {
      console.error('signOut failed');
    });
};
