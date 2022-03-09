import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BlueButton from "../components/BlueButton";
import BlueRingView from "../components/BlueRingView";
import CircularProgress from "../components/CircularProgress";
import ConfirmationDialog from "../components/ConfirmationDialog";
import IconButton from "../components/IconButton";
import OrangeButton from "../components/OrangeButton";
import PracticeDialog from "../components/PracticeDialog";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { setPracticeProgress } from "../data/practice";
import { useAppDispatch, useAppSelector } from "../data/store";
import { RootStackScreenProps } from "../types/navigation";

export default function PracticeQuestionScreen({
  navigation,
  route,
}: RootStackScreenProps<"PracticeQuestion">) {
  const practiceId = route.params.practiceId;
  const questionIndex = route.params.questionIndex;

  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const practice = useAppSelector(
    (state) => state.practiceState.practices
  ).find((i) => i.id === practiceId)!;
  const question = practice.questions[questionIndex];
  const finished = questionIndex === practice.questions.length;

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [primaryText, setPrimaryText] = useState("");
  const [secondaryText, setSecondaryText] = useState("");

  const handleExit = () => {
    setConfirmationVisible(true);
  };

  const handleConfirmationCancel = () => {
    setConfirmationVisible(false);
  };

  const handleConfirmationOk = () => {
    setConfirmationVisible(false);
    navigation.navigate("PracticePreview", route.params);
  };

  const handleChoicePress = (index: number) => {
    if (index === question.answerIndex) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    setPrimaryText(question.choices[index].content);
    setSecondaryText(question.choices[index].explanation);
  };

  const handleOk = () => {
    setPrimaryText("");
    setSecondaryText("");
    if (correct) {
      dispatch(
        setPracticeProgress({
          practiceId,
          progress: questionIndex + 1,
        })
      );
      navigation.push("PracticeQuestion", {
        practiceId,
        topic: route.params.topic,
        questionIndex: questionIndex + 1,
      });
    }
  };

  const handleFinishPress = () => {
    navigation.navigate("Practice" as any);
  };

  useLayoutEffect(() => {
    if (finished) {
      navigation.setOptions({
        headerLeft: () => null,
      });
    } else {
      navigation.setOptions({
        headerLeft: () => (
          <IconButton
            style={{
              marginLeft: 10,
            }}
            name="close"
            size={30}
            color={Colors.bluegreen}
            onPress={handleExit}
          />
        ),
      });
    }
  }, [finished, navigation]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
      <BlueRingView borderRadius={20} ringWidth={4}>
        {finished ? (
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 15 }}
          >
            <CircularProgress progress={100} big />
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text
                style={{ fontSize: FontSize.header, fontFamily: "semibold" }}
              >
                Congratulations!
              </Text>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                You've completed all {practice.questions.length} questions!
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.innerContainer}>
            <Text style={styles.question}>{question.question}</Text>
            <Text style={styles.source}>Source: {question.source}</Text>
          </View>
        )}
      </BlueRingView>
      {!finished ? (
        <View style={styles.buttons}>
          {question.choices.map((c, i) => (
            <BlueButton
              key={i}
              shadow
              style={styles.button}
              textStyle={styles.buttonText}
              textContainerStyle={styles.buttonTextContainer}
              onPress={() => handleChoicePress(i)}
            >
              {c.content}
            </BlueButton>
          ))}
        </View>
      ) : (
        <View style={{ flex: 1, marginTop: 40 }}>
          <Text
            style={{
              fontSize: FontSize.emphasis,
              fontFamily: "semibold",
              color: Colors.darkgreen,
            }}
          >
            Remember...
          </Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoIcon}>
              <MaterialCommunityIcons name="lightbulb" size={30} />
            </View>
            <Text style={styles.infoText}>
              Our language matters. Let's help our kids focus on the problem,
              rather than feel like they are the problem.
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoIcon}>
              <MaterialCommunityIcons name="lightbulb" size={30} />
            </View>
            <Text style={styles.infoText}>
              When we collaborate with our kids, they learn that leaders use
              empathy and connection, not fear and control.
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoIcon}>
              <MaterialCommunityIcons name="lightbulb" size={30} />
            </View>
            <Text style={styles.infoText}>
              There is no “perfect parent”. It's our commitment to making
              progress that counts!
            </Text>
          </View>
          <Text
            style={{
              fontSize: FontSize.caption,
              fontFamily: "italic",
              color: Colors.greengrey,
              marginTop: 20,
            }}
          >
            Source: Curious Parenting
          </Text>
          <OrangeButton
            shadow
            style={{ marginTop: "auto" }}
            ring
            onPress={handleFinishPress}
          >
            Finish
          </OrangeButton>
        </View>
      )}
      <ConfirmationDialog
        isVisible={confirmationVisible}
        title="Exit"
        text="Do you want to exit the practice? All progress will be saved."
        onCancel={handleConfirmationCancel}
        onOk={handleConfirmationOk}
      />
      <PracticeDialog
        isVisible={!!primaryText}
        type={correct ? "success" : "failure"}
        primaryText={primaryText}
        secondaryText={secondaryText}
        onOk={handleOk}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
  },
  innerContainer: {
    padding: 20,
  },
  question: {
    fontFamily: "semibold",
    fontSize: FontSize.header,
  },
  source: {
    marginTop: 20,
    fontFamily: "italic",
    fontSize: FontSize.caption,
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    marginVertical: 10,
  },
  buttonText: {
    fontSize: FontSize.caption,
  },
  buttonTextContainer: {
    minHeight: 64,
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  infoIcon: {
    backgroundColor: Colors.lightgreen,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 15,
    color: Colors.darkgreen,
    flex: 1,
  },
});
