import { StyleSheet, View, ViewProps } from "react-native";

import Colors from "../constants/Colors";

export interface CardProps extends ViewProps {
  noShadow?: boolean;
}

const Card: React.FC<CardProps> = ({ style, noShadow, ...restProps }) => {
  return (
    <View
      style={[styles.container, !noShadow && styles.shadow, style]}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  shadow: {
    shadowColor: Colors.bluegreen,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 30,
  },
});

export default Card;
