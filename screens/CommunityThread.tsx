import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useLayoutEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItem,
  StyleSheet,
  TextInput as RNTextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { v4 as uuid } from "uuid";

import BlueButton from "../components/BlueButton";
import Dialog from "../components/Dialog";
import IconButton from "../components/IconButton";
import OrangeButton from "../components/OrangeButton";
import PostCard from "../components/PostCard";
import TextInput from "../components/TextInput";
import Colors from "../constants/Colors";
import {
  addReply,
  deletePost,
  deleteReply,
  likePost,
  likeReply,
} from "../data/post";
import { useAppDispatch, useAppSelector } from "../data/store";
import { RootStackScreenProps } from "../types/navigation";
import { Parent, Post, Reply } from "../types/state";

const CommunityThreadScreen: React.FC<
  RootStackScreenProps<"CommunityThread">
> = ({ route }) => {
  const postId = route.params.postId;
  const fromSearch = (route.params as any).fromSearch;

  const listViewRef = useRef<FlatList>(null);
  const inputRef = useRef<RNTextInput>(null);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    state.postState.posts.find((p) => p.id === postId)
  )!;
  const user = useAppSelector((state) => state.profileState.profile.user);

  const [currentActionPost, setCurrentActionPost] = useState<
    Post | Reply | null
  >(null);
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [postReported, setPostReported] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleMorePress = (post: Post | Reply) => {
    setCurrentActionPost(post);
    setActionMenuVisible(true);
  };

  const handleMoreClose = () => {
    setActionMenuVisible(false);
  };

  const handleModalHide = () => {
    setCurrentActionPost(null);
    setPostReported(false);
  };

  const handleReport = () => {
    if (!postReported) {
      setPostReported(true);
    }
  };

  const handleLikePost = () => {
    dispatch(
      likePost({
        postId,
        userId: user.id,
      })
    );
  };

  const handleDeletePost = (postId: string) => {
    handleMoreClose();
    setTimeout(() => {
      navigation.goBack();
      setTimeout(() => {
        dispatch(
          deletePost({
            postId,
          })
        );
      }, 1000);
    }, 500);
  };

  const handleLikeReply = (replyId: string) => {
    dispatch(
      likeReply({
        postId,
        replyId,
        userId: user.id,
      })
    );
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

  const handleImageDelete = () => {
    setImage(null);
  };

  const handleAddReply = () => {
    dispatch(
      addReply({
        postId,
        reply: {
          id: uuid(),
          author: {
            ...(user as Parent),
          },
          content: replyText,
          image,
          likeCount: 0,
          likers: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })
    );
    setImage(null);
    setReplyText("");
    Keyboard.dismiss();
    setTimeout(() => {
      listViewRef.current?.scrollToEnd();
      listViewRef.current?.scrollToOffset({ offset: 10000 });
    }, 500);
  };

  const handleDeleteReply = (replyId: string) => {
    dispatch(
      deleteReply({
        postId,
        replyId,
      })
    );
    handleMoreClose();
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

  const renderPostCard: ListRenderItem<Reply> = ({ item }) => (
    <PostCard
      style={styles.postCard}
      preview={false}
      post={item}
      liked={item.likers.includes(user.id)}
      onLike={() => handleLikeReply(item.id)}
      onMore={() => handleMorePress(item)}
    />
  );

  return (
    <>
      <FlatList
        ref={listViewRef}
        style={styles.list}
        contentContainerStyle={{
          marginTop: -20,
          paddingBottom: insets.bottom + 90,
        }}
        data={post.replies}
        ListHeaderComponent={
          <PostCard
            post={post}
            liked={post.likers.includes(user.id)}
            onLike={handleLikePost}
            onReply={() => inputRef.current?.focus()}
            onMore={() => handleMorePress(post)}
          />
        }
        renderItem={renderPostCard}
        keyExtractor={(item) => item.id}
        onScrollBeginDrag={() => inputRef.current?.blur()}
      />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={fromSearch ? 82 : 60}
      >
        <View
          style={[
            styles.inputArea,
            {
              paddingBottom: 10 + insets.bottom,
            },
          ]}
        >
          {image ? (
            <View>
              <Image source={{ uri: image }} style={styles.image} />
              <View style={styles.imageDeleteButtonContainer}>
                <IconButton
                  style={styles.imageDeleteButton}
                  name="close"
                  size={12}
                  color="white"
                  onPress={handleImageDelete}
                />
              </View>
            </View>
          ) : (
            <IconButton
              name="image-plus"
              size={28}
              color={Colors.greengrey}
              onPress={handleImagePick}
            />
          )}
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            placeholder="Add a reply..."
            placeholderTextColor={Colors.greengrey}
            multiline
            numberOfLines={5}
            value={replyText}
            onChangeText={setReplyText}
          />
          <OrangeButton
            disabled={!replyText}
            textContainerStyle={styles.postButton}
            onPress={handleAddReply}
          >
            Post
          </OrangeButton>
        </View>
      </KeyboardAvoidingView>
      <Dialog
        isVisible={actionMenuVisible}
        type="success"
        title="Actions"
        onBackdropPress={handleMoreClose}
        onModalHide={handleModalHide}
      >
        {currentActionPost?.author.name === user.name ? (
          <BlueButton
            textStyle={styles.actionButtonText}
            style={styles.actionButton}
            onPress={() =>
              (currentActionPost as Post).title
                ? handleDeletePost(currentActionPost.id)
                : handleDeleteReply(currentActionPost.id)
            }
          >
            Delete
          </BlueButton>
        ) : (
          <BlueButton
            textStyle={styles.actionButtonText}
            style={styles.actionButton}
            selected={postReported}
            onPress={handleReport}
          >
            {postReported ? "Reported!" : "Report"}
          </BlueButton>
        )}
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
    paddingTop: 40,
  },
  postCard: {
    marginTop: 15,
  },
  inputArea: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 20,
    maxHeight: 100,
  },
  postButton: {
    paddingHorizontal: 16,
    minHeight: 32,
  },
  actionButton: {
    marginVertical: 3,
  },
  actionButtonText: {
    paddingVertical: 8,
  },
  image: {
    height: 28,
    width: 28,
    borderRadius: 6,
  },
  imageDeleteButton: {},
  imageDeleteButtonContainer: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: Colors.grey,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommunityThreadScreen;
