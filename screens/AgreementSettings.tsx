import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Text from "../components/Text";
import TextButton from "../components/TextButton";
import FontSize from "../constants/FontSize";
import { setSettings } from "../data/agreement";
import { useAppDispatch, useAppSelector } from "../data/store";
import { RootStackScreenProps } from "../types/navigation";

const AgreementSettingsScreen: React.FC<
  RootStackScreenProps<"AgreementSettings">
> = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const originalTimer = useAppSelector(
    (state) => state.agreementState.settings.timer
  );
  const [timer, setTimer] = useState(originalTimer);

  const handleSave = useCallback(() => {
    dispatch(
      setSettings({
        settings: {
          timer,
        },
      })
    );
    navigation.goBack();
  }, [dispatch, navigation, timer]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TextButton
          style={{
            marginRight: 20,
          }}
          onPress={handleSave}
        >
          Save
        </TextButton>
      ),
    });
  }, [handleSave, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Default Timer</Text>
      <Picker
        selectedValue={timer}
        onValueChange={setTimer}
        itemStyle={styles.pickerText}
      >
        {Array(10)
          .fill(0)
          .map((v, i) => (
            <Picker.Item key={i} value={(i + 1) * 60} label={`${i + 1} min`} />
          ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  bold: {
    fontFamily: "semibold",
  },
  pickerText: {
    fontSize: FontSize.normal,
  },
});

export default AgreementSettingsScreen;
