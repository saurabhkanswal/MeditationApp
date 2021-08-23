import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {signOut} from '../action/auth';
import Icon from 'react-native-vector-icons/Feather';

const Profile = ({authState, signOut, navigation}) => {
  const {user} = authState;
  const reminder = user.reminder ? [...user.reminder.reminderTime] : [];

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
      }}>
      <View style={styles.header}>
        <Image
          source={{uri: authState.user && authState.user.image}}
          style={styles.profieImage}
        />
        <Text style={styles.title}>
          {authState.user && authState.user.name}
        </Text>
        <Text style={styles.subTitle}>
          {authState.user && authState.user.email}
        </Text>
      </View>
      <View>
        <Text style={styles.reminderText}> Reminder</Text>
        <View style={styles.reminderContainer}>
          <Image
            source={{
              uri: 'https://cdn.iconscout.com/icon/free/png-256/clock-1851256-1569113.png',
            }}
            style={styles.reminderClock}
          />
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'red',
              width: wp('62%'),
              justifyContent: 'center',
            }}>
            {reminder.length === 0 ? (
              <>
                <Text style={styles.noReminderText}>No reminder available</Text>
              </>
            ) : (
              <>
                <Text style={styles.timeText}>{reminder[0].index} :</Text>
                <Text style={styles.timeText}> {reminder[1].value} </Text>
                <Text style={styles.timeText}>{reminder[2].value}</Text>
              </>
            )}
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              // backgroundColor: 'red',
              height: hp('10%'),
              padding: 10,
            }}>
            <Icon
              name={reminder.length === 0 ? 'plus' : 'edit'}
              size={22}
              color="#8E97FD"
              onPress={() => navigation.navigate('Reminders')}
            />
          </View>
        </View>
      </View>
      <Pressable style={styles.signOutButton} onPress={() => signOut()}>
        <Text style={styles.signOutText}>SIGN OUT</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    height: hp('30%'),
    marginBottom: 40,
  },
  profieImage: {
    width: wp('20%'),
    height: hp('10%'),
    marginBottom: 7,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  subTitle: {
    color: '#000000',
  },
  signOutButton: {
    borderWidth: 2.5,
    width: wp('90%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#00D84A',
    marginBottom: 15,
    backgroundColor: 'rgba(0,216,74, 0.1)',
    borderRadius: 20,
  },
  signOutText: {
    fontWeight: 'bold',
    color: '#00D84A',
  },
  reminderContainer: {
    height: hp('10%'),
    width: wp('90%'),
    // justifyContent: 'space-evenly',
    backgroundColor: '#E1E1E5',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 80,
  },
  reminderClock: {
    width: wp('13%'),
    height: hp('7%'),
    // marginRight: 20,
  },
  timeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3F414E',
  },
  reminderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3F414E',
    marginBottom: 7,
  },
  noReminderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A4A7B5',
    marginBottom: 7,
  },
});

const mapStateToProps = state => {
  const {auth} = state;
  return {
    authState: auth,
  };
};

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
