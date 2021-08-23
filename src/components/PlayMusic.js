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
import {playButton, playColorButton} from '../../img/image';

const PlayMusic = ({songName, duration, isPlaying = false}) => {
  return (
    <View style={styles.container}>
      {isPlaying ? (
        <Image source={playColorButton} />
      ) : (
        <Image source={playButton} />
      )}

      <View style={styles.containerLeft}>
        <Text style={styles.heading}>{songName}</Text>
        <Text style={styles.subHeading}>{duration} MIN</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('60%'),
    height: hp('11%'),
    flexDirection: 'row',
    padding: 15,
  },
  containerLeft: {
    paddingLeft: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F414E',
  },
  subHeading: {
    color: '#A1A4B2',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default PlayMusic;
