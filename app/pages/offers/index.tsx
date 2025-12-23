import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import ListOffer from "./components";

const Offers = () => {
  return (
    <View className="flex-1 p-3">
      <View className="flex-row mb-4">
        <Ionicons name="gift-outline" size={24} className="mr-2" />
        <Text className="text-lg font-semibold text-gray-800">Loan Offers</Text>
      </View>

      <ListOffer />
    </View>
  );
};

export default Offers;
