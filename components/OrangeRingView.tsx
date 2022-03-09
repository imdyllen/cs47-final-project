import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, ViewProps } from "react-native";

export interface OrangeRingViewProps extends ViewProps {
  ringWidth?: number;
  borderRadius?: number;
}

const OrangeRingView: React.FC<OrangeRingViewProps> = ({
  style,
  ringWidth,
  borderRadius,
  children,
  ...restProps
}) => {
  return (
    <View style={[styles.container, style, { borderRadius }]} {...restProps}>
      <LinearGradient
        start={[0, 0]}
        end={[1, 1]}
        colors={["#FF6954", "#F58D7F", "#FFA37B", "#FF6954"]}
      >
        <View
          style={[
            styles.innerContainer,
            { borderRadius, borderWidth: ringWidth ?? 4 },
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
    overflow: "hidden",
  },
  innerContainer: {
    borderColor: "rgba(255, 255, 255, 0.7)",
  },
});

export default OrangeRingView;
