import { createStackNavigator } from "@react-navigation/stack";

import IconButton from "../components/IconButton";
import Colors from "../constants/Colors";
import NewAgreementScreen from "../screens/NewAgreement";
import { AgreementStackParamList } from "../types/navigation";

const AgreementStack = createStackNavigator<AgreementStackParamList>();

const Agreements = () => {
  return (
    <AgreementStack.Navigator>
      <AgreementStack.Screen
        name="NewAgreement"
        component={NewAgreementScreen}
        initialParams={{
          step: 0,
          selectedPeople: [null, null],
        }}
        options={{
          title: "New Agreement",
          headerTransparent: true,
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
        }}
      />
    </AgreementStack.Navigator>
  );
};

export { Agreements };
