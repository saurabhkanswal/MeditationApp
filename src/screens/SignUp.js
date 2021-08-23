import React,{useState} from "react";
import { Text, View, StyleSheet, Pressable, TextInput,
  ToastAndroid,

} from "react-native";
import Navigate from '../components/Navigate'
import Button from '../components/Button'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { signUpUser } from '../action/auth'
import { connect } from 'react-redux'


function SignUp({navigation, signUpUser}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  
  const submitForm = ()=>{
  if(email === '' || password === '' || name === ''){
      console.log('=>>>',email)
      console.log('=>>>',password)
      ToastAndroid.showWithGravity(
        "Please fill text input first",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
    } else {
      console.log('=>>>',email)
      console.log('=>>>',password)
      signUpUser({
        email,
        password,
        name
      })
    }
  }

  return (
    <View style={styles.container}>
    
    <Pressable onPress={()=> navigation.goBack()} style={styles.navigator}>
    <Navigate navigationType="back" />
    </Pressable>
    <View style={styles.body}>
    <Text style={styles.heading}>Create your account</Text>
    <Text style={styles.actionTitle}>SIGN UP WITH EMAIL</Text>
    <View style={styles.form}>
    <TextInput
        style={styles.input}
        placeholderTextColor="#A1A4B2"
        placeholder="Full name"
        // value={name}
        onChangeText={text  => setName(text)}
      />
      <TextInput
      style={styles.input}
      placeholderTextColor="#A1A4B2"
      placeholder="Email"
      // value={email}
      onChangeText={text => setEmail(text)}
    />
    <TextInput
      style={styles.input}
      placeholderTextColor="#A1A4B2"
      placeholder="Password"
      // value={password}
      onChangeText={text => setPassword(text)}
    />
    <Pressable onPress={submitForm}>
    <Button text="GET STARTED" />
    </Pressable>
    </View>
    <View style={styles.actionContainer}>
        <Text style={styles.actionTitle}>ALREADY HAVE AN ACCOUNT? </Text>
        <Text style={[styles.actionTitle, styles.actionText]} onPress={()=> navigation.navigate('SignIn')}>SIGN IN</Text>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    color: '#3F414E'
  },
  actionTitle: {
    color: '#A1A4B2',
    marginTop: hp('2%'),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#F2F3F7',
    fontSize: 17,
    paddingLeft: 12,
    paddingRight: 12,
    height: hp('7%'),
    width: wp('90%'),
    color:"#A1A4B2",
    borderRadius: 10,
    marginBottom: 15
  },
  body: {
    flex: 1,
    alignItems: 'center'
  },
  actionText: {
    color: '#8E97FD'
  },
  actionContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30
  },
  form: {
    marginTop: hp('10%')
  }
})

const mapDispatchtoProps = {
  signUpUser
}

export default connect(null, mapDispatchtoProps)(SignUp);
