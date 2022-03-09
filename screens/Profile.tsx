import { useState } from "react";
import { NativeModules, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BlueButton from "../components/BlueButton";
import BlueRingView from "../components/BlueRingView";
import Dialog from "../components/Dialog";
import MockPhoto from "../components/MockPhoto";
import Text from "../components/Text";
import TextButton from "../components/TextButton";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { persistor, useAppSelector } from "../data/store";
import { getChildrenDescription } from "../lib/format";
import { ProfileStackScreenProps } from "../types/navigation";
import { Parent } from "../types/state";
import { UserSelection } from "./NewAgreement";

const ProfileScreen: React.FC<ProfileStackScreenProps<"Profile">> = () => {
  const insets = useSafeAreaInsets();

  const user = useAppSelector((state) => state.profileState.profile);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleEditPress = () => {
    handleDialogOpen();
  };

  const handleReset = async () => {
    await persistor.purge();
    persistor.persist();
    NativeModules.DevSettings.reload();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <BlueRingView
        style={styles.photoContainer}
        borderRadius={100}
        ringWidth={16}
      >
        <MockPhoto style={styles.photo} name={user.user.photo} />
      </BlueRingView>
      <BlueRingView borderRadius={20}>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{user.user.name}</Text>
          <Text>{getChildrenDescription(user.user as Parent)}</Text>
        </View>
      </BlueRingView>
      <Text style={styles.sectionText}>My Family</Text>
      {user.spouse && (
        <UserSelection style={styles.userBox} user={user.spouse} />
      )}
      {user.children?.map((c) => (
        <UserSelection style={styles.userBox} key={c.user.id} user={c} />
      ))}
      <BlueButton shadow style={styles.editButton} onPress={handleEditPress}>
        Edit
      </BlueButton>
      <TextButton style={styles.resetButton} onPress={handleReset}>
        Reset App (DEV ONLY)
      </TextButton>
      <Dialog isVisible={dialogOpen} title="Unimplemented" type="success">
        <Text style={styles.dialogText}>
          This feature has not been implemented.
        </Text>
        <BlueButton
          style={styles.dialogButton}
          selected
          onPress={handleDialogClose}
        >
          Ok
        </BlueButton>
      </Dialog>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.lightblue,
  },
  photoContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  photo: {
    width: 152,
    height: 152,
    borderRadius: 76,
  },
  infoContainer: {
    padding: 15,
    alignItems: "center",
  },
  nameText: {
    fontSize: FontSize.header,
    fontFamily: "semibold",
    marginBottom: 8,
    marginTop: -4,
  },
  sectionText: {
    fontFamily: "semibold",
    marginTop: 20,
  },
  editButton: {
    marginTop: 40,
  },
  resetButton: {
    marginTop: 40,
  },
  dialogText: {
    marginTop: 10,
  },
  dialogButton: {
    marginTop: 20,
  },
  userBox: {
    marginTop: 10,
  },
});

export default ProfileScreen;
