import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {screens} from '../RouteItems';

const Stack = createStackNavigator();

const Landscape = () => {
  const [landscapeImages, getLandscapeImages] = useState([]);
  useEffect(async () => {
    var landscapeImage = await AsyncStorage.getItem('Landscape');
    landscapeImage = JSON.parse(landscapeImage);
    console.log('Landscape: ', landscapeImage)
    getLandscapeImages(landscapeImage);
    // Alert.alert('useEffect Called Once Only....');
    console.log('Images:  ', images);
  }, [] );
  if (landscapeImages === null) {
    return (
      <View>
        <Text>No images to display</Text>
      </View>
    )
  }
  return landscapeImages.map((image, i) => {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>{image + i}</Text>
          <Image source={{uri: image}} style={styles.imageStyle} />
        </View>
      )
  })
};

const LandscapeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screens.Landscape} component={Landscape} />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
export default LandscapeStackNavigator;
