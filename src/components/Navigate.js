import React from 'react';
import {Image, StyleSheet, Text, Pressable, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {cancelIcon, backArrow} from '../../img/image';

const Navigate = ({navigationType}) => {
  return (
    <View style={styles.navigateContainer}>
      {navigationType === 'back' ? (
        <Image source={backArrow} style={styles.logo} />
      ) : (
        <Image source={cancelIcon} style={styles.logo} />
      )}
    </View>
  );
};

Navigate.propTypes = {
  navigationType: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  navigateContainer: {
    width: wp('14%'),
    height: hp('7%'),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#EBEAEC',
  },
  logo: {
    width: wp('8%'),
    height: hp('4%'),
  },
});

export default Navigate;
