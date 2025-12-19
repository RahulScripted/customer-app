import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';


const Header = ({setIsLoggedIn}: any) => {
  const [showModal, setShowModal] = useState(false);
  
  
  const handleLogout = () => {
    setShowModal(true);
  }

  const handleCancelLogout = () => {
    setShowModal(false);
  }

  const handleConfirmLogout = () => {
    setShowModal(false);
    setIsLoggedIn(false);
  }

  return (
    <View className="fixed top-0 left-0 w-full h-20 bg-[#03064D] z-50 px-4 py-3 flex-row justify-between items-center">
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
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {showModal && (
        <Modal transparent animationType="fade">
          <View className="flex-1 justify-center items-center bg-black/50" style={{ zIndex: 9999 }}>
            <View className="bg-white p-6 rounded-lg mx-4 w-80 relative">
              <TouchableOpacity 
                className="absolute -top-2 -right-2 bg-red-500 rounded-full w-7 h-7 flex items-center justify-center"
                onPress={handleCancelLogout}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
              <Image source={require('../../../assets/gif/sad.gif')} style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 16 }} />
              <Text className="text-sm mb-4">Are you sure you want to logout?</Text>
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
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}

export default Header