import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid, } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {screens} from '../RouteItems';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();


const Home = () => {
  const [filePath, setFilePath] = useState({});
  this.ActionSheet = null;

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
};

const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else {
    return true;
  }
};
const _showActionSheet = () => {
  this.ActionSheet.show();
};

const saveImage = () => {
  _showActionSheet();
};

const captureImage = async type => {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    videoQuality: 'low',
    durationLimit: 30, //Video max duration in seconds
    saveToPhotos: true,
  };
  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();
  if (isCameraPermitted && isStoragePermitted) {
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      // console.log('base64 -> ', response.assets[0].base64);
      // console.log('uri -> ', response.assets[0].uri);
      // console.log('width -> ', response.assets[0].width);
      // console.log('height -> ', response.assets[0].height);
      // console.log('fileSize -> ', response.assets[0].fileSize);
      // console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      setFilePath(response);
    });
  }
};

const chooseFile = async type => {
  let options2 = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
  };
  launchImageLibrary(options2, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      alert('User cancelled camera picker');
      return;
    } else if (response.errorCode == 'camera_unavailable') {
      alert('Camera not available on device');
      return;
    } else if (response.errorCode == 'permission') {
      alert('Permission not satisfied');
      return;
    } else if (response.errorCode == 'others') {
      alert(response.errorMessage);
      return;
    }
    // console.log('base64 -> ', response.assets[0].base64);
    // console.log('uri -> ', response.assets[0].uri);
    // console.log('width -> ', response.assets[0].width);
    // console.log('height -> ', response.assets[0].height);
    // console.log('fileSize -> ', response.assets[0].fileSize);
    // console.log('type -> ', response.assets[0].type);
    console.log('fileName -> ', response.assets[0].fileName);
    setFilePath(response.assets[0]);
  });
  
 
};

const saveInLandscape = async filePath1 => {
  try {
    var landscapeImage = [filePath1];
    var landscapeImages = await AsyncStorage.getItem('Landscape');
    landscapeImages = JSON.parse(landscapeImages);
    console.log('before -->  ', landscapeImages);
    if(landscapeImages === null) {
      await AsyncStorage.setItem('Landscape', JSON.stringify(landscapeImage));
    } else {
      landscapeImages.push(filePath1);
      await AsyncStorage.setItem('Landscape', JSON.stringify(landscapeImages));
    }
    var landscapeImages = await AsyncStorage.getItem('Landscape');
    landscapeImages = JSON.parse(landscapeImages);
    console.log('-->  ', landscapeImages);
  } catch (e) {
    console.log(e);
  }
};

const saveInPortrait = async filePath2 => {
  console.log('portrait');
  try {
    var portraitImage = [filePath2];
    var portraitImages = await AsyncStorage.getItem('Portrait');
    portraitImages = JSON.parse(portraitImages);
    console.log('before -->  ', portraitImages);
    if(portraitImages === null) {
      await AsyncStorage.setItem('Portrait', JSON.stringify(portraitImage));
    } else {
      portraitImages.push(filePath2);
      await AsyncStorage.setItem('Portrait', JSON.stringify(portraitImages));
    }
    var portraitImages = await AsyncStorage.getItem('Portrait');
    portraitImages = JSON.parse(portraitImages);
    console.log('-->  ', portraitImages);
  } catch (e) {
    console.log(e);
  }
};

const handleReceiptOptionsSelection = (index, file) => {
  console.log(' ----**   ',file);
  if (index === 0) {
    // navigation.navigate('Portrait');
    saveInPortrait(file);
  } else if (index === 1) {
    // navigation.navigate('Landscape');
    saveInLandscape(file);
  }
};
return (
  <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
        {Object.keys(filePath).length !== 0 ? (
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => {
              saveImage(filePath.uri.toString())
            }}>
            <Text style={styles.textStyle}>Save Image</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>Launch Camera for Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        <ActionSheet
          ref={actionSheetref => (this.ActionSheet = actionSheetref)}
          options={['Portrait', 'Landscape', 'Cancel']}
          cancelButtonIndex={2}
          styles={styles.actionSheetStyle}
          onPress={index => {
            handleReceiptOptionsSelection(index, filePath.uri);
          }}
        />
      </View>
    </SafeAreaView>
  )};

const HomeStackNavigator = () => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screens.Home} component={Home} />
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

export default HomeStackNavigator;
