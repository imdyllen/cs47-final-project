import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BlueButton from "../components/BlueButton";
import BlueRingView from "../components/BlueRingView";
import CircularProgress from "../components/CircularProgress";
import IconButton from "../components/IconButton";
import OrangeButton from "../components/OrangeButton";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { useAppSelector } from "../data/store";
import { RootStackScreenProps } from "../types/navigation";

export default function PracticePreviewScreen({
  navigation,
  route,
}: RootStackScreenProps<"PracticePreview">) {
  const practiceId = route.params.practiceId;

  const insets = useSafeAreaInsets();
  const practice = useAppSelector(
    (state) => state.practiceState.practices
  ).find((i) => i.id === practiceId)!;
  const progress = useAppSelector((state) => state.practiceState.progress)[
    practiceId
  ];

  const handleStartPress = () => {
    navigation.navigate("PracticeQuestion", {
      practiceId,
      topic: practice.topic,
      questionIndex: progress === practice.questions.length ? 0 : progress,
    });
  };

  const handleViewQuestionsPress = () => {
    navigation.navigate("PracticeReview", {
      practiceId,
      topic: practice.topic,
    });
  };

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

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
      <BlueRingView borderRadius={20} ringWidth={4}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{practice.topic}</Text>
            <CircularProgress
              progress={(progress / practice.questions.length) * 100}
              backgroundColor={Colors.greengrey}
            />
          </View>
          <Text style={styles.content}>{practice.description}</Text>
          <Text style={styles.source}>Source: {practice.source}</Text>
        </View>
      </BlueRingView>
      <View style={styles.info}>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <MaterialCommunityIcons name="head-question" size={30} />
          </View>
          <Text style={styles.infoNumber}>{practice.questions.length}</Text>
          <Text>multiple choice questions</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <MaterialCommunityIcons name="timer" size={30} />
          </View>
          <Text style={styles.infoNumber}>{practice.questions.length}</Text>
          <Text style={{ flex: 1 }}>min estimate</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <OrangeButton
          style={styles.button}
          textContainerStyle={styles.buttonTextContainer}
          ring
          shadow
          onPress={handleStartPress}
        >
          {progress === practice.questions.length
            ? "Restart Practice"
            : progress === 0
            ? "Start Practice"
            : "Resume Practice"}
        </OrangeButton>
        <BlueButton
          shadow
          style={styles.button}
          textContainerStyle={styles.buttonTextContainer}
          onPress={handleViewQuestionsPress}
        >
          View Questions
        </BlueButton>
      </View>
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "semibold",
    fontSize: FontSize.title,
  },
  content: {
    marginVertical: 15,
  },
  source: {
    fontFamily: "italic",
    fontSize: FontSize.caption,
  },
  info: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
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
  infoNumber: {
    color: Colors.orange,
    fontSize: FontSize.title,
    marginLeft: 12,
    minWidth: 28,
  },
  buttons: {
    marginTop: "auto",
  },
  button: {
    marginTop: 15,
  },
  buttonTextContainer: {
    height: 54,
  },
});
