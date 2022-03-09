import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableHighlightProps } from "react-native";

import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { Practice } from "../types/state";
import CircularProgress from "./CircularProgress";
import Text from "./Text";
import Touchable from "./Touchable";

export interface PracticeCardProps extends TouchableHighlightProps {
  practice: Practice;
  progress: number;
}

const PracticeCard: React.FC<PracticeCardProps> = ({
  practice,
  progress,
  style,
  ...restProps
}) => {
  return (
    <Touchable style={[styles.container, style]} {...restProps}>
      <LinearGradient
        style={styles.listItem}
        start={[0, 0]}
        end={[1, 1]}
        colors={["#82E4FA", "#CDF1FF"]}
      >
        <CircularProgress
          progress={(progress / practice.questions.length) * 100}
        />
        <Text style={styles.listItemText}>{practice.topic}</Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={30}
          color={Colors.darkgreen}
        />
      </LinearGradient>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
  },
  listItemText: {
    flex: 1,
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
    color: Colors.darkgreen,
    marginLeft: 15,
  },
});

export default PracticeCard;
