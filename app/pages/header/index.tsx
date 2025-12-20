import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Logout from '../../components/logout/logout';

const Header = ({setIsLoggedIn}: any) => {
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
        <Logout onLogout={() => setIsLoggedIn(false)} />
      </View>
    </View>
  )
}

export default Header