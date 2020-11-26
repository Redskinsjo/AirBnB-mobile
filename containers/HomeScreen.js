import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
// import Pressable from 'react-native';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios({
        url: 'https://express-airbnb-api.herokuapp.com/rooms',
        method: 'get',
      });
      if (response.data) {
        // console.log(response.data);
        setIsLoading(false);
        setData(response.data);
      } else {
        console.log("response.data n'existe pas");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleClick = (item) => {
    console.log(item);
    // navigation.navigate('room', {});
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.super_container}>
      {isLoading ? (
        <ActivityIndicator color={'black'} size={'large'}></ActivityIndicator>
      ) : (
        // <LottieView sour></LottieView>
        <FlatList
          style={styles.appart_list}
          data={data}
          renderItem={(item) => {
            const yellowStars = item.item.ratingValue;
            const renderStars = [];
            for (let k = 0; k < 5; k++) {
              if (k <= yellowStars) {
                renderStars.push(
                  <Entypo
                    style={{ marginRight: 2 }}
                    name="star"
                    size={24}
                    color="#fcba03"
                    key={k}
                  />
                );
              } else {
                renderStars.push(
                  <Entypo
                    style={{ marginRight: 2 }}
                    name="star"
                    size={24}
                    color="gray"
                    key={k}
                  />
                );
              }
            }

            return (
              <Pressable
                onPress={() => {
                  console.log(item.item._id);
                }}
              >
                <View style={styles.appart}>
                  <FlatList
                    horizontal={true}
                    style={styles.flatlist_photos}
                    data={item.item.photos}
                    renderItem={(photo) => {
                      return (
                        <Pressable
                          onPress={() => {
                            console.log(2);
                          }}
                        >
                          <ImageBackground
                            style={styles.each_photo}
                            source={{ uri: photo.item.url }}
                            resizeMode={'cover'}
                          ></ImageBackground>
                        </Pressable>
                      );
                    }}
                    keyExtractor={(photo) => photo.picture_id}
                  />
                  <View style={styles.details}>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          marginVertical: 15,
                        }}
                        numberOfLines={1}
                      >
                        {item.item.title}
                      </Text>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        {renderStars}
                        <Text style={{ marginRight: 6 }}>
                          {item.item.reviews}
                        </Text>
                        <Text>reviews</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        borderRadius: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        style={{
                          borderRadius: 50,
                          height: 70,
                          width: 70,
                          margin: 20,
                        }}
                        source={{ uri: item.item.user.account.photo.url }}
                      ></Image>
                    </View>
                  </View>
                  <Text style={styles.price}>{item.item.price} €</Text>
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item._id}
        ></FlatList>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = {
  super_container: {
    backgroundColor: 'white',
    flex: 1,
    // height: 100,
  },
  appart_list: {
    backgroundColor: 'white',
    margin: 10,
  },
  appart: {
    backgroundColor: 'white',
    margin: 20,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  flatlist_photos: {
    backgroundColor: 'black',
    height: 300,
    width: '100%',
  },
  each_photo_touchableOpacity: {
    height: 300,
  },
  each_photo: {
    height: '100%',
    width: screenWidth - 60,
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'black',
    marginRight: 6,
  },
  details: {
    flexDirection: 'row',
  },
  price: {
    color: 'white',
    position: 'absolute',
    left: 0,
    backgroundColor: 'black',
    paddingVertical: 7,
    paddingHorizontal: 11,
    fontSize: 18,
  },
};
