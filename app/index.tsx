import { useState } from "react";
import { Text, View } from "react-native";
import TabNavigation from "./components/TabNavigation";
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
      case 'help':
        return <View className="flex-1 justify-center items-center"><Text className="text-lg">Help</Text></View>;
      default:
        return <Home />;
    }
  };

  if (!isLoggedIn) {
    return <LogInPage />;
  }

  return (
    <View className="flex-1">
      <Header setIsLoggedIn={setIsLoggedIn} />
      <View className="flex-1 pt-16">
        {renderPage()}
      </View>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}
