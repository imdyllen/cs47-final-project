import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import CommunityScreen from "../screens/Community";
import ConflictResolutionScreen from "../screens/ConflictResolution";
import PracticeScreen from "../screens/Practice";
import { TabParamList } from "../types/navigation";

const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: "#8E8E8F",
        tabBarStyle: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderTopColor: "transparent",
          position: "absolute",
          height: insets.bottom === 0 ? 50 : 84,
          shadowColor: "rgb(130, 130, 130)",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.15,
          shadowRadius: 100,
        },
        tabBarLabelStyle: {
          fontFamily: "medium",
          fontSize: 12,
        },
        headerStyle: {
          shadowColor: "rgba(190, 190, 190, 0.5)",
          shadowRadius: 20,
        },
        headerTitleStyle: {
          fontFamily: "medium",
          fontSize: FontSize.emphasis,
          color: Colors.darkgreen,
        },
      }}
    >
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          title: "Community",
          headerTitle: "nurtue",
          headerTitleStyle: {
            fontFamily: "Hero Bold",
            fontSize: 27,
            color: Colors.green,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: FontSize.title + 2, height: FontSize.title + 2 }}
              source={
                focused
                  ? require("../assets/images/community-icon-colored.png")
                  : require("../assets/images/community-icon.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="ConflictResolution"
        component={ConflictResolutionScreen}
        options={{
          title: "Conflict Resolution",
          headerTitle: "Agreement History",
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: FontSize.title, height: FontSize.title }}
              source={
                focused
                  ? require("../assets/images/conflict-resolution-icon-colored.png")
                  : require("../assets/images/conflict-resolution-icon.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          title: "Practice",
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: FontSize.title - 2, height: FontSize.title - 2 }}
              source={
                focused
                  ? require("../assets/images/practice-icon-colored.png")
                  : require("../assets/images/practice-icon.png")
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export { Tabs };
