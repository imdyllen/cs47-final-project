import { MaterialIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import dayjs from "dayjs";
import { useCallback, useLayoutEffect, useMemo } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import BlueRingView from "../components/BlueRingView";
import FloatingActionButton from "../components/FloatingActionButton";
import MockPhoto from "../components/MockPhoto";
import OrangeRingView from "../components/OrangeRingView";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import Text from "../components/Text";
import Touchable from "../components/Touchable";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { Filters } from "../data/post";
import { useAppSelector } from "../data/store";
import { TabScreenProps } from "../types/navigation";
import { Post } from "../types/state";

const generateGreeting = () => {
  const hour = new Date().getHours();
  return hour < 11
    ? "Good Morning"
    : hour < 16
    ? "Good Afternoon"
    : "Good Evening";
};

const emptyFilters = (filters: Filters) => {
  return (
    filters.minAge === 0 &&
    filters.maxAge === 216 &&
    filters.childGender === null &&
    filters.authorRole === null &&
    filters.familyDynamic === null
  );
};

const CommunityScreen: React.FC<TabScreenProps<"Community">> = ({
  navigation,
}) => {
  const tabBarHeight = useBottomTabBarHeight();

  const user = useAppSelector((state) => state.profileState.profile.user);
  const originalPosts = useAppSelector((state) => state.postState.posts);
  const filters = useAppSelector((state) => state.postState.filters);

  const filteredPosts = useMemo(() => {
    let posts = originalPosts;
    posts = posts.filter((p) => {
      if (p.author.expert) {
        return false;
      }
      return p.author.children.some((c) => {
        const months = dayjs().diff(c.birthday, "month");
        return months >= filters.minAge && months <= filters.maxAge;
      });
    });
    if (filters.childGender) {
      posts = posts.filter((p) => {
        if (p.author.expert) {
          return false;
        }
        return p.author.children.some((c) => {
          if (c.gender === "boy") {
            return filters.childGender === "Male";
          } else if (c.gender === "girl") {
            return filters.childGender === "Female";
          }
          return false;
        });
      });
    }
    if (filters.authorRole) {
      posts = posts.filter((p) => {
        if (p.author.expert && filters.authorRole === "Certified Expert") {
          return true;
        } else if (p.author.expert) {
          return false;
        }
        if (filters.authorRole === "Father" && p.author.gender === "male") {
          return true;
        }
        if (filters.authorRole === "Mother" && p.author.gender === "female") {
          return true;
        }
        return false;
      });
    }
    return posts;
  }, [
    filters.authorRole,
    filters.childGender,
    filters.maxAge,
    filters.minAge,
    originalPosts,
  ]);

  const handleSearchBarPress = () => {
    navigation.navigate("SearchStack", {
      screen: "Search",
      params: { type: "posts" },
    } as any);
  };

  const handleFilterPress = () => {
    navigation.navigate("Filter");
  };

  const handleNewPostPress = () => {
    navigation.navigate("NewPost");
  };

  const handleProfilePress = useCallback(() => {
    navigation.navigate("ProfileStack");
  }, [navigation]);

  const renderPostCard: ListRenderItem<Post> = ({ item }) => (
    <PostCard
      style={styles.postCard}
      preview
      post={item}
      onPress={() => navigation.push("CommunityThread", { postId: item.id })}
    />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Touchable onPress={handleProfilePress}>
          <BlueRingView
            style={styles.avatarContainer}
            borderRadius={20}
            ringWidth={1.5}
          >
            <MockPhoto
              name="dad"
              style={{ width: 32, height: 32, borderRadius: 16 }}
              width={32}
              height={32}
            />
          </BlueRingView>
        </Touchable>
      ),
    });
  }, [handleProfilePress, navigation]);

  return (
    <>
      <FlatList
        style={styles.list}
        contentContainerStyle={{
          paddingHorizontal: 20,
          marginTop: 35,
          paddingBottom: tabBarHeight + 60 + 55,
        }}
        data={filteredPosts}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {emptyFilters(filters) ? "No post yet" : "No post found"}
          </Text>
        }
        ListHeaderComponent={
          <View style={styles.listHeaderContainer}>
            <Text style={styles.greeting}>{`${generateGreeting()}, ${
              user.name
            }!`}</Text>
            <View style={styles.affirmationShadow}>
              <OrangeRingView borderRadius={20}>
                <Text style={styles.affirmationText}>
                  Be the parent you needed when you were younger.
                </Text>
              </OrangeRingView>
            </View>
            <View style={styles.filterRow}>
              <SearchBar
                style={styles.searchBar}
                inputDisabled
                onPress={handleSearchBarPress}
              />
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: emptyFilters(filters)
                      ? "transparent"
                      : Colors.orange,
                  },
                ]}
                onPress={handleFilterPress}
              >
                <MaterialIcons
                  name="filter-list"
                  color={emptyFilters(filters) ? Colors.bluegreen : "white"}
                  size={emptyFilters(filters) ? 32 : 26}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={renderPostCard}
        keyExtractor={(item) => item.id}
      />
      <FloatingActionButton
        style={{ position: "absolute", right: 15, bottom: 15 + tabBarHeight }}
        name="plus"
        onPress={handleNewPostPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listHeaderContainer: {
    flex: 1,
    marginBottom: 10,
  },
  emptyText: {
    marginVertical: 40,
    fontFamily: "italic",
    textAlign: "center",
  },
  greeting: {
    fontFamily: "medium",
    color: Colors.darkgreen,
    fontSize: FontSize.header,
  },
  affirmationShadow: {
    shadowColor: Colors.bluegreen,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    marginTop: 10,
  },
  affirmationText: {
    fontFamily: "semibold-italic",
    fontSize: FontSize.emphasis,
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterRow: {
    marginTop: 15,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    marginRight: 10,
    flex: 1,
  },
  filterButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    marginTop: -20,
  },
  postCard: {
    marginBottom: 15,
  },
  avatarContainer: {
    marginRight: 10,
  },
});

export default CommunityScreen;
