import { createStackNavigator } from "@react-navigation/stack";

import IconButton from "../components/IconButton";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import AgreementDetailScreen from "../screens/AgreementDetail";
import CommunityThreadScreen from "../screens/CommunityThread";
import PracticePreviewScreen from "../screens/PracticePreview";
import PracticeQuestionScreen from "../screens/PracticeQuestion";
import PracticeReviewScreen from "../screens/PracticeReview";
import SearchScreen from "../screens/Search";
import { SearchStackParamList } from "../types/navigation";

const SearchStack = createStackNavigator<SearchStackParamList>();

const Searches = () => {
  return (
    <SearchStack.Navigator
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
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="CommunityThread"
        component={CommunityThreadScreen}
        options={{
          title: "Thread",
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              name="chevron-left"
              size={36}
              color={Colors.bluegreen}
            />
          ),
        }}
      />
      <SearchStack.Screen
        name="AgreementDetail"
        component={AgreementDetailScreen}
        options={{
          title: "Our Agreement",
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              name="chevron-left"
              size={36}
              color={Colors.bluegreen}
            />
          ),
        }}
      />
      <SearchStack.Screen
        name="PracticePreview"
        component={PracticePreviewScreen}
        options={({ route }) => ({
          title: route.params.topic,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              name="chevron-left"
              size={36}
              color={Colors.bluegreen}
            />
          ),
        })}
      />
      <SearchStack.Screen
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
              size={30}
              color={Colors.bluegreen}
            />
          ),
        })}
      />
      <SearchStack.Screen
        name="PracticeReview"
        component={PracticeReviewScreen}
        options={({ route }) => ({
          title: route.params.topic,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              name="chevron-left"
              size={36}
              color={Colors.bluegreen}
            />
          ),
        })}
      />
    </SearchStack.Navigator>
  );
};

export { Searches };
