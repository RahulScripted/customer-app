import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import ListOffer from "./components";

const Offers = () => {
  return (
    <View className="w-full p-3 flex flex-col">
      <View className="flex-row">
        <Ionicons name="gift-outline" size={24} className="mr-2" />
        <Text className="text-lg font-semibold text-gray-800">Loan Offers</Text>
      </View>

      {/* Image */}
      <Image
        source={require("../../../assets/images/offers.png")}
        style={{ width: "100%", height: 200 }}
        resizeMode="contain"
        className="-mt-7 -mb-5"
      />

      <ListOffer />
    </View>
  );
};

export default Offers;
