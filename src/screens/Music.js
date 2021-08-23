import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, Pressable} from 'react-native';
import {musicBackground, heartWhite} from '../../img/image';
import Navigate from '../components/Navigate';
import IconButton from '../components/IconButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SoundPlayer from 'react-native-sound-player';
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import {connect, useDispatch} from 'react-redux';
import {RESET_ACTIVE_SONG_ID} from '../action/action.types';
import LottieView from 'lottie-react-native';
import Button from '../components/Button';

const Music = ({navigation, musicState}) => {
  // const {songName, courseName, songUrl} = route.params;
  const {activeSongData} = musicState;
  console.log('ACTIVE DATA', activeSongData);
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useDispatch();
  const playMusic = () => {
    setPlay(true);
    SoundPlayer.play();
  };

  const pauseMusic = () => {
    setPlay(false);
    SoundPlayer.pause();
  };

  useEffect(() => {
    try {
      // or play from url
      SoundPlayer.loadUrl(activeSongData.songUrl);
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
    const _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        setPlay(false);
        dispatch({
          type: RESET_ACTIVE_SONG_ID,
        });
      },
    );

    const _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      ({success, url}) => {
        getInfo();
      },
    );

    return () => {
      SoundPlayer.stop();
      Soundplayer.unmount();
      _onFinishedPlayingSubscription.remove();
      _onFinishedLoadingURLSubscription.remove();
    };
  }, []);

  async function getInfo() {
    // You need the keyword `async`
    try {
      const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async
      setDuration(info.duration); // {duration: 12.416, currentTime: 7.691}
      setCurrentTime(info.currentTime);
      console.log('INFo', info);
    } catch (e) {
      console.log('There is no song playing', e);
    }
  }
  // console.log('SUBSCRIPTION', _onFinishedPlayingSubscription);
  return (
    <ImageBackground
      source={musicBackground}
      style={styles.imageBackground}
      resizeMode="cover">
      {activeSongData === null ? (
        <View style={{flex: 1}}>
          <View style={styles.yogaGirlContainer}>
            <LottieView
              source={require('../LottieAnimation/yogaGirl.json')}
              autoPlay
              loop
              style={{
                // backgroundColor: 'red',
                height: hp('40%'),
              }}
            />
          </View>
          <View style={styles.noMusicContainer}>
            <Text style={styles.noMusicText}>No music to play. 🎶</Text>
            <Pressable onPress={() => navigation.navigate('Home')}>
              <Button text="Listen Now" />
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Navigate navigationType="cancel" />
            </Pressable>
            <View>
              <IconButton
                iconName={heartWhite}
                backgroundColor="greyBackground"
              />
            </View>
          </View>
          <View style={styles.containerCenter}>
            <Text style={styles.songText}>{activeSongData.songName}</Text>
            <Text style={styles.courseText}>{activeSongData.courseName}</Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.iconOutsideContainer}>
              <View style={styles.iconInsideContainer}>
                {play ? (
                  <Icon
                    name="pausecircle"
                    color="#3F414E"
                    size={80}
                    onPress={pauseMusic}
                  />
                ) : (
                  <Icon
                    name="play"
                    color="#3F414E"
                    size={80}
                    onPress={playMusic}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Slider
              style={{width: wp('90%'), height: 40}}
              minimumValue={0}
              maximumValue={1}
              value={5}
              minimumTrackTintColor="#3F414E"
              maximumTrackTintColor="#A0A3B1"
              thumbTintColor="#3F414E"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: wp('85%'),
              }}>
              <Text style={styles.durationText}>{currentTime}</Text>
              <Text style={styles.durationText}>
                {duration && Math.floor(Math.round(duration / 60))}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  durationText: {
    fontWeight: 'bold',
    color: '#3F414E',
  },
  imageBackground: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    marginTop: 10,
    height: hp('15%'),
  },
  containerCenter: {
    // backgroundColor: 'red',
    height: hp('24%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  songText: {
    fontSize: 38,
    color: '#3F414E',
    fontWeight: 'bold',
  },
  courseText: {
    fontSize: 15,
    color: '#A0A3B1',
    fontWeight: 'bold',
  },
  icon: {
    width: wp('10%'),
    height: hp('10%'),
  },
  actionContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 50,
  },
  iconOutsideContainer: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 50,
  },
  iconInsideContainer: {
    backgroundColor: 'white',
    // padding: 5,
    borderRadius: 50,
  },
  yogaGirlContainer: {
    height: hp('60%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  noMusicContainer: {
    alignItems: 'center',
  },
  noMusicText: {
    color: '#3F414E',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginBottom: 25,
  },
});

const mapStateToProps = state => {
  const {music} = state;
  return {
    musicState: music,
  };
};

export default connect(mapStateToProps)(Music);
