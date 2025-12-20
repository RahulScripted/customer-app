import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  runOnJS
} from 'react-native-reanimated';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const [showMorePopup, setShowMorePopup] = useState(false);
  const tabScales = {
    home: useSharedValue(1),
    invoices: useSharedValue(1),
    payment: useSharedValue(1),
    more: useSharedValue(1)
  };
  const modalTranslateY = useSharedValue(300);
  const modalOpacity = useSharedValue(0);

  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' as keyof typeof Ionicons.glyphMap },
    { id: 'invoices', label: 'Invoice', icon: 'document-text' as keyof typeof Ionicons.glyphMap },
    { id: 'payment', label: 'Payments', icon: 'card' as keyof typeof Ionicons.glyphMap },
    { id: 'more', label: 'More', icon: 'ellipsis-horizontal' as keyof typeof Ionicons.glyphMap },
  ];

  const moreOptionsSections = [
    {
      heading: 'Loan Offers',
      options: [
        { id: 'offers', label: 'Offers', icon: 'gift' as keyof typeof Ionicons.glyphMap },
      ]
    },
    {
      heading: 'Statements & Docs',
      options: [
        { id: 'documents', label: 'Documents', icon: 'folder' as keyof typeof Ionicons.glyphMap },
        { id: 'history', label: 'Repayment History', icon: 'time' as keyof typeof Ionicons.glyphMap },
      ]
    },
    {
      heading: 'Support & Requests',
      options: [
        { id: 'help_support', label: 'Help & Support', icon: 'help-circle' as keyof typeof Ionicons.glyphMap },
        { id: 'demo_videos', label: 'Demo Videos', icon: 'videocam' as keyof typeof Ionicons.glyphMap },
      ]
    },
  ];

  const handleTabPress = (tabId: string) => {
    if (tabId === 'more') {
      setShowMorePopup(true);
      modalTranslateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      modalOpacity.value = withTiming(1, { duration: 200 });
    } else {
      onTabChange(tabId);
    }
  };

  const handleMoreOptionPress = (optionId: string) => {
    modalTranslateY.value = withSpring(300, { damping: 15, stiffness: 150 });
    modalOpacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(() => {
        setShowMorePopup(false);
        onTabChange(optionId);
      })();
    });
  };

  const closeModal = () => {
    modalTranslateY.value = withSpring(300, { damping: 15, stiffness: 150 });
    modalOpacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(setShowMorePopup)(false);
    });
  };

  return (
    <>
      <View className="flex-row bg-white border-t border-gray-200 h-16">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            className="flex-1 justify-center items-center"
            onPress={() => handleTabPress(tab.id)}
            onPressIn={() => tabScales[tab.id as keyof typeof tabScales].value = withSpring(0.9)}
            onPressOut={() => tabScales[tab.id as keyof typeof tabScales].value = withSpring(1)}
          >
            <Animated.View 
              style={useAnimatedStyle(() => ({
                transform: [{ scale: tabScales[tab.id as keyof typeof tabScales].value }]
              }))}
            >
              <Ionicons 
                name={tab.icon} 
                size={24} 
                color={activeTab === tab.id ? '#7c3aed' : '#6b7280'} 
              />
              <Text className={`text-xs mt-1 ${activeTab === tab.id ? 'text-violet-800' : 'text-gray-500'}`}>
                {tab.label}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={showMorePopup}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <Pressable 
          className="flex-1 justify-end"
          onPress={closeModal}
        >
          <Animated.View 
            className="flex-1 bg-black/50"
            style={useAnimatedStyle(() => ({
              opacity: modalOpacity.value
            }))}
          />
          <Animated.View 
            className="bg-white rounded-t-3xl p-6"
            style={useAnimatedStyle(() => ({
              transform: [{ translateY: modalTranslateY.value }]
            }))}
          >
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />
            <Text className="text-lg font-semibold mb-4">More Options</Text>
            {moreOptionsSections.map((section, sectionIndex) => (
              <View key={sectionIndex}>
                <Text className="text-sm text-gray-400 mt-3">{section.heading}</Text>
                <View className="flex-row flex-wrap">
                  {section.options.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      className="w-1/2 items-start py-4"
                      onPress={() => handleMoreOptionPress(option.id)}
                    >
                      <Ionicons name={option.icon} size={28} color={activeTab === option.id ? '#7c3aed' : '#374151'} />
                      <Text className={`text-sm mt-2 text-center ${activeTab === option.id ? 'text-violet-800' : 'text-gray-700'}`}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
};

export default TabNavigation;