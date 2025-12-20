import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import Animated, {
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const offers = [
  {
    id: 1,
    heading: 'Quick Loan Renewal',
    description: 'Continue Your Growth Journey',
    link: '/renewal',
    icon: 'gift-outline',
    gradient: ['#6366F1', '#8B5CF6'],
  },
  {
    id: 2,
    heading: 'Adhoc Limit Request',
    description: 'Instant Top-up. More Limit',
    link: '/adhoc',
    icon: 'flash-outline',
    gradient: ['#10B981', '#22C55E'],
  },
  {
    id: 3,
    heading: 'New Term Loan',
    description: 'Fresh Finance. Flexible Terms',
    link: '/term-loan',
    icon: 'speedometer-outline',
    gradient: ['#F97316', '#FB923C'],
  },
];

export default function ListOffer() {
  const router = useRouter();

  return (
    <View className="px-4 pt-6">
      {offers.map((item, index) => (
        <OfferCard
          key={item.id}
          item={item}
          index={index}
          onPress={() => router.push(item.link as any)}
        />
      ))}
    </View>
  );
}

function OfferCard({ item, index, onPress }: any) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 120).springify()}
      className="mb-5"
    >
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.96);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={onPress}
      >
        <Animated.View
          style={animatedStyle}
          className="rounded-3xl overflow-hidden shadow-xl shadow-black/20"
        >
          <LinearGradient
            colors={item.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-5"
          >
            <View className="flex-row items-center">
              {/* Icon */}
              <View className="w-14 h-14 rounded-2xl bg-white/20 items-center justify-center mr-4">
                <Ionicons
                  name={item.icon}
                  size={26}
                  color="white"
                />
              </View>

              {/* Text */}
              <View className="flex-1">
                <Text className="text-white text-base font-bold">
                  {item.heading}
                </Text>
                <Text className="text-white/80 text-sm mt-1">
                  {item.description}
                </Text>
              </View>

              {/* Arrow */}
              <Ionicons
                name="chevron-forward"
                size={22}
                color="white"
              />
            </View>
          </LinearGradient>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
