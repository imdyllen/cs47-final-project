import { Text as RNText, TextProps, StyleSheet } from "react-native";

import FontSize from "../constants/FontSize";

const Text: React.FC<TextProps> = ({ style, ...restProps }) => {
  return <RNText style={[styles.text, style]} {...restProps} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "regular",
    fontSize: FontSize.normal,
  },
});

export default Text;
