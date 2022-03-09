import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, ViewProps } from "react-native";

export interface OrangeViewProps extends ViewProps {
  borderRadius?: number;
}

const OrangeView: React.FC<OrangeViewProps> = ({
  style,
  children,
  borderRadius,
  ...restProps
}) => {
  return (
    <View style={[styles.container, { borderRadius }, style]} {...restProps}>
      <LinearGradient
        start={[0, 0]}
        end={[1, 1]}
        colors={["#FF6954", "#FFA37B"]}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    overflow: "hidden",
  },
});

export default OrangeView;
