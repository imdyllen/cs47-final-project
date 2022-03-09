import {
  StyleSheet,
  TextProps,
  TouchableHighlightProps,
  View,
  ViewProps,
} from "react-native";

import Colors from "../constants/Colors";
import OrangeRingView from "./OrangeRingView";
import OrangeView from "./OrangeView";
import Text from "./Text";
import Touchable from "./Touchable";

export interface OrangeButtonProps extends TouchableHighlightProps {
  ring?: boolean;
  textContainerStyle?: ViewProps["style"];
  textStyle?: TextProps["style"];
  borderRadius?: number;
  disabled?: boolean;
  shadow?: boolean;
}

const OrangeButton: React.FC<OrangeButtonProps> = ({
  style,
  textContainerStyle,
  textStyle,
  children,
  ring,
  borderRadius,
  disabled,
  shadow,
  onPress,
}) => {
  const radius = borderRadius ?? 40;

  return (
    <Touchable
      style={[
        {
          borderRadius: radius,
        },
        shadow && styles.shadow,
        style,
        disabled && {
          opacity: 0.4,
        },
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      {ring ? (
        <OrangeRingView borderRadius={radius}>
          <View style={[styles.textContainer, textContainerStyle]}>
            <Text style={[styles.text, textStyle]}>{children}</Text>
          </View>
        </OrangeRingView>
      ) : (
        <OrangeView borderRadius={radius}>
          <View style={[styles.textContainer, textContainerStyle]}>
            <Text style={[styles.text, textStyle]}>{children}</Text>
          </View>
        </OrangeView>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontFamily: "semibold",
  },
  shadow: {
    shadowColor: Colors.bluegreen,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
  },
});

export default OrangeButton;
