import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';


const Header = ({setIsLoggedIn}: any) => {
  const [showModal, setShowModal] = useState(false);
  const modalScale = useSharedValue(0);
  const modalOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }]
  }));

  const modalBackdropStyle = useAnimatedStyle(() => ({
    opacity: modalOpacity.value
  }));

  const modalContentStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: modalScale.value },
      { 
        translateY: interpolate(
          modalScale.value,
          [0, 1],
          [50, 0]
        )
      }
    ]
  }));
  
  
  const handleLogout = () => {
    setShowModal(true);
    modalScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    modalOpacity.value = withTiming(1, { duration: 200 });
  }

  const handleCancelLogout = () => {
    modalScale.value = withSpring(0, { damping: 15, stiffness: 150 });
    modalOpacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(setShowModal)(false);
    });
  }

  const handleConfirmLogout = () => {
    modalScale.value = withSpring(0, { damping: 15, stiffness: 150 });
    modalOpacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(() => {
        setShowModal(false);
        setIsLoggedIn(false);
      })();
    });
  }

  return (
    <View className="absolute top-0 left-0 w-full h-20 bg-[#03064D] z-50 px-4 py-3 flex-row justify-between items-center" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
      <TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Mintifi</Text>
      </TouchableOpacity>
      <View className="flex-row items-center gap-6">
        <TouchableOpacity>
          <Ionicons name="globe-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleLogout}
          onPressIn={() => buttonScale.value = withSpring(0.9)}
          onPressOut={() => buttonScale.value = withSpring(1)}
        >
          <Animated.View style={buttonAnimatedStyle}>
            <Ionicons name="log-out-outline" size={28} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {showModal && (
        <Modal transparent animationType="none">
          <Animated.View 
            className="flex-1 justify-center items-center bg-black/50" 
            style={[
              { zIndex: 9999 },
              modalBackdropStyle
            ]}
          >
            <Animated.View 
              className="bg-white p-6 rounded-lg mx-4 w-80 relative"
              style={modalContentStyle}
            >
              <TouchableOpacity 
                className="absolute -top-2 -right-2 bg-red-500 rounded-full w-7 h-7 flex items-center justify-center"
                onPress={handleCancelLogout}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
              <Image source={require('../../../assets/gif/sad.gif')} style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 16 }} />
              <Text className="text-base font-medium text-center mb-4">Are you sure you want to logout?</Text>
              <View className="flex-row justify-between" style={{ gap: 12 }}>
                <TouchableOpacity 
                  className="flex-1 bg-gray-200 py-3 rounded"
                  onPress={handleCancelLogout}
                >
                  <Text className="text-center font-medium">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="flex-1 bg-red-500 py-3 rounded"
                  onPress={handleConfirmLogout}
                >
                  <Text className="text-center font-medium text-white">Confirm</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </Modal>
      )}
    </View>
  )
}

export default Header