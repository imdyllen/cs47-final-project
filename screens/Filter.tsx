import { Picker } from "@react-native-picker/picker";
import { useCallback, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BlueButton from "../components/BlueButton";
import Chip from "../components/Chip";
import Text from "../components/Text";
import TextButton from "../components/TextButton";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { setFilters } from "../data/post";
import { useAppDispatch, useAppSelector } from "../data/store";
import { RootStackScreenProps } from "../types/navigation";

const ages = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24, 36, 48, 60, 72, 84, 96, 108,
  120, 132, 144, 156, 178, 180, 192, 204, 216,
];

const ageLabels = [
  "Newborn",
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months",
  "7 months",
  "8 months",
  "9 months",
  "10 months",
  "11 months",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "6 years",
  "7 years",
  "8 years",
  "9 years",
  "10 years",
  "11 years",
  "12 years",
  "13 years",
  "14 years",
  "15 years",
  "16 years",
  "17 years",
  "18 years",
];

export const childGenders = [
  "Female",
  "Male",
  "Non-binary",
  "Trans Female (MTF)",
  "Trans Male (FTM)",
  "Other",
] as const;

export const authorRoles = [
  "Mother",
  "Father",
  "Non-binary Parent",
  "Certified Expert",
  "Other",
] as const;

export const familyDynamics = [
  "Married",
  "Divorced",
  "LGBTQ+",
  "Single Parent",
  "Adopted Child",
  "Other",
] as const;

const FilterScreen: React.FC<RootStackScreenProps<"Filter">> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const filters = useAppSelector((state) => state.postState.filters);
  const dispatch = useAppDispatch();

  const [minAge, setMinAge] = useState(filters.minAge);
  const [maxAge, setMaxAge] = useState(filters.maxAge);
  const [gender, setGender] = useState<typeof childGenders[number] | null>(
    filters.childGender
  );
  const [role, setRole] = useState<typeof authorRoles[number] | null>(
    filters.authorRole
  );
  const [dynamic, setDynamic] = useState<typeof familyDynamics[number] | null>(
    filters.familyDynamic
  );

  const handleGenderSelect = (g: typeof childGenders[number]) => {
    if (g === gender) {
      setGender(null);
    } else {
      setGender(g);
    }
  };

  const handleRoleSelect = (r: typeof authorRoles[number]) => {
    if (r === role) {
      setRole(null);
    } else {
      setRole(r);
    }
  };

  const handleDynamicSelect = (d: typeof familyDynamics[number]) => {
    if (d === dynamic) {
      setDynamic(null);
    } else {
      setDynamic(d);
    }
  };

  const handleSave = useCallback(() => {
    dispatch(
      setFilters({
        filters: {
          minAge,
          maxAge,
          childGender: gender,
          authorRole: role,
          familyDynamic: dynamic,
        },
      })
    );
    navigation.goBack();
  }, [dispatch, dynamic, gender, maxAge, minAge, navigation, role]);

  const handleClear = () => {
    setMinAge(0);
    setMaxAge(216);
    setGender(null);
    setRole(null);
    setDynamic(null);
  };

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 60 }}
    >
      <View>
        <View>
          <Text style={styles.bold}>Child Age</Text>
          <View style={styles.pickers}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ageLabel}>Minimum</Text>
              <Picker
                selectedValue={minAge}
                onValueChange={(v) => {
                  setMinAge(v);
                  setMaxAge(v);
                }}
                itemStyle={styles.pickerText}
              >
                {ages.map((age, index) => (
                  <Picker.Item key={age} value={age} label={ageLabels[index]} />
                ))}
              </Picker>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.ageLabel, { alignSelf: "flex-end" }]}>
                Maximum
              </Text>
              <Picker
                selectedValue={maxAge}
                onValueChange={(v) => setMaxAge(v)}
                itemStyle={styles.pickerText}
              >
                {ages
                  .filter((a) => a >= minAge)
                  .map((age, index) => (
                    <Picker.Item
                      key={age}
                      value={age}
                      label={ageLabels[ages.findIndex((a) => a === age)]}
                    />
                  ))}
              </Picker>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.bold}>Child Gender</Text>
        <View style={styles.chips}>
          {childGenders.map((g) => (
            <Chip
              key={g}
              style={styles.chip}
              selected={g === gender}
              onPress={() => handleGenderSelect(g)}
            >
              {g}
            </Chip>
          ))}
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.bold}>Author Role</Text>
        <View style={styles.chips}>
          {authorRoles.map((r) => (
            <Chip
              key={r}
              style={styles.chip}
              selected={r === role}
              onPress={() => handleRoleSelect(r)}
            >
              {r}
            </Chip>
          ))}
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.bold}>Family Dynamic</Text>
        <View style={styles.chips}>
          {familyDynamics.map((d) => (
            <Chip
              key={d}
              style={styles.chip}
              selected={d === dynamic}
              onPress={() => handleDynamicSelect(d)}
            >
              {d}
            </Chip>
          ))}
        </View>
      </View>
      <BlueButton shadow style={styles.sectionContainer} onPress={handleClear}>
        Clear Filters
      </BlueButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: "white",
  },
  bold: {
    fontFamily: "semibold",
  },
  pickers: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerText: {
    fontSize: FontSize.normal,
  },
  ageLabel: {
    color: Colors.greengrey,
    fontSize: FontSize.caption,
  },
  sectionContainer: {
    marginTop: 20,
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
});

export default FilterScreen;
