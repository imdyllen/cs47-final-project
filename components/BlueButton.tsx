import {
  StyleSheet,
  TextProps,
  TouchableHighlightProps,
  View,
  ViewProps,
} from "react-native";

import Colors from "../constants/Colors";
import BlueRingView from "./BlueRingView";
import BlueView from "./BlueView";
import Text from "./Text";
import Touchable from "./Touchable";

export interface BlueButtonProps extends TouchableHighlightProps {
  selected?: boolean;
  textContainerStyle?: ViewProps["style"];
  textStyle?: TextProps["style"];
  borderRadius?: number;
  shadow?: boolean;
}

const BlueButton: React.FC<BlueButtonProps> = ({
  style,
  textContainerStyle,
  textStyle,
  children,
  selected,
  borderRadius,
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
      ]}
      onPress={onPress}
    >
      {selected ? (
        <BlueView borderRadius={radius}>
          <View style={[styles.textContainer, textContainerStyle]}>
            <Text
              style={[
                styles.text,
                { color: "white", fontFamily: "semibold" },
                textStyle,
              ]}
            >
              {children}
            </Text>
          </View>
        </BlueView>
      ) : (
        <BlueRingView borderRadius={radius}>
          <View style={[styles.textContainer, textContainerStyle]}>
            <Text style={[styles.text, textStyle]}>{children}</Text>
          </View>
        </BlueRingView>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    minHeight: 42,
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
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

export default BlueButton;
