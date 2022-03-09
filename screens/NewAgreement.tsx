import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlightProps,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { v4 as uuid } from "uuid";

import BlueRadiusBackground from "../components/BlueRadiusBackground";
import BlueRingView from "../components/BlueRingView";
import BlueView from "../components/BlueView";
import ConfirmationDialog from "../components/ConfirmationDialog";
import FloatingActionButton from "../components/FloatingActionButton";
import IconButton from "../components/IconButton";
import MockPhoto from "../components/MockPhoto";
import OrangeButton from "../components/OrangeButton";
import ProgressBar from "../components/ProgressBar";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import TimerBackground from "../components/TimerBackground";
import Touchable from "../components/Touchable";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { addAgreement } from "../data/agreement";
import { useAppDispatch, useAppSelector } from "../data/store";
import { getAgeFromBirthday } from "../lib/format";
import { AgreementStackScreenProps } from "../types/navigation";
import { Child, Profile } from "../types/state";

const steps = [
  {
    id: "1",
    prompt: "{person1}, explain your point of view. Why do you feel this way?",
    tips: [
      "{person1}, remember to focus on the task at hand, rather than get carried away by emotions.",
      "{person2}, remember not to interrupt. Inquire, listen, and try to understand {person1}'s concerns.",
    ],
  },
  {
    id: "2",
    prompt: "{person2}, explain your point of view. Why do you feel this way?",
    tips: [
      "{person2}, remember to focus on the task at hand, rather than get carried away by emotions.",
      "{person1}, remember not to interrupt. Inquire, listen, and try to understand {person2}'s concerns.",
    ],
  },
  {
    id: "3",
    prompt:
      "{person1}, restate {person2}'s point of view using objective language.",
    tips: ["Consider what {person2} needs from you and why."],
  },
  {
    id: "4",
    prompt:
      "{person2}, restate {person1}'s point of view using objective language.",
    tips: ["Consider what {person1} needs from you and why."],
  },
  {
    id: "5",
    prompt:
      "Do your best to reach an agreement. You will log it on the next page!",
    tips: [
      "What support does {person2} need?\nWhat support does {person1} need?\nHow might we compromise?",
    ],
  },
];

const emojis = [
  "👚",
  "🍱",
  "🏀",
  "📱",
  "🛏",
  "🐶",
  "🧽",
  "🎧",
  "🚪",
  "🛁",
  "🎒",
  "🎮",
  "🚨",
  "🏠",
  "💅",
  "😍",
  "🎨",
  "🚙",
  "🌟",
  "📚",
];

const gradientHeight = 425;

const NewAgreementScreen: React.FC<
  AgreementStackScreenProps<"NewAgreement">
