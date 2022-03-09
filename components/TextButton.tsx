import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Text from "./Text";

export interface TextButtonProps extends React.ComponentProps<typeof Text> {
  onPress?: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({
  children,
  onPress,
  ...props
}) => (
  <TouchableOpacity activeOpacity={0.5} onPress={onPress} {...props}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    color: Colors.bluegreen,
    fontSize: FontSize.emphasis,
  },
});

export default TextButton;
