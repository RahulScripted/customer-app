import { useState } from "react";
import { View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import TabNavigation from "./components/tabs/TabNavigation";
import "./global.css";
import DemoVideos from "./pages/demo_videos";
import Documents from "./pages/documents";
import Header from "./pages/header";
import Support from "./pages/helps_support";
import History from "./pages/history";
import Home from "./pages/home/home";
import Invoices from "./pages/invoices";
import LogInPage from "./pages/login";
import Offers from "./pages/offers";
import Payment from "./pages/repayment";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const pageOpacity = useSharedValue(1);
  const pageTranslateX = useSharedValue(0);

  const pageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: pageOpacity.value,
    transform: [{ translateX: pageTranslateX.value }]
  }));

  const handleTabChange = (newTab: string) => {
    if (newTab !== activeTab) {
      pageOpacity.value = withTiming(0, { duration: 150 }, () => {
        pageOpacity.value = withTiming(1, { duration: 150 });
      });
      pageTranslateX.value = withTiming(20, { duration: 150 }, () => {
        pageTranslateX.value = withTiming(0, { duration: 150 });
      });
      setActiveTab(newTab);
    }
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'invoices':
        return <Invoices />;
      case 'payment':
        return <Payment />;
      case 'support':
        return <Support />;
      case 'documents':
        return <Documents />;
      case 'history':
        return <History />;
      case 'offers':
        return <Offers />;
      case 'demo_videos':
        return <DemoVideos />;
      case 'help_support':
        return <Support />;
      default:
        return <Home />;
    }
  };

  if (!isLoggedIn) {
    return (
      <Animated.View 
        entering={FadeIn.duration(300)} 
        exiting={FadeOut.duration(300)}
        className="flex-1"
      >
        <LogInPage />
      </Animated.View>
    );
  }

  return (
    <View className="flex-1">
      <Header setIsLoggedIn={setIsLoggedIn} />
      <Animated.View 
        className="flex-1 pt-20"
        style={pageAnimatedStyle}
      >
        {renderPage()}
      </Animated.View>
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  );
}
