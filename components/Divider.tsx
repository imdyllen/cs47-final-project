import { StyleSheet, View, ViewProps } from "react-native";

const Divider: React.FC<ViewProps> = ({ style, ...restProps }) => {
  return <View style={[styles.divider, style]} {...restProps} />;
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#61D3D1",
  },
});

export default Divider;
