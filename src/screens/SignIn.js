import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Navigate from '../components/Navigate';
import Button from '../components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {signIn} from '../action/auth';
import {connect} from 'react-redux';

function SignIn({navigation, signIn}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    if (email === '' || password === '') {
      ToastAndroid.showWithGravity(
        'Please fill text input first',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      console.log(email);
      console.log(password);
      signIn({
        email,
        password,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.navigator}>
        <Navigate navigationType="back" />
      </Pressable>
      <View style={styles.body}>
        <Text style={styles.heading}>Welcome Back!</Text>
        <Text style={styles.actionTitle}>LOG IN WITH EMAIL</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#A1A4B2"
            placeholder="Email address"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#A1A4B2"
            placeholder="Password"
            onChangeText={text => setPassword(text)}
          />
          <Pressable onPress={submitForm}>
            <Button text="LOG IN" />
          </Pressable>
        </View>
        <View style={styles.actionContainer}>
          <Text style={styles.actionTitle}>DON'T HAVE AN ACCOUNT? </Text>
          <Text
            style={[styles.actionTitle, styles.actionText]}
            onPress={() => navigation.navigate('SignUp')}>
            SIGN UP
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navigator: {
    marginTop: hp('3%'),
    marginLeft: hp('1.5%'),
  },
  heading: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    marginTop: hp('4%'),
    marginBottom: hp('2%'),
    color: '#3F414E',
  },
  actionTitle: {
    color: '#A1A4B2',
    marginTop: hp('2%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F2F3F7',
    fontSize: 17,
    paddingLeft: 12,
    paddingRight: 12,
    height: hp('7%'),
    width: wp('90%'),
    color: '#A1A4B2',
    borderRadius: 10,
    marginBottom: 15,
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  actionText: {
    color: '#8E97FD',
  },
  actionContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
  },
  form: {
    marginTop: hp('10%'),
  },
});

const mapDispatchtoProps = {
  signIn,
};

export default connect(null, mapDispatchtoProps)(SignIn);
