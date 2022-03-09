import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/Profile";
import { ProfileStackParamList } from "../types/navigation";

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const Profiles = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export { Profiles };
