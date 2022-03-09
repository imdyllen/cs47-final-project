import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import {
  Image,
  StyleSheet,
  TouchableHighlightProps,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { getChildrenDescription } from "../lib/format";
import { Post, Reply } from "../types/state";
import BlueRingView from "./BlueRingView";
import Chip from "./Chip";
import MockPhoto from "./MockPhoto";
import Text from "./Text";
import Touchable from "./Touchable";

export interface PostCardProps extends TouchableHighlightProps {
  preview?: boolean;
  post: Post | Reply;
  liked?: boolean;
  onLike?: () => void;
  onReply?: () => void;
  onMore?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  style,
  preview,
  post,
  liked,
  onLike,
  onReply,
  onMore,
  ...restProps
}) => {
  const view = (
    <View>
      {!preview && (post as Post).title && (
        <>
          {(post as Post).expertsOnly && (
            <View style={styles.expertsOnlyContainer}>
              <MaterialCommunityIcons
                name="alert-decagram"
                size={18}
                color={Colors.green}
              />
              <Text style={styles.expertsOnlyText}>Expert Answers Only</Text>
            </View>
          )}
          <Text style={styles.title}>{(post as Post).title}</Text>
          {(post as Post).topics.length !== 0 && (
            <View style={styles.topicContainer}>
              {(post as Post).topics.map((topic) => (
                <Chip style={styles.topic} key={topic} plain>
                  #{topic}
                </Chip>
              ))}
            </View>
          )}
        </>
      )}
      <View style={styles.userRow}>
        <MockPhoto
          style={styles.avatar}
          name={(post as Post).anonymous ? "default" : post.author.photo}
        />
        <View style={styles.userInfo}>
          <View style={styles.username}>
            <Text>
              {(post as Post).anonymous ? "Anonymous" : post.author.name}
            </Text>
            {post.author.expert && (
              <MaterialCommunityIcons
                style={styles.expertBadge}
                name="check-decagram"
                size={18}
                color={Colors.green}
              />
            )}
          </View>
          <Text style={styles.description}>
            {post.author.expert
              ? post.author.description
              : getChildrenDescription(post.author)}
          </Text>
        </View>
        <Text style={styles.time}>{dayjs(post.createdAt).fromNow()}</Text>
      </View>
      <Text style={styles.content}>
        {preview ? (post as Post).title : post.content}
      </Text>
      {(post as Post).image &&
        ((post as Post).image!.startsWith("file://") ? (
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: (post as Post).image! }}
          />
        ) : (
          <MockPhoto
            style={styles.image}
            resizeMode="cover"
            name="sleeping-baby"
          />
        ))}
      <View style={styles.toolBar}>
        <View style={styles.action}>
          {onLike ? (
            <ActionIconButton
              selected={liked}
              name="heart-outline"
              onPress={onLike}
            />
          ) : (
            <MaterialCommunityIcons
              name="heart-outline"
              color={Colors.greengrey}
              size={18}
            />
          )}
          <Text style={styles.actionText}>{post.likeCount}</Text>
        </View>
        {(post as Post).title !== undefined && (
          <View style={styles.action}>
            {onReply ? (
              <ActionIconButton
                selected={false}
                name="comment-outline"
                onPress={onReply}
              />
            ) : (
              <MaterialCommunityIcons
                name="comment-outline"
                color={Colors.greengrey}
                size={18}
              />
            )}
            <Text style={styles.actionText}>
              {(post as Post).replies.length}
            </Text>
          </View>
        )}
        <View style={styles.moreContainer}>
          {!preview && (
            <TouchableOpacity activeOpacity={0.5} onPress={onMore}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                color={Colors.greengrey}
                size={22}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return !preview && (post as Post).title ? (
    <BlueRingView borderRadius={20} ringWidth={4}>
      <View style={styles.blueRingView}>{view}</View>
    </BlueRingView>
  ) : (
    <Touchable style={[styles.container, style]} {...restProps}>
      {view}
    </Touchable>
  );
};

const ActionIconButton = ({
  selected,
  name,
  onPress,
}: React.ComponentProps<typeof MaterialCommunityIcons> & {
  selected?: boolean;
}) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={[
      styles.iconButtonContainer,
      selected && { backgroundColor: Colors.red },
    ]}
    onPress={onPress}
  >
    <MaterialCommunityIcons
      name={name}
      color={selected ? "white" : Colors.red}
      size={18}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: Colors.bluegreen,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 30,
  },
  blueRingView: {
    padding: 15,
  },
  title: {
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
    marginBottom: 6,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: Colors.darkgreen,
  },
  userInfo: {
    marginHorizontal: 12,
    paddingRight: 40,
  },
  description: {
    marginTop: 2,
    fontSize: FontSize.caption,
    color: Colors.greengrey,
  },
  time: {
    marginLeft: "auto",
    fontSize: FontSize.caption,
    color: Colors.greengrey,
    alignSelf: "flex-start",
    marginTop: 3.5,
  },
  content: {
    marginVertical: 8,
    lineHeight: 23,
  },
  toolBar: {
    flexDirection: "row",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  actionText: {
    marginLeft: 4,
    marginRight: 10,
    fontSize: FontSize.caption,
    color: Colors.greengrey,
    width: 20,
  },
  moreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  iconButtonContainer: {
    backgroundColor: "rgba(255, 105, 84, 0.2)",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 2,
  },
  topicContainer: {
    flexDirection: "row",
    marginTop: 0,
    marginBottom: 10,
  },
  topic: {
    marginRight: 4,
    marginBottom: 2,
  },
  username: {
    flexDirection: "row",
    alignItems: "center",
  },
  expertBadge: {
    marginLeft: 5,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 12,
  },
  expertsOnlyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  expertsOnlyText: {
    fontSize: FontSize.caption,
    fontFamily: "italic",
    marginLeft: 5,
    color: Colors.greengrey,
  },
});

export default PostCard;
