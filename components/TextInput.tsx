import { forwardRef } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";

import FontSize from "../constants/FontSize";

const TextInput: React.FC<
  TextInputProps & { innerRef: React.ForwardedRef<RNTextInput> }
> = ({ style, innerRef, ...restProps }) => {
  return (
    <RNTextInput ref={innerRef} style={[styles.text, style]} {...restProps} />
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "regular",
    fontSize: FontSize.normal,
  },
});

export default forwardRef<RNTextInput, TextInputProps>((props, ref) => (
  <TextInput innerRef={ref} {...props} />
));
