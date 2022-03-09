import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, ViewProps } from "react-native";

export interface BlueRingViewProps extends ViewProps {
  ringWidth?: number;
  borderRadius?: number;
}

const BlueRingView: React.FC<BlueRingViewProps> = ({
  style,
  ringWidth,
  borderRadius,
  children,
  ...restProps
}) => {
  return (
    <View style={[styles.container, { borderRadius }, style]} {...restProps}>
      <LinearGradient
        style={{ padding: ringWidth ?? 3 }}
        start={[0, 0]}
        end={[1, 1]}
        colors={["#5EC1E8", "#9AEAEF", "#5EC1E8"]}
      >
        <View
          style={[
            styles.innerContainer,
            borderRadius
              ? { borderRadius: (borderRadius * 17) / 20 }
              : undefined,
          ]}
        >
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    overflow: "hidden",
  },
  innerContainer: {
    backgroundColor: "white",
  },
});

export default BlueRingView;
