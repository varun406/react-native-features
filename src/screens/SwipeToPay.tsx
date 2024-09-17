import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');

const SCREEN_WIDTH = width - 20;

const SwipeToPay = () => {
  const translateX = useSharedValue<number>(-20);
  const previousTranslateX = useSharedValue<number>(0);
  const pan = Gesture.Pan()
    .onStart(() => {
      previousTranslateX.value = translateX.value;
    })
    .onUpdate(event => {
      const maxTranslateX = SCREEN_WIDTH * 0.15;
      console.log(SCREEN_WIDTH - 60);
      if (event.translationX >= 0 && event.translationX <= SCREEN_WIDTH - 80) {
        console.log('CHANGE', event.translationX);
        translateX.value = previousTranslateX.value + event.translationX;
      }
    })
    .onFinalize(event => {
      //   translateX.value = previousTranslateX.value + event.translationX;
      translateX.value = withTiming(-20);
    });

  const swipeStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.swipeContainer}>
        <GestureHandlerRootView style={styles.container}>
          <Animated.View style={[styles.swipeContainer]}>
            <GestureDetector gesture={pan}>
              <Animated.View style={[swipeStyle, styles.swipeBtn]} />
            </GestureDetector>
          </Animated.View>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

export default SwipeToPay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  swipeContainer: {
    height: 100,
    backgroundColor: 'pink',
  },
  swipeBtn: {
    width: 60,
    height: 100,
    backgroundColor: 'orange',
  },
});
