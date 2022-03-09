import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AgreementCard from "../components/AgreementCard";
import Chip from "../components/Chip";
import IconButton from "../components/IconButton";
import PostCard from "../components/PostCard";
import PracticeCard from "../components/PracticeCard";
import SearchBar from "../components/SearchBar";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import mock from "../data/mock";
import { useAppSelector } from "../data/store";
import { SearchStackScreenProps } from "../types/navigation";
import { Agreement, Post, Practice } from "../types/state";

const postFuseOptions: Fuse.IFuseOptions<Post> = {
  keys: ["title", "content", "topics", "replies.content"],
};

const agreementFuseOptions: Fuse.IFuseOptions<Agreement> = {
  keys: ["title", "summary", "emoji"],
};

const practiceFuseOptions: Fuse.IFuseOptions<Practice> = {
  keys: ["topic", "description"],
};

const SearchScreen: React.FC<SearchStackScreenProps<"Search">> = ({
  navigation,
  route,
}) => {
  const type = route.params.type;
  const insets = useSafeAreaInsets();

  const posts = useAppSelector((state) => state.postState.posts);
  const agreements = useAppSelector((state) => state.agreementState.agreements);
  const practices = useAppSelector((state) => state.practiceState.practices);
  const progress = useAppSelector((state) => state.practiceState.progress);

  const [query, setQuery] = useState("");
  const [postResults, setPostResults] = useState<Post[]>([]);
  const [agreementResults, setAgreementResults] = useState<Agreement[]>([]);
  const [practiceResults, setPracticeResults] = useState<Practice[]>([]);

  const handleCancel = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (query) {
      if (type === "posts") {
        const fuse = new Fuse(posts, postFuseOptions);
        setPostResults(fuse.search(query).map((i) => i.item));
      }
      if (type === "agreements") {
        const fuse = new Fuse(agreements, agreementFuseOptions);
        setAgreementResults(fuse.search(query).map((i) => i.item));
      }
      if (type === "practices") {
        const fuse = new Fuse(practices, practiceFuseOptions);
        setPracticeResults(fuse.search(query).map((i) => i.item));
      }
    }
  }, [agreements, posts, practices, query, type]);

  const renderPostCard: ListRenderItem<Post> = ({ item }) => (
    <PostCard
      style={styles.card}
      preview
      post={item}
      onPress={() =>
        navigation.push("CommunityThread", {
          postId: item.id,
          fromSearch: true,
        })
      }
    />
  );

  const renderAgreementCard: ListRenderItem<Agreement> = ({ item }) => (
    <AgreementCard
      style={styles.card}
      agreement={item}
      onPress={() =>
        navigation.push("AgreementDetail", {
          agreementId: item.id,
        })
      }
    />
  );

  const renderPracticeCard: ListRenderItem<Practice> = ({ item }) => (
    <PracticeCard
      style={styles.card}
      practice={item}
      progress={progress[item.id]}
      onPress={() =>
        navigation.push("PracticePreview", {
          practiceId: item.id,
          topic: item.topic,
        })
      }
    />
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: query ? Colors.lightblue : "white" },
      ]}
    >
      <View style={styles.searchBarContainer}>
        <IconButton
          name="close"
          size={30}
          color={Colors.bluegreen}
          onPress={handleCancel}
        />
        <SearchBar
          style={styles.searchBar}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      {!query && route.params.type === "posts" && (
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={30}
        >
          <ScrollView>
            <View style={styles.sectionContainer}>
              <Text style={styles.bold}>Recommended Topics</Text>
              <View style={styles.chips}>
                {mock.recommendedTopics.map((topic) => (
                  <Chip
                    style={styles.chip}
                    key={topic}
                    onPress={() => setQuery(topic)}
                  >
                    #{topic}
                  </Chip>
                ))}
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.bold}>Trending Now</Text>
              <View style={styles.chips}>
                {mock.trendingTopics.map((topic) => (
                  <Chip
                    style={styles.chip}
                    key={topic}
                    onPress={() => setQuery(topic)}
                  >
                    #{topic}
                  </Chip>
                ))}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      {query ? (
        type === "posts" ? (
          <FlatList
            style={styles.list}
            contentContainerStyle={{
              marginTop: -20,
              paddingBottom: insets.bottom + 20,
            }}
            data={postResults}
            renderItem={renderPostCard}
            keyExtractor={(item) => item.id}
          />
        ) : type === "agreements" ? (
          <FlatList
            style={styles.list}
            contentContainerStyle={{
              marginTop: -20,
              paddingBottom: insets.bottom + 20,
            }}
            data={agreementResults}
            renderItem={renderAgreementCard}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <FlatList
            style={styles.list}
            contentContainerStyle={{
              marginTop: -20,
              paddingBottom: insets.bottom + 20,
            }}
            data={practiceResults}
            renderItem={renderPracticeCard}
            keyExtractor={(item) => item.id}
          />
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bold: {
    fontFamily: "semibold",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  searchBar: {
    flex: 1,
    marginLeft: 15,
  },
  sectionContainer: {
    marginTop: 10,
    padding: 10,
  },
  chips: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginBottom: 6,
    marginRight: 4,
  },
  card: {
    marginBottom: 15,
  },
  list: {
    paddingTop: 40,
    paddingHorizontal: 20,
    marginHorizontal: -20,
  },
});

export default SearchScreen;
