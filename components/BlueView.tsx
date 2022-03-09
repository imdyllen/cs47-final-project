import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, ViewProps } from "react-native";

export interface BlueViewProps extends ViewProps {
  ringWidth?: number;
  borderRadius?: number;
}

const BlueView: React.FC<BlueViewProps> = ({
  borderRadius,
  style,
  children,
  ringWidth,
  ...restProps
}) => {
  return (
    <View style={[styles.container, { borderRadius }, style]} {...restProps}>
      <LinearGradient
        style={{
          paddingVertical: ringWidth ?? 3,
          paddingHorizontal: (ringWidth ?? 3) / 4,
        }}
        start={[0, 0]}
        end={[1, 1]}
        colors={["#61D3D1", "#5EC1E8"]}
      >
        <View style={[{ borderRadius }]}>{children}</View>
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

export default BlueView;
