import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import Colors from "../constants/Colors";
import OrangeRadialBackground from "./OrangeRadialBackground";
import Touchable from "./Touchable";

export interface FloatingActionButtonProps extends ViewProps {
  name: ComponentProps<typeof MaterialCommunityIcons>["name"];
  disabled?: boolean;
  onPress?: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  style,
  name,
  disabled,
  onPress,
  ...restProps
}) => {
  return (
    <Touchable
      style={[
        styles.container,
        style,
        disabled && {
          opacity: 0.4,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
      {...restProps}
    >
      <View style={styles.view}>
        <OrangeRadialBackground style={{ position: "absolute" }} size={66} />
        <MaterialCommunityIcons name={name} color="white" size={54} />
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    width: 66,
    height: 66,
    borderRadius: 33,
    shadowColor: Colors.bluegreen,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingActionButton;
