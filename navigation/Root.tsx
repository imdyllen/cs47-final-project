import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import IconButton from "../components/IconButton";
import TextButton from "../components/TextButton";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import AgreementDetailScreen from "../screens/AgreementDetail";
import AgreementSettingsScreen from "../screens/AgreementSettings";
import CommunityThreadScreen from "../screens/CommunityThread";
import FilterScreen from "../screens/Filter";
import NewPostScreen from "../screens/NewPost";
import PracticePreviewScreen from "../screens/PracticePreview";
import PracticeQuestionScreen from "../screens/PracticeQuestion";
import PracticeReviewScreen from "../screens/PracticeReview";
import { RootStackParamList } from "../types/navigation";
import { Agreements } from "./Agreement";
import { Profiles } from "./Profile";
import { Searches } from "./Search";
import { Tabs } from "./Tab";

const RootStack = createStackNavigator<RootStackParamList>();

const iconSize = 30;

function Root() {
  const navigation = useNavigation();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerTintColor: Colors.bluegreen,
        headerTitleStyle: {
          fontFamily: "medium",
          fontSize: FontSize.emphasis,
          color: Colors.darkgreen,
        },
        headerStyle: {
          shadowColor: "rgba(190, 190, 190, 0.5)",
          shadowRadius: 20,
        },
      }}
    >
      <RootStack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SearchStack"
        component={Searches}
        options={{ headerShown: false, presentation: "modal" }}
      />
      <RootStack.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          title: "Filters",
          presentation: "modal",
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 20,
              }}
              onPress={navigation.goBack}
              name="close"
              size={iconSize}
              color={Colors.bluegreen}
            />
          ),
          headerRight: () => (
            <TextButton
              style={{
                marginRight: 20,
              }}
            >
              Save
            </TextButton>
          ),
        }}
      />
      <RootStack.Screen
        name="NewPost"
        component={NewPostScreen}
        options={{
          title: "New Post",
          presentation: "modal",
          gestureEnabled: false,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 20,
              }}
              name="close"
              size={iconSize}
              color={Colors.bluegreen}
            />
          ),
        }}
      />
      <RootStack.Screen
        name="CommunityThread"
        component={CommunityThreadScreen}
        options={{
          title: "Thread",
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              onPress={navigation.goBack}
              name="chevron-left"
              size={iconSize + 6}
              color={Colors.bluegreen}
            />
          ),
        }}
      />
      <RootStack.Screen
        name="PracticePreview"
        component={PracticePreviewScreen}
        options={({ route }) => ({
          title: route.params.topic,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              onPress={navigation.goBack}
              name="chevron-left"
              size={iconSize + 6}
              color={Colors.bluegreen}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="PracticeQuestion"
        component={PracticeQuestionScreen}
        options={({ route }) => ({
          title: route.params.topic,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              name="close"
              size={iconSize}
              color={Colors.bluegreen}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="PracticeReview"
        component={PracticeReviewScreen}
        options={({ route }) => ({
          title: route.params.topic,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              onPress={navigation.goBack}
              name="chevron-left"
              size={iconSize + 6}
              color={Colors.bluegreen}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="AgreementDetail"
        component={AgreementDetailScreen}
        options={{
          title: "Our Agreement",
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              onPress={navigation.goBack}
              name="chevron-left"
              size={iconSize + 6}
              color={Colors.bluegreen}
            />
          ),
        }}
      />
      <RootStack.Screen
        name="AgreementStack"
        component={Agreements}
        options={{
          presentation: "modal",
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="AgreementSettings"
        component={AgreementSettingsScreen}
        options={{
          title: "Resolution Settings",
          presentation: "modal",
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 20,
              }}
              onPress={navigation.goBack}
              name="close"
              size={iconSize}
              color={Colors.bluegreen}
            />
          ),
          headerRight: () => (
            <TextButton
              style={{
                marginRight: 20,
              }}
            >
              Save
            </TextButton>
          ),
        }}
      />
      <RootStack.Screen
        name="ProfileStack"
        component={Profiles}
        options={{
          presentation: "modal",
          title: "My Profile",
          gestureEnabled: false,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              name="close"
              onPress={() => navigation.navigate("Tabs")}
              size={iconSize}
              color={Colors.bluegreen}
            />
          ),
        }}
      />
    </RootStack.Navigator>
  );
}

export { Root };
