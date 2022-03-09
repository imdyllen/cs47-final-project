import * as ImagePicker from "expo-image-picker";
import { useCallback, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Switch,
  View,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { v4 as uuid } from "uuid";

import BlueButton from "../components/BlueButton";
import Card from "../components/Card";
import Chip from "../components/Chip";
import ConfirmationDialog from "../components/ConfirmationDialog";
import IconButton from "../components/IconButton";
import OrangeButton from "../components/OrangeButton";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { addPost } from "../data/post";
import { useAppDispatch, useAppSelector } from "../data/store";
import { RootStackScreenProps } from "../types/navigation";

const recommendedTopics = [
  "tantrum",
  "pickeating",
  "school",
  "health",
  "discipline",
  "bigfeeling",
  "bedtime",
];

const NewPostScreen: React.FC<RootStackScreenProps<"NewPost">> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profileState.profile.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [addedTopics, setAddedTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [expertsOnly, setExpertsOnly] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleDiscard = useCallback(() => {
    Keyboard.dismiss();
    if (title || description) {
      setConfirmationVisible(true);
    } else {
      navigation.goBack();
    }
  }, [description, navigation, title]);

  const handleCancel = () => {
    setConfirmationVisible(false);
  };

  const handleOk = () => {
    setConfirmationVisible(false);
    setTimeout(() => navigation.goBack(), 500);
  };

  const handleImagePick = async () => {
    if (image) {
      setImage(null);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleChipSelect = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      const index = selectedTopics.findIndex((t) => t === topic);
      const newSelectedTopics = [...selectedTopics];
      newSelectedTopics.splice(index, 1);
      setSelectedTopics(newSelectedTopics);
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleChipAdd = () => {
    if (!newTopic) {
      return;
    }
    const topic = newTopic.replaceAll("#", "").replaceAll(/\s/g, "");
    if (recommendedTopics.includes(topic)) {
      setSelectedTopics([...selectedTopics, topic]);
    } else {
      setAddedTopics([...addedTopics, topic]);
      setSelectedTopics([...selectedTopics, topic]);
    }
    setNewTopic("");
  };

  const handlePostAdd = useCallback(() => {
    dispatch(
      addPost({
        post: {
          id: uuid(),
          title,
          author: {
            ...(user as any),
          },
          content: description,
          image,
          likeCount: 0,
          likers: [],
          replies: [],
          topics: selectedTopics,
          anonymous,
          expertsOnly,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })
    );
    navigation.goBack();
  }, [
    anonymous,
    description,
    dispatch,
    expertsOnly,
    image,
    navigation,
    selectedTopics,
    title,
    user,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          style={{
            marginLeft: 20,
          }}
          onPress={handleDiscard}
          name="close"
          size={30}
          color={Colors.bluegreen}
        />
      ),
    });
  }, [handleDiscard, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <OrangeButton
          style={{
            marginRight: 20,
          }}
          textContainerStyle={styles.postButton}
          onPress={handlePostAdd}
          disabled={!title || !description}
        >
          Post
        </OrangeButton>
      ),
    });
  }, [title, description, navigation, handlePostAdd]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 60 }}
    >
      <Card>
        <Text style={styles.title}>Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type here..."
          value={title}
          onChangeText={setTitle}
        />
        <Text style={[styles.description, styles.bold]}>Description</Text>
        <TextInput
          style={[styles.textInput, styles.multilineTextInput]}
          multiline
          numberOfLines={4}
          placeholder="Type here..."
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.imageButtonContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <BlueButton
            style={{ flex: 1 }}
            textStyle={styles.uploadButton}
            onPress={handleImagePick}
          >
            {image ? "Delete Image" : "Upload Image"}
          </BlueButton>
        </View>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.bold}>Select Topics</Text>
        <View style={styles.chipInputContainer}>
          <TextInput
            style={styles.chipInput}
            placeholder="Type here..."
            value={newTopic}
            onChangeText={setNewTopic}
          />
          <View style={styles.chipAddIcon}>
            <IconButton
              name="plus"
              size={28}
              color={Colors.greengrey}
              onPress={handleChipAdd}
            />
          </View>
        </View>
        <View style={styles.chips}>
          {[...recommendedTopics, ...addedTopics].map((topic) => (
            <Chip
              style={styles.chip}
              key={topic}
              selected={selectedTopics.includes(topic)}
              onPress={() => handleChipSelect(topic)}
            >
              #{topic}
            </Chip>
          ))}
        </View>
      </Card>
      <Card style={[styles.card, styles.anonymousContainer]}>
        <Text style={styles.bold}>Anonymous</Text>
        <Switch
          value={anonymous}
          onValueChange={setAnonymous}
          trackColor={{ true: Colors.orange }}
        />
      </Card>
      <Card style={styles.card}>
        <Text style={styles.bold}>Who Can Reply?</Text>
        <BlueButton
          style={styles.button}
          textStyle={styles.buttonText}
          selected={!expertsOnly}
          onPress={() => setExpertsOnly(false)}
        >
          Everyone
        </BlueButton>
        <BlueButton
          style={styles.button}
          textStyle={styles.buttonText}
          selected={expertsOnly}
          onPress={() => setExpertsOnly(true)}
        >
          Experts Only
        </BlueButton>
      </Card>
      <ConfirmationDialog
        isVisible={confirmationVisible}
        title="Exit"
        text="Are you sure you want to exit? Your draft will be discarded."
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.lightblue,
  },
  card: {
    marginTop: 20,
  },
  title: {
    fontFamily: "semibold",
  },
  description: {
    marginTop: 10,
  },
  bold: {
    fontFamily: "semibold",
  },
  textInput: {
    backgroundColor: "#e7f8ff",
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  multilineTextInput: {
    height: 80,
    marginBottom: 10,
  },
  uploadButton: {
    paddingVertical: 8,
  },
  chips: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
  },
  chipInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  chipAddIcon: {
    position: "absolute",
    right: 10,
  },
  chipInput: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingRight: 40,
    backgroundColor: "#e7f8ff",
    borderRadius: 20,
    fontSize: FontSize.caption,
    flex: 1,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    paddingVertical: 8,
  },
  anonymousContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  postButton: {
    paddingHorizontal: 16,
    minHeight: 32,
  },
});

export default NewPostScreen;
