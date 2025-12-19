import { useState } from "react";
import { Text, View } from "react-native";
import Verified from "./verified";

const SignUp = () => {
  const [isUserVerified, setIsUserVerified] = useState(false);
  return isUserVerified ? (
    <Verified />
  ) : (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg">Signup</Text>
    </View>
  );
};

export default SignUp;
