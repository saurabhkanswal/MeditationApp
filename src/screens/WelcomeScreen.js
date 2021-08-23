import React from "react";
import { Text,
   View,
    Image,
     ImageBackground,
      StyleSheet,
      Pressable
     } from "react-native";
import { brownBackground, Logo, girlOnSofa} from '../../img/image'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../components/Button'

function WelcomeScreen({navigation}) {

  const navigateToLogin = ()=>{
    navigation.navigate('SignIn')
  }

  const navigateToSignup = ()=>{
    navigation.navigate('SignUp')
  }

  return (
    <View style={styles.container}>
      <ImageBackground
      source={brownBackground}
      resizeMode='cover'
      style={styles.backgroundImage}
      >
        <Image source={Logo} style={styles.Logo} />
        <Image source={girlOnSofa} style={styles.sofaGirl}/>
      </ImageBackground>
      <View style={styles.bottomPart}>
        <Text style={styles.heading}>We are what we do</Text>
        <Text style={styles.subheading}>Thousand of people are using silent moon</Text>
        <Text style={styles.subheading}>for smalls meditaion</Text>
        <Pressable style={styles.buttonContainer} onPress={navigateToSignup}>
        <Button text="SIGN UP" />
        </Pressable>
        <View style={styles.actionContainer}>
        <Text style={styles.actionTitle}>ALREADY HAVE AN ACCOUNT? </Text>
        <Text style={[styles.actionTitle, styles.actionText]} onPress={navigateToLogin}>LOG IN</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  },
  backgroundImage:{
    flex: 1,
    width: wp('100%'),
    height: hp('60%'),
    alignItems: 'center'
  },
  Logo:{
    marginTop: 40
  },
  sofaGirl: {
    marginTop: hp('7%')
  },
  bottomPart:{
    width: wp('100%'),
    height: hp('40%'),
    alignItems: 'center'
  },
  heading:{
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
    color: '#3F414E'
  },
  subheading: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 16,
    color: '#A1A4B2'
  },
  buttonContainer: {
    marginTop: hp('10%')
  }, 
  actionTitle: {
    color: '#A1A4B2',
    marginTop: hp('2%'),
    fontWeight: 'bold'
  },
  actionText: {
    color: '#8E97FD'
  },
  actionContainer: {
    flexDirection: 'row'
  }
})

export default WelcomeScreen;
