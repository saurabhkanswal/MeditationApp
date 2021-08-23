import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  ToastAndroid,
  Image,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  silentmoonLogoWhite,
  girlWithMat,
  smallCloud,
  bird,
  bigCloud,
  smallBird,
} from '../../img/image';
import Button from '../components/Button';
import {connect} from 'react-redux';

const GetStarted = ({navigation, authState}) => {
  const getStarted = () => {
    navigation.navigate('ChooseTopic');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Image source={silentmoonLogoWhite} style={styles.Logo} />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[styles.heading]}>
              Hi {authState.user && authState.user.name}, Welcome
            </Text>
            <Text style={styles.subHeading}>to Silent Moon</Text>
            <Text style={styles.tagline}>
              Explore the app, Find some peace of mind to
            </Text>
            <Text style={styles.tagline}>Prepare for meditation</Text>
          </View>
          <View style={{height: hp('40%'), justifyContent: 'flex-end'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={smallCloud} style={{opacity: 0.7}} />
                <Image
                  source={smallBird}
                  style={{opacity: 0.7, marginTop: hp('5%')}}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image source={bird} style={{opacity: 0.7}} />
                <Image source={bigCloud} style={{opacity: 0.7}} />
              </View>
            </View>
            <ImageBackground
              source={girlWithMat}
              resizeMode="cover"
              style={styles.backgroundImage}></ImageBackground>
          </View>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <Pressable onPress={getStarted}>
          <Button text="GET STARTED" color="lightBlue" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    width: wp('100%'),
    height: hp('70%'),
    backgroundColor: '#adb7ff',
    alignItems: 'center',
  },
  containerBottom: {
    width: wp('100%'),
    height: hp('30%'),
    backgroundColor: '#8C96FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logo: {
    marginTop: 40,
  },
  heading: {
    fontSize: 30,
    fontFamily: 'sans-serif-medium',
    color: '#FFECCC',
  },
  subHeading: {
    fontSize: 30,
    fontFamily: 'sans-serif-thin',
    color: '#FFECCC',
    marginBottom: hp('2%'),
  },
  tagline: {
    fontFamily: 'sans-serif',
    color: '#EBEAEC',
  },
  backgroundImage: {
    // backgroundColor: 'red',
    width: wp('100%'),
    height: hp('30.5%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

const mapStateToProps = state => {
  const {auth} = state;
  return {
    authState: auth,
  };
};

export default connect(mapStateToProps)(GetStarted);
