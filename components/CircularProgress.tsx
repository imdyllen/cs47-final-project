import { StyleSheet, View } from "react-native";
import {
  AnimatedCircularProgress,
  AnimatedCircularProgressProps,
} from "react-native-circular-progress";

import FontSize from "../constants/FontSize";
import Text from "./Text";

export interface CircularProgressProps
  extends Partial<AnimatedCircularProgressProps> {
  progress: number;
  big?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  big,
  ...restProps
}) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={big ? 80 : 60}
        width={7}
        backgroundWidth={3}
        fill={progress}
        tintColor="#FFA37B"
        tintColorSecondary="#FF6954"
        backgroundColor="white"
        rotation={180}
        lineCap="round"
        {...restProps}
      />
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: "semibold",
            fontSize: big ? FontSize.header : FontSize.normal,
          }}
        >
          {progress}
        </Text>
        <Text style={{ fontSize: FontSize.caption, marginTop: big ? 6 : 1 }}>
          %
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CircularProgress;
