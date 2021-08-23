import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PropTypes from 'prop-types'


const Button = ({text, color='darkPurple'})=>{
  return(
    <View style={[styles.buttonContainer, color === 'darkPurple' && styles.makeColorDarkPurple, color === 'lightBlue' && styles.makeColorLightBlue]}>
      <Text style={[styles.buttonText, color === 'lightBlue' && styles.makeTextBlack]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: wp('90%'),
    height: hp('7.5%'),
    // backgroundColor: '#8E97FD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  makeColorDarkPurple: {
    backgroundColor: '#8E97FD'
  },
  makeColorLightBlue: {
    backgroundColor: '#EBEAEC'
  },
  makeTextBlack: {
    color: '#3F414E'
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#F6F1FB',
    fontWeight: 'bold',
    fontSize: 17
  }
})

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Button