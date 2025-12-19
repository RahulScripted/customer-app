import { useState } from "react";
import { Text, View } from "react-native";
import ForgotPassword from "./forgotPassword";

const LogIn = () => {
  const [isUserForgotPassword, setIsUserForgotPassword] = useState(false);
  return isUserForgotPassword ? (
    <ForgotPassword />
  ) : (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg">Login</Text>
    </View>
  );
};

export default LogIn;
