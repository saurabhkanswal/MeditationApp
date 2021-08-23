import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  FlatList,
} from 'react-native';
import {
  heartWhite,
  all,
  anxious,
  sleep,
  kids,
  dailyClam,
} from '../../img/image';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getMeditateMusicList} from '../action/music';
import {connect, useDispatch} from 'react-redux';
import PlayMusic from '../components/PlayMusic';
import {SET_ACTIVE_SONG_DATA, SET_ACTIVE_SONG_ID} from '../action/action.types';
import LottieView from 'lottie-react-native';

const filter = [
  {
    filterName: 'All',
    id: 'all',
    image: all,
  },
  {
    filterName: 'My',
    id: 'my',
    image: heartWhite,
  },
  {
    filterName: 'Anxious',
    id: 'anxious',
    image: anxious,
  },
  {
    filterName: 'Sleep',
    id: 'sleep',
    image: sleep,
  },
  {
    filterName: 'Kids',
    id: 'kids',
    image: kids,
  },
];

const FilterIcon = ({iconName, filterName, activeFilter}) => {
  return (
    <View
      style={[
        styles.filterIcon,
        activeFilter === filterName && styles.activeFilter,
      ]}>
      <Image source={iconName} />
    </View>
  );
};

const Meditate = ({
  getMeditateMusicList,
  meditateSongList,
  navigation,
  activeSongId,
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filterdListData, setfilterdListData] = useState([]);
  const disptach = useDispatch();
  useEffect(() => {
    getMeditateMusicList();
    setfilterdListData(filterdListData =>
      filterdListData.concat(meditateSongList),
    );
  }, []);

  const listenMusic = ({songName, courseName, songUrl, id}) => {
    disptach({
      type: SET_ACTIVE_SONG_ID,
      payload: id,
    });
    disptach({
      type: SET_ACTIVE_SONG_DATA,
      payload: {
        songName,
        courseName,
        songUrl,
      },
    });
    navigation.navigate('Music');
  };

  const renderList = ({item}) => (
    <Pressable
      onPress={() =>
        listenMusic({
          songName: item.songName,
          courseName: item.category,
          songUrl: item.url,
          id: item.id,
        })
      }
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <PlayMusic
        songName={item.songName}
        duration={item.category}
        isPlaying={activeSongId === item.id && true}
      />
      {activeSongId === item.id && (
        <LottieView
          source={require('../LottieAnimation/soundWave.json')}
          autoPlay
          loop
          style={{width: wp('30%'), height: hp('7%')}}
        />
      )}
    </Pressable>
  );

  // let filterdListData = JSON.parse(JSON.stringify(meditateSongList));

  const filterData = ({filterName, filterId}) => {
    console.log('FILTER NAME:', filterName);
    console.log('FILTER ID', filterId);
    if (filterId !== 'all' || filterId !== 'my') {
      setfilterdListData(meditateSongList.filter(filterCategory));
      function filterCategory(item) {
        return item.category === filterId;
      }
    } else {
      setfilterdListData(meditateSongList);
    }

    setActiveFilter(filterName);
  };

  console.log('filt', filterdListData);
  if (filterdListData === null) {
    return <Text>dda</Text>;
  }

  return (
    <FlatList
      data={filterdListData}
      keyExtractor={item => item.id}
      renderItem={renderList}
      style={styles.container}
      extraData={meditateSongList}
      // removeClippedSubviews={false}
      ListHeaderComponent={
        <View>
          <View style={styles.header}>
            <Text style={styles.headerHeading}>Meditate</Text>
            <Text style={styles.headerSubheading}>
              we can learn how to recognize when our minds
            </Text>
            <Text style={styles.headerSubheading}>
              are doing their normal everyday acrobatics.
            </Text>
            <ScrollView horizontal={true} style={styles.filterContainer}>
              {filter.map(item => (
                <Pressable
                  style={styles.filter}
                  onPress={() =>
                    filterData({
                      filterName: item.filterName,
                      filterId: item.id,
                    })
                  }
                  key={item.id}>
                  <FilterIcon
                    iconName={item.image}
                    filterName={item.filterName}
                    activeFilter={activeFilter}
                  />
                  <Text
                    style={[
                      styles.filterText,
                      activeFilter === item.filterName &&
                        styles.activeFilterText,
                    ]}>
                    {item.filterName}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <Pressable style={{padding: 15}}>
            <ImageBackground
              source={dailyClam}
              resizeMode="cover"
              imageStyle={{borderRadius: 15}}
              style={styles.banner}>
              <View>
                <Text style={[styles.heading, {color: '#3F414E'}]}>
                  Daily Calm
                </Text>
                <Text style={{color: '#3F414E', fontSize: 13}}>
                  APR 30 {'\uFF65'} PAUSE PRACTICE
                </Text>
              </View>
              <View style={styles.actionButton}>
                <Icon name="play" size={20} color="#F0F1F2" />
              </View>
            </ImageBackground>
          </Pressable>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filterContainer: {
    marginTop: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  headerHeading: {
    fontSize: 30,
    fontFamily: 'sans-serif',
    color: '#3F414E',
    fontWeight: 'bold',
  },
  headerSubheading: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    color: '#A0A3B1',
  },
  filterIcon: {
    backgroundColor: '#A0A3B1',
    width: wp('15%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    margin: 9,
    marginBottom: 7,
    borderRadius: 25,
  },
  filter: {
    alignItems: 'center',
  },
  filterText: {
    color: '#A0A3B1',
    fontWeight: 'bold',
  },
  activeFilter: {
    backgroundColor: '#8E97FD',
  },
  banner: {
    height: hp('15%'),
    width: wp('92%'),
    backgroundColor: '#ECD3C2',
    borderRadius: 15,
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  actionButton: {
    backgroundColor: '#3F414E',
    width: wp('11%'),
    height: hp('5.2%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 70,
  },
  activeFilterText: {
    fontWeight: 'bold',
    color: '#3F414E',
  },
});

const mapDispatchToProps = {
  getMeditateMusicList,
};

const mapStateToProps = state => {
  const {music} = state;
  return {
    meditateSongList: music.meditateSongList,
    activeSongId: music.activeSongId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meditate);
