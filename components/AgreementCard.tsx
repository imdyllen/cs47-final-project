import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableHighlightProps, View } from "react-native";

import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { Agreement } from "../types/state";
import Text from "./Text";
import Touchable from "./Touchable";

export interface AgreementCardProps extends TouchableHighlightProps {
  agreement: Agreement;
}

const AgreementCard: React.FC<AgreementCardProps> = ({
  agreement,
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
        <View style={styles.center}>
          <Text style={styles.emoji}>{agreement.emoji}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{agreement.title}</Text>
          <View style={styles.caption}>
            <Text>{`${
              agreement.people[0].role !== "Child"
                ? agreement.people[0].role
                : agreement.people[0].user.name
            } & ${
              agreement.people[1].role !== "Child"
                ? agreement.people[1].role
                : agreement.people[1].user.name
            }`}</Text>
            <Text style={styles.date} ellipsizeMode="tail" numberOfLines={1}>
              {" "}
              • {dayjs(agreement.createdAt).fromNow()}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emoji: {
    fontSize: 42,
  },
  content: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
  },
  caption: {
    flexDirection: "row",
    marginTop: 5,
  },
  date: {
    color: Colors.greengrey,
    flex: 1,
  },
});

export default AgreementCard;
