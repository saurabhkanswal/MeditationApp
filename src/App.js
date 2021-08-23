if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import database from '@react-native-firebase/database';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect, useDispatch} from 'react-redux';

import {IS_AUTHENTICATED, SET_USER} from './action/action.types';
import auth from '@react-native-firebase/auth';
import WelcomeScreen from './screens/WelcomeScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import GetStarted from './screens/GetStarted';
import ChooseTopic from './screens/ChooseTopic';
import Reminders from './screens/Reminders';

import Home from './screens/Home';
import Meditate from './screens/Meditate';
import Music from './screens/Music';
import Profile from './screens/Profile';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CourseDetails from './screens/CourseDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Reminders" component={Reminders} />
    </Stack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#8E97FD',
        inactiveTintColor: '#A0A3B1',
        // activeBackgroundColor: '#8E97FD',
        style: {
          height: wp('18%'),
          padding: 3,
        },
        labelStyle: {
          fontSize: 13,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={route => ({
          tabBarIcon: ({focused}) => (
            <View style={focused && styles.activeIcon}>
              <FontAwesomeIcon
                name="home"
                size={30}
                color={focused ? 'white' : '#A0A3B1'}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Meditate"
        component={Meditate}
        options={route => ({
          tabBarIcon: ({focused}) => (
            <View style={focused && styles.activeIcon}>
              <Icon
                name="yuque"
                size={30}
                color={focused ? 'white' : '#A0A3B1'}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Music"
        component={Music}
        options={route => ({
          tabBarIcon: ({focused}) => (
            <View style={focused && styles.activeIcon}>
              <FontAwesomeIcon
                name="music"
                size={30}
                color={focused ? 'white' : '#A0A3B1'}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={route => ({
          tabBarIcon: ({focused}) => (
            <View style={focused && styles.activeIcon}>
              <FontAwesomeIcon
                name="user-alt"
                size={30}
                color={focused ? 'white' : '#A0A3B1'}
              />
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

function App({authState, isNewUser}) {
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });

      database()
        .ref(`/users/${user._user.uid}`)
        .on('value', snapshot => {
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (authState.loading) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      <NavigationContainer>
        {authState.isAuthenticated ? (
          <>
            {isNewUser === false ? (
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Home" component={HomeTabs} />
                <Stack.Screen name="CourseDetails" component={CourseDetails} />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="GetStarted" component={GetStarted} />
                <Stack.Screen name="ChooseTopic" component={ChooseTopic} />
                <Stack.Screen name="Reminders" component={Reminders} />
              </Stack.Navigator>
            )}
          </>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: {
    padding: 12,
    backgroundColor: '#8E97FD',
    borderRadius: 20,
  },
});

const mapStateToProps = state => {
  const {auth, newUser} = state;
  return {
    authState: auth,
    isNewUser: newUser.isNewUser,
  };
};

export default connect(mapStateToProps)(App);
