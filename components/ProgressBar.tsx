import { StyleSheet, View, ViewProps } from "react-native";

import Colors from "../constants/Colors";

export interface ProgressBarProps extends ViewProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ style, progress }) => {
  return (
    <View style={[styles.background, style]}>
      <View style={[styles.tick, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    borderRadius: 6,
    height: 12,
  },
  tick: {
    borderRadius: 6,
    backgroundColor: Colors.orange,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
});

export default ProgressBar;
