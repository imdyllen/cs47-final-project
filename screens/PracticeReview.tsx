import { useLayoutEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Card from "../components/Card";
import IconButton from "../components/IconButton";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { useAppSelector } from "../data/store";
import { RootStackScreenProps } from "../types/navigation";
import { Question } from "../types/state";

const PracticeReviewScreen: React.FC<
  RootStackScreenProps<"PracticeReview">
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const practiceId = route.params.practiceId;

  const practice = useAppSelector(
    (state) => state.practiceState.practices
  ).find((i) => i.id === practiceId)!;
  const progress = useAppSelector((state) => state.practiceState.progress)[
    practiceId
  ];

  const [completedSelected, setCompletedSelected] = useState(progress !== 0);
  const data = completedSelected
    ? practice.questions.slice(0, progress)
    : practice.questions.slice(progress);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          style={{
            marginLeft: 10,
          }}
          name="chevron-left"
          size={36}
          color={Colors.bluegreen}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation]);

  const renderQuestionCard: ListRenderItem<Question> = ({ item }) => (
    <Card noShadow style={{ marginTop: 15 }}>
      <Text style={styles.questionText}>{item.question}</Text>
      {item.choices.map((c, i) => (
        <Text
          key={c.content}
          style={[
            styles.choiceText,
            i === item.answerIndex && {
              color: Colors.green,
              fontFamily: "semibold",
            },
          ]}
        >
          {c.content}
        </Text>
      ))}
    </Card>
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={{
        paddingBottom: insets.bottom + 40,
      }}
      ListHeaderComponent={
        <View style={styles.segments}>
          <Segment
            text="Completed"
            selected={completedSelected}
            onPress={() => setCompletedSelected(true)}
          />
          <Segment
            text="Incomplete"
            selected={!completedSelected}
            onPress={() => setCompletedSelected(false)}
          />
        </View>
      }
      data={data}
      renderItem={renderQuestionCard}
      keyExtractor={(item) => item.question}
    />
  );
};

const Segment: React.FC<{
  selected?: boolean;
  text: string;
  onPress: () => void;
}> = ({ selected, text, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.6}
    style={{
      alignItems: "center",
      width: "30%",
    }}
    onPress={onPress}
  >
    <Text
      style={[
        styles.segmentText,
        { color: selected ? Colors.orange : Colors.grey },
      ]}
    >
      {text}
    </Text>
    <View
      style={[
        styles.segmentDivider,
        { backgroundColor: selected ? Colors.orange : Colors.grey },
      ]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
  },
  segmentText: {
    fontFamily: "semibold",
  },
  segmentDivider: {
    width: "100%",
    height: 3,
    borderRadius: 1.5,
    marginTop: 4,
  },
  segments: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  questionText: {
    fontFamily: "semibold",
    marginBottom: 8,
  },
  choiceText: {
    fontSize: FontSize.caption,
    marginVertical: 4,
  },
});

export default PracticeReviewScreen;
