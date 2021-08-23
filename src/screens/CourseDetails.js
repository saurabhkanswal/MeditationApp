import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {sun, heart, headphone, heartWhite} from '../../img/image';
import {connect, useDispatch} from 'react-redux';
import {getMusicList} from '../action/music';
import Navigate from '../components/Navigate';
import {
  RESET_FEMALE_MUSIC_LIST,
  RESET_MALE_MUSIC_LIST,
  SET_MALE_MUSIC_LIST_LOADING,
  SET_FEMALE_MUSIC_LIST_LOADING,
  SET_ACTIVE_SONG_ID,
  SET_ACTIVE_SONG_DATA,
} from '../action/action.types';
import _ from 'lodash';
import IconButton from '../components/IconButton';
import PlayMusic from '../components/PlayMusic';
import LottieView from 'lottie-react-native';

const CourseDetails = ({
  navigation,
  route,
  maleMusicList,
  getMusicList,
  femaleMusicList,
  maleMusicListLoading,
  femaleMusicListLoading,
  activeSongId,
}) => {
  const [activePicker, setActivePicker] = useState('MALE');
  const [data, setData] = useState(null);
  const {name, subHeading, id} = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    if (maleMusicList === null) {
      getMusicList({
        courseId: id,
        voiceId: 0,
      });
    }
    return () => {
      dispatch({
        type: RESET_MALE_MUSIC_LIST,
      });
      dispatch({
        type: SET_MALE_MUSIC_LIST_LOADING,
        payload: true,
      });
      dispatch({
        type: SET_FEMALE_MUSIC_LIST_LOADING,
        payload: true,
      });
      dispatch({
        type: RESET_FEMALE_MUSIC_LIST,
      });
    };
  }, []);

  console.log(maleMusicList);

  useEffect(() => {
    if (maleMusicList === null && activePicker === 'MALE') {
      getMusicList({
        courseId: id,
        voiceId: 0,
      });
    } else if (femaleMusicList === null && activePicker === 'FEMALE') {
      getMusicList({
        courseId: id,
        voiceId: 1,
      });
    }
  }, [activePicker]);
  console.log('MALE: ', maleMusicList);
  console.log('Female: ', femaleMusicList);

  const listenMusic = ({songName, courseName, songUrl, id}) => {
    dispatch({
      type: SET_ACTIVE_SONG_ID,
      payload: id,
    });
    dispatch({
      type: SET_ACTIVE_SONG_DATA,
      payload: {
        songName,
        courseName,
        songUrl,
      },
    });
    navigation.navigate('Music');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={sun}
        style={styles.banner}
        resizeMode="cover"
        imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
        <Pressable onPress={() => navigation.goBack()}>
          <Navigate navigationType="back" />
        </Pressable>
        <Pressable>
          <IconButton iconName={heartWhite} backgroundColor="tansparentBlue" />
        </Pressable>
      </ImageBackground>
      <View style={styles.containerBottom}>
        <Text style={styles.heading}>{name}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
        <Text style={styles.tagLine}>
          Ease the mind into a restful night's sleep with
        </Text>
        <Text style={styles.tagLine}>these deep ambient tones.</Text>
        <View style={styles.stat}>
          <View style={styles.stat}>
            <Image source={heart} />
            <Text style={styles.statText}>24,234 Favorits</Text>
          </View>
          <View style={styles.stat}>
            <Image source={headphone} />
            <Text style={styles.statText}>34,234 Listening</Text>
          </View>
        </View>
        <Text style={styles.pickerHeading}>Pick a Narrator</Text>
      </View>
      <View style={styles.picker}>
        <Pressable
          style={[
            styles.pickerMale,
            activePicker === 'MALE' && styles.activePickerContainer,
          ]}
          onPress={() => setActivePicker('MALE')}>
          <Text
            style={[
              styles.pickerMaleText,
              activePicker === 'MALE' && styles.activePickerText,
            ]}>
            MALE VOICE
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.pickerFemale,
            activePicker === 'FEMALE' && styles.activePickerContainer,
          ]}
          onPress={() => setActivePicker('FEMALE')}>
          <Text
            style={[
              styles.pickerFemaleText,
              activePicker === 'FEMALE' && styles.activePickerText,
            ]}>
            FEMALE VOICE
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          width: wp('100%'),
          height: hp('39%'),
        }}>
        {activePicker === 'MALE' ? (
          <View style={{justifyContent: 'center', flex: 1}}>
            {maleMusicList &&
              maleMusicList.map(item => {
                return (
                  <Pressable
                    onPress={() =>
                      listenMusic({
                        songName: item.songName,
                        courseName: 'MEDITATION',
                        songUrl: item.url,
                        id: item.id,
                      })
                    }
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <PlayMusic
                      songName={item.songName}
                      duration={item.duration}
                      isPlaying={activeSongId === item.id && true}
                    />
                    {activeSongId === item.id && (
                      <LottieView
                        source={require('../LottieAnimation/soundWave.json')}
                        autoPlay
                        loop
                        style={{width: wp('30%'), height: hp('7%')}}
                      />
                    )}
                  </Pressable>
                );
              })}
          </View>
        ) : (
          <View style={{justifyContent: 'center', flex: 1}}>
            {femaleMusicList &&
              femaleMusicList.map(item => {
                return (
                  <Pressable
                    onPress={() =>
                      listenMusic({
                        songName: item.songName,
                        courseName: item.category,
                        songUrl: item.url,
                        id: item.id,
                      })
                    }
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <PlayMusic
                      songName={item.songName}
                      duration={item.duration}
                      isPlaying={activeSongId === item.id && true}
                    />
                    {activeSongId === item.id && (
                      <LottieView
                        source={require('../LottieAnimation/soundWave.json')}
                        autoPlay
                        loop
                        style={{width: wp('30%'), height: hp('7%')}}
                      />
                    )}
                  </Pressable>
                );
              })}
          </View>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {music} = state;
  return {
    maleMusicList: music.maleMusicList,
    femaleMusicList: music.femaleMusicList,
    maleMusicListLoading: music.maleMusicListLoading,
    femaleMusicListLoading: music.femaleMusicListLoading,
    activeSongId: music.activeSongId,
  };
};

const mapDispatchToProps = {
  getMusicList,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  banner: {
    width: wp('100%'),
    height: hp('30%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
  },
  heading: {
    fontSize: 35,
    color: '#3F414E',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 15,
    color: '#A1A4B2',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  tagLine: {
    fontSize: 14,
    color: '#A1A4B2',
  },
  containerBottom: {
    padding: 20,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 7,
  },
  statText: {
    color: '#A1A4B2',
    fontWeight: 'bold',
    paddingLeft: 8,
    marginRight: 35,
  },
  pickerHeading: {
    fontSize: 25,
    color: '#3F414E',
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  picker: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#E4E6FD',
    padding: 0.1,
  },
  pickerMale: {
    alignItems: 'center',
    width: wp('50%'),
  },
  pickerFemale: {
    // backgroundColor: 'green',
    width: wp('50%'),
    alignItems: 'center',
  },
  pickerFemaleText: {
    fontSize: 18,
    color: '#A1A4B2',
    // marginLeft: 15,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  pickerMaleText: {
    fontSize: 18,
    color: '#A1A4B2',
    // marginLeft: 15,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  activePickerText: {
    color: '#8E97FD',
  },
  activePickerContainer: {
    borderBottomWidth: 3,
    // borderRadius: 100,
    borderColor: '#8E97FD',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);
