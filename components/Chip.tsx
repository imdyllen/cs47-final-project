import { StyleSheet, TouchableHighlightProps, View } from "react-native";

import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import BlueRingView from "./BlueRingView";
import BlueView from "./BlueView";
import Text from "./Text";
import Touchable from "./Touchable";

export interface ChipProps extends TouchableHighlightProps {
  selected?: boolean;
  plain?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  style,
  children,
  selected,
  plain,
  ...restProps
}) => {
  const text = (
    <Text
      style={[
        styles.text,
        selected && { color: "white", fontFamily: "semibold" },
      ]}
    >
      {children}
    </Text>
  );

  return (
    <Touchable style={[styles.container, style]} {...restProps}>
      {plain ? (
        <View style={styles.plainView}>{text}</View>
      ) : selected ? (
        <BlueView borderRadius={30} ringWidth={2}>
          {text}
        </BlueView>
      ) : (
        <BlueRingView borderRadius={30} ringWidth={2}>
          {text}
        </BlueRingView>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
  },
  plainView: {
    borderRadius: 30,
    backgroundColor: Colors.blue,
  },
  text: {
    color: Colors.greengrey,
    fontSize: FontSize.caption,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
});

export default Chip;
