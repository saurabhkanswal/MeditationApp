import React from 'react';
import {Image, StyleSheet, Text, Pressable, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

const IconButton = ({iconName, backgroundColor}) => {
  return (
    <View
      style={[
        styles.Container,
        backgroundColor === 'tansparentBlue' && styles.tansparentBlue,
        backgroundColor === 'greyBackground' && styles.greyBackground,
      ]}>
      <Image source={iconName} style={styles.logo} />
    </View>
  );
};

IconButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  Container: {
    width: wp('13%'),
    height: hp('6.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    // borderWidth: 2,
    // borderColor: '#EBEAEC',
  },
  logo: {
    width: wp('5%'),
    height: hp('2.2%'),
  },
  tansparentBlue: {
    backgroundColor: 'rgba(3,23,76,0.6)',
  },
  greyBackground: {
    backgroundColor: '#C4C5CA',
  },
});

export default IconButton;
