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
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  darkShodow,
  betterSleep,
  reduceStress,
  improvePerformance,
  reduceAnxiety,
  personalGrowth,
  increaseHappiness,
  increaseConcentration,
} from '../../img/image';
import {connect} from 'react-redux';
import {setTopic} from '../action/chooseTopic';
import database from '@react-native-firebase/database';

const ChooseTopic = ({navigation, uid}) => {
  const Focus = text => {
    database().ref(`/users/${uid}/choosedTopic`).set({
      text,
    });
    navigation.navigate('Reminders');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>What Brings you</Text>
      <ImageBackground
        source={darkShodow}
        resizeMode="contain"
        style={styles.cloud}>
        <Text style={styles.subHeading}>to Silent Moon?</Text>
        <Text style={styles.tagLine}>Choose a topic to focus on:</Text>
      </ImageBackground>
      <View style={styles.boxContainer}>
        <View style={styles.column1}>
          <Pressable
            style={[styles.bigBox, {backgroundColor: '#8E97FD'}]}
            onPress={() => Focus('Reduce Stress')}>
            <View style={styles.imageIconContainer}>
              <Image source={reduceStress} />
            </View>
            <View style={styles.boxText}>
              <Text style={styles.makeTextWhite}>Reduce Stress</Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.smallBox, {backgroundColor: '#FEB18F'}]}
            onPress={() => Focus('Increase Happiness')}>
            <View style={styles.imageIconContainer}>
              <Image source={increaseHappiness} />
            </View>
            <View style={styles.boxText}>
              <Text style={styles.makeTextBlack}>Increase</Text>
              <Text style={styles.makeTextBlack}>Happiness</Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.bigBox, {backgroundColor: '#6CB28E'}]}
            onPress={() => Focus('Personal Growth')}>
            <View style={styles.imageIconContainer}>
              <Image source={personalGrowth} />
            </View>
            <View style={styles.boxText}>
              <Text style={styles.makeTextWhite}>Personal</Text>
              <Text style={styles.makeTextWhite}>Growth</Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.smallBox, {backgroundColor: '#35BDD0'}]}
            onPress={() => Focus('Focus')}>
            <View style={styles.imageIconContainer}>
              <Image source={reduceStress} />
            </View>
            <View style={styles.boxText}>
              <Text style={styles.makeTextBlack}>Focus</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.column2}>
          <Pressable
            style={[styles.smallBox, {backgroundColor: '#FA6E5A'}]}
            onPress={() => Focus('Improve Performance')}>
            <View style={[styles.imageIconContainer, {marginTop: 5}]}>
              <Image source={improvePerformance} />
            </View>
            <View style={styles.boxText}>
              <Text style={styles.makeTextWhite}>Improve</Text>
              <Text style={styles.makeTextWhite}>Performance</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.bigBox, {backgroundColor: '#FFCF86'}]}
            onPress={() => Focus('Reduce Anxiety')}>
            <View style={[styles.imageIconContainer, , {marginTop: 5}]}>
              <Image source={reduceAnxiety} />
            </View>
            <View style={styles.boxText}>
              <Text style={styles.makeTextBlack}>Reduce Anxiety</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.smallBox, {backgroundColor: '#4E5567'}]}
            onPress={() => Focus('Better Sleep')}>
            <View style={[styles.imageIconContainer, , {marginTop: 5}]}>
              <Image source={betterSleep} />
            </View>
            <View
              style={[
                styles.boxText,
                {
                  backgroundColor: '#3F414E',
                  flex: 1,
                  justifyContent: 'flex-end',
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                },
              ]}>
              <Text style={styles.makeTextWhite}>Better Sleep</Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.bigBox, {backgroundColor: '#D9A5B5'}]}
            onPress={() => Focus('Increase Concentration')}>
            <View style={[styles.imageIconContainer, , {marginTop: 5}]}>
              <Image source={increaseConcentration} />
            </View>
            <View style={styles.boxText}>
              <Text style={styles.makeTextBlack}>Increase</Text>
              <Text style={styles.makeTextBlack}>Concentration</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cloud: {
    width: wp('100%'),
    height: hp('14%'),
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 30,
    fontFamily: 'sans-serif',
    fontWeight: '700',
    color: '#3F414E',
    marginTop: 35,
    marginLeft: 15,
  },
  subHeading: {
    fontSize: 30,
    fontFamily: 'sans-serif',
    color: '#3F414E',
    marginLeft: 15,
    marginBottom: 15,
  },
  tagLine: {
    fontSize: 22,
    color: '#A1A4B2',
    marginLeft: 15,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  column1: {
    width: wp('42%'),
  },
  column2: {
    width: wp('42%'),
  },
  bigBox: {
    backgroundColor: 'red',
    height: hp('28%'),
    borderRadius: 10,
    marginBottom: wp('4%'),
    justifyContent: 'space-between',
  },
  smallBox: {
    backgroundColor: 'green',
    height: hp('22%'),
    borderRadius: 10,
    marginBottom: wp('4%'),
    justifyContent: 'space-between',
  },
  imageIconContainer: {
    alignItems: 'center',
  },
  makeTextWhite: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFECCC',
  },
  makeTextBlack: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  boxText: {
    padding: 15,
  },
});

const mapStateToProps = state => {
  const {auth} = state;
  return {
    uid: auth.user.uid,
  };
};

export default connect(mapStateToProps)(ChooseTopic);
