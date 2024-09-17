import React, {useEffect} from 'react';
import {
  Button,
  NativeModules,
  StyleSheet,
  Text,
  TouchableNativeFeedbackBase,
  TouchableOpacity,
  View,
} from 'react-native';
import BackgroundService from 'react-native-background-actions';

const {PopupModule} = NativeModules;

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 5000,
  },
};

const Popup = () => {
  useEffect(() => {}, []);

  // You can do anything in your task such as network requests, timers and so on,
  // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
  // React Native will go into "paused" mode (unless there are other tasks running,
  // or there is a foreground app).
  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(i, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', taskDataArguments);
        PopupModule.showPopup('Call from BackgroundService');
        await sleep(delay);
      }
    });
  };

  const handleStartService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
  };

  const handleStopService = async () => {
    await BackgroundService.stop();
  };

  const handleUpdateService = async () => {
    await BackgroundService.updateNotification({
      taskDesc: 'New ExampleTask description',
    });
  };

  const handleGoToOverlaySettings = async () => {
    PopupModule.redirectToOverlaySettings();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pop up like truecaller</Text>
      <TouchableOpacity
        onPress={() => {
          PopupModule.showPopup('Call from React Native');
        }}>
        <Text>Show Popup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleStartService}
        style={styles.startService}>
        <Text>Start Service</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleUpdateService}>
        <Text>Update Service</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleStopService} style={styles.stopService}>
        <Text>Stop Service</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleGoToOverlaySettings}
        style={styles.enableOverlaysettings}>
        <Text>Enable Overlay Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Popup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
  },
  heading: {
    fontSize: 24,
  },
  stopService: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
  },
  startService: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
  },
  enableOverlaysettings: {
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 5,
  },
});
