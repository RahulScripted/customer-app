import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const [showMorePopup, setShowMorePopup] = useState(false);

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
    } else {
      onTabChange(tabId);
    }
  };

  const handleMoreOptionPress = (optionId: string) => {
    setShowMorePopup(false);
    onTabChange(optionId);
  };

  return (
    <>
      <View className="flex-row bg-white border-t border-gray-200 h-16">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            className="flex-1 justify-center items-center"
            onPress={() => handleTabPress(tab.id)}
          >
            <Ionicons 
              name={tab.icon} 
              size={24} 
              color={activeTab === tab.id ? '#7c3aed' : '#6b7280'} 
            />
            <Text className={`text-xs mt-1 ${activeTab === tab.id ? 'text-violet-800' : 'text-gray-500'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={showMorePopup}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMorePopup(false)}
      >
        <Pressable 
          className="flex-1 justify-end bg-black/50"
          onPress={() => setShowMorePopup(false)}
        >
          <View className="bg-white rounded-t-3xl p-6">
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
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default TabNavigation;