import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInUp, FadeInDown, BounceIn } from 'react-native-reanimated';

const Home = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Animated.View entering={BounceIn.delay(200).duration(800)}>
        <Animated.Text 
          entering={FadeInUp.delay(400).duration(600)}
          className="text-3xl font-bold text-blue-600 mb-4"
        >
          Welcome Home!
        </Animated.Text>
      </Animated.View>
      <Animated.Text 
        entering={FadeInDown.delay(600).duration(600)}
        className="text-lg text-gray-600"
      >
        Your dashboard awaits
      </Animated.Text>
    </View>
  );
};

export default Home;