> = ({ navigation, route }) => {
  const currentStep = route.params.step;

  const dispatch = useAppDispatch();
  const timerLength = useAppSelector(
    (state) => state.agreementState.settings.timer
  );
  const user = useAppSelector((state) => state.profileState.profile);
  const spouse = useAppSelector((state) => state.profileState.profile.spouse);
  const children = useAppSelector(
    (state) => state.profileState.profile.children
  );

  const timerRef = useRef<NodeJS.Timer | null>();
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
  const [second, setSecond] = useState(timerLength);
  const [selectedPeople, setSelectedPeople] = useState<
    [string | null, string | null]
  >(route.params.selectedPeople);
  const person1 = [user, spouse, ...(children ? children : [])].find(
    (i) => i?.user.id === selectedPeople[0]
  );
  const person2 = [user, spouse, ...(children ? children : [])].find(
    (i) => i?.user.id === selectedPeople[1]
  );
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const handleExitDialogOpen = () => {
    setExitDialogOpen(true);
  };

  const handleExitDialogClose = () => {
    setExitDialogOpen(false);
  };

  const handleExitOk = () => {
    handleExitDialogClose();
    navigation.navigate("Tabs" as any);
  };

  const handleExitCancel = () => {
    handleExitDialogClose();
  };

  const handleDiscardDialogOpen = () => {
    setDiscardDialogOpen(true);
  };

  const handleDiscardDialogClose = () => {
    setDiscardDialogOpen(false);
  };

  const handleDiscardOk = () => {
    handleDiscardDialogClose();
    setTimeout(() => navigation.pop(), 500);
  };

  const handleDiscardCancel = () => {
    handleDiscardDialogClose();
  };

  const handleSave = () => {
    const person1 =
      user.user.id === selectedPeople[0]
        ? user
        : spouse?.user.id === selectedPeople[0]
        ? spouse
        : children?.find((c) => c.user.id === selectedPeople[0]);
    const person2 =
      user.user.id === selectedPeople[1]
        ? user
        : spouse?.user.id === selectedPeople[1]
        ? spouse
        : children?.find((c) => c.user.id === selectedPeople[1]);

    dispatch(
      addAgreement({
        agreement: {
          id: uuid(),
          title,
          emoji: selectedEmoji!,
          summary,
          people: [person1!, person2!],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })
    );
  };

  const handleNextPress = () => {
    handleTimerStop();
    navigation.push("NewAgreement", { step: currentStep + 1, selectedPeople });
    if (currentStep === 6) {
      handleSave();
    }
  };

  const handlePrevPress = () => {
    if (title || summary) {
      handleDiscardDialogOpen();
    } else {
      navigation.pop();
    }
  };

  const handleFinishPress = () => {
    navigation.navigate("Tabs" as any);
  };

  const handleTimerStart = () => {
    timerRef.current = setInterval(
      () => setSecond((second) => second - 1),
      1000
    );
    setSecond((second) => second - 1);
  };

  const handleTimerStop = () => {
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const handleTimerPress = () => {
    if (timerRef.current) {
      handleTimerStop();
    } else {
      handleTimerStart();
    }
  };

  const handlePeopleSelect = (id: string) => {
    const people = [...selectedPeople] as typeof selectedPeople;
    if (selectedPeople.indexOf(id) !== -1) {
      people[selectedPeople.indexOf(id)] = null;
    } else {
      people[selectedPeople.indexOf(null)] = id;
    }
    setSelectedPeople(people);
  };

  useLayoutEffect(() => {
    if (currentStep === 7) {
      navigation.setOptions({
        headerLeft: () => null,
      });
    } else {
      navigation.setOptions({
        headerLeft: () => (
          <IconButton
            style={{
              marginLeft: 20,
            }}
            onPress={handleExitDialogOpen}
            name="close"
            size={30}
            color={Colors.bluegreen}
          />
        ),
      });
    }
  }, [currentStep, navigation]);

  useEffect(() => {
    if (second <= 0) {
      handleTimerStop();
    }
  }, [second]);

  useEffect(() => {
    return () => {
      handleTimerStop();
    };
  }, []);

  useEffect(() => {
    const unsub = navigation.addListener("blur", () => {
      setSecond(timerLength);
    });
    return unsub;
  }, [timerLength, navigation]);

  const container = (
    <View style={styles.container}>
      <ProgressBar progress={currentStep / 7} />
      <View
        style={[
          styles.upperContainer,
          {
            height:
              currentStep === 0 || currentStep === 5
                ? gradientHeight - 60 - 70 - 80
                : currentStep === 6
                ? gradientHeight - 130
                : currentStep === 7
                ? 0
                : gradientHeight - 70 - 80 - 30,
          },
        ]}
      >
        {currentStep === 0 && (
          <Text style={styles.conflictTitle}>
            Who is this conflict between?
          </Text>
        )}
        {currentStep === 5 && (
          <Text style={styles.conflictTitle}>
            How can we work together to solve the problem?
          </Text>
        )}
        {currentStep === 6 && (
          <View style={{ width: "100%", paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={[
                  styles.roundBackground,
                  { backgroundColor: "white", marginRight: 20 },
                ]}
              >
                <Text style={[styles.stepText, { color: "black" }]}>6</Text>
              </View>
              <Text
                style={[styles.conflictTitle, { fontSize: FontSize.header }]}
              >
                Log Your Agreement
              </Text>
            </View>
            <Text style={[styles.bold, { marginTop: 20 }]}>Title</Text>
            <TextInput
              style={{
                borderRadius: 20,
                backgroundColor: "white",
                marginTop: 5,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              value={title}
              onChangeText={setTitle}
            />
            <Text style={[styles.bold, { marginTop: 15 }]}>Summary</Text>
            <TextInput
              multiline
              style={{
                borderRadius: 20,
                backgroundColor: "white",
                marginTop: 5,
                paddingHorizontal: 16,
                paddingVertical: 10,
                height: 90,
              }}
              value={summary}
              onChangeText={setSummary}
            />
          </View>
        )}
        {currentStep >= 1 && currentStep <= 4 && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleTimerPress}
            style={styles.timerContainer}
          >
            {second === timerLength ? (
              <TimerBackground />
            ) : (
              <AnimatedCircularProgress
                style={styles.circularProgress}
                size={177}
                width={12}
                backgroundWidth={6}
                fill={(second / timerLength) * 100}
                tintColor="#FFA37B"
                tintColorSecondary="#FF6954"
                backgroundColor="white"
                rotation={0}
                lineCap="round"
              />
            )}
            <View style={styles.timer}>
              {second === timerLength ? (
                <>
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                      {new Date(timerLength * 1000).toISOString().substr(15, 4)}
                    </Text>
                    <Text style={styles.timeUnit}>min</Text>
                  </View>
                  <Text style={styles.timerHint}>Start Timer</Text>
                </>
              ) : (
                <Text style={styles.countdown}>
                  {new Date(second * 1000).toISOString().substr(14, 5)}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        style={styles.lowerContainer}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {currentStep === 0 && (
          <>
            <UserSelection
              style={styles.personButton}
              user={user}
              selected={selectedPeople.includes(user.user.id)}
              onSelect={handlePeopleSelect}
            />
            {spouse && (
              <UserSelection
                style={styles.personButton}
                user={spouse}
                selected={selectedPeople.includes(spouse.user.id)}
                onSelect={handlePeopleSelect}
              />
            )}
            {children?.map((c) => (
              <UserSelection
                style={styles.personButton}
                key={c.user.id}
                user={c}
                selected={selectedPeople.includes(c.user.id)}
                onSelect={handlePeopleSelect}
              />
            ))}
          </>
        )}
        {currentStep === 6 && (
          <>
            <Text style={[styles.emojiText, { marginHorizontal: -10 }]}>
              Select an emoji for the agreement
            </Text>
            <View style={styles.emojis}>
              <View style={styles.emojiRow}>
                {emojis.slice(0, 5).map((emoji) => (
                  <EmojiButton
                    key={emoji}
                    selected={selectedEmoji === emoji}
                    onPress={() => setSelectedEmoji(emoji)}
                    emoji={emoji}
                  />
                ))}
              </View>
              <View style={styles.emojiRow}>
                {emojis.slice(5, 10).map((emoji) => (
                  <EmojiButton
                    key={emoji}
                    selected={selectedEmoji === emoji}
                    onPress={() => setSelectedEmoji(emoji)}
                    emoji={emoji}
                  />
                ))}
              </View>
              <View style={styles.emojiRow}>
                {emojis.slice(10, 15).map((emoji) => (
                  <EmojiButton
                    key={emoji}
                    selected={selectedEmoji === emoji}
                    onPress={() => setSelectedEmoji(emoji)}
                    emoji={emoji}
                  />
                ))}
              </View>
              <View style={styles.emojiRow}>
                {emojis.slice(15, 20).map((emoji) => (
                  <EmojiButton
                    key={emoji}
                    selected={selectedEmoji === emoji}
                    onPress={() => setSelectedEmoji(emoji)}
                    emoji={emoji}
                  />
                ))}
              </View>
            </View>
          </>
        )}
        {currentStep === 7 && (
          <View style={{ justifyContent: "space-between", marginTop: 20 }}>
            <Text style={styles.conflictTitle}>Congratulations!</Text>
            <Image
              style={{ width: 200, height: 200, alignSelf: "center" }}
              source={require("../assets/images/icon.png")}
            />
            <Text style={{ textAlign: "center", fontFamily: "italic" }}>
              Conflict allows us to learn and grow. Together, you worked toward
              a healthier relationship!
            </Text>
            <BlueRingView
              style={{ marginTop: 20 }}
              borderRadius={20}
              ringWidth={4}
            >
              <View style={{ padding: 16, alignItems: "center" }}>
                <Text style={styles.bold}>Agreement Saved</Text>
                <Text style={{ marginTop: 8 }}>{dayjs().format("lll")}</Text>
              </View>
            </BlueRingView>
            <OrangeButton
              shadow
              style={{ marginTop: 20 }}
              ring
              onPress={handleFinishPress}
            >
              Finish
            </OrangeButton>
          </View>
        )}
        {currentStep > 0 && currentStep <= 5 && (
          <>
            <View style={styles.roundBackground}>
              <Text style={styles.stepText}>{currentStep}</Text>
            </View>
            <Text style={styles.stepPrompt}>
              {steps[currentStep - 1].prompt
                .replaceAll(
                  "{person1}",
                  (person1?.role !== "Child"
                    ? person1?.role
                    : person1?.user.name)!
                )
                .replaceAll(
                  "{person2}",
                  (person2?.role !== "Child"
                    ? person2?.role
                    : person2?.user.name)!
                )}
            </Text>
            <View style={styles.tipLabelContainer}>
              <View style={styles.roundBackground}>
                <MaterialCommunityIcons name="lightbulb" size={28} />
              </View>
              <Text style={styles.tipLabel}>Tips</Text>
            </View>
            <View style={styles.tips}>
              {steps[currentStep - 1].tips.map((tip) => (
                <Text key={tip} style={styles.tipText}>
                  {tip
                    .replaceAll(
                      "{person1}",
                      (person1?.role !== "Child"
                        ? person1?.role
                        : person1?.user.name)!
                    )
                    .replaceAll(
                      "{person2}",
                      (person2?.role !== "Child"
                        ? person2?.role
                        : person2?.user.name)!
                    )}
                </Text>
              ))}
            </View>
            {currentStep === 5 && (
              <>
                <View style={styles.tipLabelContainer}>
                  <View style={styles.roundBackground}>
                    <MaterialCommunityIcons name="lightbulb" size={28} />
                  </View>
                  <Text style={styles.tipLabel}>Examples of Needs</Text>
                </View>
                <View style={styles.tips}>
                  <Text style={styles.tipText}>
                    Love, boundaries, communication, sleep, play time, food,
                    assistance, connection, autonomy.
                  </Text>
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <BlueRadiusBackground
        style={styles.gradient}
        height={
          currentStep === 0 || currentStep === 5
            ? gradientHeight - 60
            : currentStep === 6
            ? gradientHeight + 40
            : currentStep === 7
            ? gradientHeight - 220
            : gradientHeight - 30
        }
      />
      {currentStep === 6 ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {container}
        </TouchableWithoutFeedback>
      ) : (
        container
      )}
      {currentStep !== 7 && (
        <FloatingActionButton
          style={styles.nextButton}
          name="arrow-right"
          onPress={handleNextPress}
          disabled={
            selectedPeople.some((p) => p === null) ||
            (currentStep === 6 && (!selectedEmoji || !title || !summary))
          }
        />
      )}
      {currentStep !== 0 && currentStep !== 7 && (
        <FloatingActionButton
          style={styles.prevButton}
          name="arrow-left"
          onPress={handlePrevPress}
        />
      )}
      <ConfirmationDialog
        isVisible={exitDialogOpen}
        title="Exit"
        text="Are you sure you want to exit? Your progress will be lost."
        onOk={handleExitOk}
        onCancel={handleExitCancel}
      />
      <ConfirmationDialog
        isVisible={discardDialogOpen}
        title="Go Back"
        text="Are you sure you want to go back? Your draft will be discarded."
        onOk={handleDiscardOk}
        onCancel={handleDiscardCancel}
      />
    </View>
  );
};

const EmojiButton = ({
  emoji,
  selected,
  onPress,
}: {
  emoji: string;
  onPress: () => void;
  selected: boolean;
}) => (
  <Touchable
    style={[
      styles.emojiContainer,
      selected && { backgroundColor: "rgba(97, 211, 209, 0.75)" },
    ]}
    onPress={onPress}
  >
    <Text style={styles.emoji}>{emoji}</Text>
  </Touchable>
);

export const UserSelection = ({
  user,
  selected,
  onSelect,
  style,
}: {
  user: Profile;
  selected?: boolean;
  onSelect?: (id: string) => void;
  style?: TouchableHighlightProps["style"];
}) => {
  const view = (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: selected ? 10 : 8,
        paddingVertical: 6,
      }}
    >
      <MockPhoto
        style={{ width: 54, height: 54, borderRadius: 27 }}
        name={user.user.photo}
      />
      <View style={{ marginLeft: 15 }}>
        <Text
          style={{
            color: selected ? "white" : "black",
            fontFamily: selected ? "semibold" : "regular",
          }}
        >
          {user.user.name}
        </Text>
        <Text
          style={{
            fontSize: FontSize.caption,
            color: selected ? "white" : Colors.greengrey,
            marginTop: 2,
          }}
        >
          {user.role === "Child"
            ? `${getAgeFromBirthday((user.user as Child).birthday)} ${
                user.user.gender
              }`
            : user.role}
        </Text>
      </View>
    </View>
  );

  return (
    <Touchable
      style={[{ borderRadius: 40 }, style]}
      onPress={onSelect ? () => onSelect(user.user.id) : undefined}
    >
      {selected ? (
        <BlueView borderRadius={40}>{view}</BlueView>
      ) : (
        <BlueRingView borderRadius={40}>{view}</BlueRingView>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  bold: {
    fontFamily: "semibold",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
  },
  upperContainer: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  conflictTitle: {
    fontFamily: "semibold",
    fontSize: FontSize.title,
    textAlign: "center",
  },
  lowerContainer: {
    flex: 1,
    marginTop: 20,
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  personButton: {
    marginVertical: 8,
  },
  nextButton: {
    right: 20,
    bottom: 30,
    position: "absolute",
  },
  prevButton: {
    left: 20,
    bottom: 30,
    position: "absolute",
  },
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circularProgress: {
    position: "absolute",
  },
  timer: {
    position: "absolute",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  timeText: {
    fontFamily: "semibold",
    fontSize: FontSize.header,
  },
  timeUnit: {
    fontSize: FontSize.emphasis,
    marginBottom: 2,
    marginLeft: 5,
  },
  timerHint: {
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
  },
  countdown: {
    fontFamily: "semibold",
    fontSize: 36,
  },
  roundBackground: {
    backgroundColor: "#9aeaef",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontSize: FontSize.header,
    fontFamily: "semibold",
  },
  stepPrompt: {
    fontSize: FontSize.emphasis,
    fontFamily: "semibold",
    marginTop: 10,
  },
  tipLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  tipLabel: {
    marginLeft: 15,
    fontSize: FontSize.emphasis,
    fontFamily: "semibold",
  },
  tips: {
    marginTop: 10,
  },
  tipText: {
    fontFamily: "italic",
    marginBottom: 5,
  },
  emojiText: {
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
    marginTop: 20,
  },
  emojis: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  emojiRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  emojiContainer: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: Colors.bluegreen,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  emoji: {
    fontSize: 30,
  },
});

export default NewAgreementScreen;
