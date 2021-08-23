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
import RNDateTimeSelector from 'react-native-date-time-scroll-picker';
import Button from '../components/Button';
import {signOut} from '../action/auth';
import {connect, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import {IS_NEW_USER} from '../action/action.types';

const borderWidth = 25;
const setTimerWidthHeight = wp(75);
const selectedItemTextSize = 25;
const wrapperHeight = setTimerWidthHeight - borderWidth * 2;

const addZeroToDigits = digit => {
  if (digit) {
    let zeroAdded = `0${digit}`;
    return zeroAdded.substring(zeroAdded.length - 2);
  } else {
    return `00`;
  }
};

const dataSet = {
  data: {
    firstColumn: [...Array(13).keys()].map((item, idx) => {
      return {value: addZeroToDigits(item), index: idx};
    }),
    secondColumn: [...Array(60).keys()].map((item, idx) => {
      return {value: addZeroToDigits(item), index: idx};
    }),
    thirdColumn: [
      {value: 'AM', index: 0},
      {value: 'PM', index: 1},
    ],
  },
  initials: [8, 25, 0],
};

const Days = [
  {
    id: 1,
    text: 'SU',
  },
  {
    id: 2,
    text: 'MO',
  },
  {
    id: 3,
    text: 'TU',
  },
  {
    id: 4,
    text: 'WE',
  },
  {
    id: 5,
    text: 'TH',
  },
  {
    id: 6,
    text: 'FR',
  },
  {
    id: 7,
    text: 'SA',
  },
];

const Reminders = ({uid}) => {
  const seperatorComponentRendererOne = () => {
    return (
      <Text
        style={{
          fontSize: selectedItemTextSize,
          lineHeight: setTimerWidthHeight * 0.15,
        }}>
        :
      </Text>
    );
  };
  const seperatorComponentRendererTwo = () => {
    return (
      <Text
        style={{
          fontSize: selectedItemTextSize,
          lineHeight: setTimerWidthHeight * 0.15,
        }}></Text>
    );
  };

  const [listArray, setListArray] = useState(new Set([]));
  const [reminderTime, setReminderTime] = useState([]);
  const dispatch = useDispatch();
  // console.log('rem', _.values(listArray));

  const deActiveDayFilter = dayId => {
    listArray.delete(dayId);
    setListArray(new Set([...listArray]));
  };

  const saveReminder = () => {
    database()
      .ref(`/users/${uid}/reminder`)
      .set({
        reminderTime,
        dayList: [...listArray],
      });
    // navigation.navigate('Reminders');
    dispatch({
      type: IS_NEW_USER,
      payload: false,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>What Time would you</Text>
        <Text style={styles.heading}>like to meditate?</Text>
      </View>
      <Text style={styles.tagLine}>
        Any time you can choose but We recommend
      </Text>
      <Text style={styles.tagLine}>first thing in the morning.</Text>
      <View style={styles.timer}>
        <RNDateTimeSelector
          dataSet={dataSet}
          onValueChange={value => {
            console.log('data on users end :   ... ', value);
            setReminderTime([...value]);
          }}
          containerStyle={{
            alignSelf: 'center',
            borderWidth: 0,
            borderColor: 'transparent',
            borderRadius: 0,
            height: wp(50),
            marginBottom: 42,
          }}
          firstSeperatorComponent={seperatorComponentRendererOne}
          secondSeperatorComponent={seperatorComponentRendererTwo}
          seperatorContainerStyle={{
            width: wp(4),
          }}
          scrollPickerOptions={{
            itemHeight: 40,
            wrapperHeight: wrapperHeight,
            wrapperColor: 'rgba(0,0,0,0)',
            highlightColor: 'rgba(0,0,0,0.9)',
          }}
          textStyle={{
            fontSize: selectedItemTextSize,
            fontFamily: null,
          }}
          textColor={{
            primary: 'rgba(0,0,0,1.0)',
            secondary: 'rgba(0,0,0,0.5)',
            other: 'rgba(0,0,0,0)',
          }}
        />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Which day would you</Text>
        <Text style={styles.heading}>like to meditate?</Text>
      </View>
      <Text style={styles.tagLine}>
        Everyday is best, but We recommend picking
      </Text>
      <Text style={styles.tagLine}>at least five.</Text>

      <View style={styles.dayContainer}>
        {Days.map(day => (
          <Pressable
            key={day.id}
            style={[styles.day, listArray.has(day.id) && styles.activeDay]}
            onPress={() =>
              listArray.has(day.id)
                ? deActiveDayFilter(day.id)
                : setListArray(() => new Set([...listArray, day.id]))
            }>
            <Text
              style={[
                styles.dayText,
                listArray.has(day.id) && styles.activeDayText,
              ]}>
              {day.text}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={{alignItems: 'center'}}>
        <Pressable onPress={() => saveReminder()}>
          <Button text="SAVE" />
        </Pressable>
        <Text style={styles.cancelText} onPress={() => console.log('ok')}>
          NO THANKS
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: 'sans-serif',
    color: '#3F414E',
  },
  tagLine: {
    fontSize: 15,
    color: '#A1A4B2',
    fontFamily: 'sans-serif',
  },
  headingContainer: {
    marginTop: hp('4%'),
    marginBottom: 10,
  },
  timer: {
    height: hp('25%'),
    backgroundColor: '#E1E1E5',
    marginTop: hp('4%'),
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: hp('7%'),
    marginTop: hp('4%'),
  },
  day: {
    backgroundColor: 'white',
    borderWidth: 2,
    padding: 13,
    borderRadius: 50,
    borderColor: '#A1A4B2',
  },
  activeDay: {
    backgroundColor: '#3F414E',
    borderWidth: 0,
    borderWidth: 2,
    borderColor: '#3F414E',
  },
  activeDayText: {
    color: 'white',
  },
  dayText: {
    fontWeight: 'bold',
    color: '#A1A4B2',
  },
  cancelText: {
    textAlign: 'center',
    marginTop: wp('4%'),
    fontWeight: 'bold',
    color: '#3F414E',
  },
});

const mapStateToProps = state => {
  const {auth} = state;
  return {
    uid: auth.user.uid,
  };
};

export default connect(mapStateToProps)(Reminders);
