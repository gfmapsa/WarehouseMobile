import { Colors } from "@/shared/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { ReactNode, useState } from "react";
import {
  FlatList,
  Keyboard,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Chip, TextInput } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AppText from "../text/AppText";
import AppInput, { AppInputProps } from "./AppInput";

export type AutocompleteProps<T> = {
  data: T[];
  onSearch?: (query: string) => void;
  onSelect?: (item: T | T[]) => void;
  getLabel: (item: T) => string;
  renderOption: (item: T) => ReactNode;
  multiple?: boolean;
  value: string | T[];
  setValue: (val: string | T[]) => void;
};

export default function Autocomplete<T>({
  data,
  value,
  setValue,
  onSearch,
  onSelect,
  isLoading = false,
  getLabel,
  renderOption,
  multiple = false,
  ...props
}: AutocompleteProps<T> & AppInputProps) {
  const [showList, setShowList] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const [currentSearchValue, setCurrentSearchValue] = useState("");

  const selectedItems = Array.isArray(value) ? value : [];

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setInputHeight(height);
  };

  const handleSelectOption = (item: T) => {
    Keyboard.dismiss();
    setShowList(false);
    setIsFocused(false);

    if (multiple) {
      if (
        !selectedItems.some((selected) => getLabel(selected) === getLabel(item))
      ) {
        const newValue = [...selectedItems, item];
        setValue(newValue);
        onSelect && onSelect(newValue);
      }
      setCurrentSearchValue("");
    } else {
      const label = getLabel(item);
      setValue(label);
      onSelect && onSelect(item);
    }
  };

  const handleClear = () => {
    if (multiple) {
      setValue([]);
      setCurrentSearchValue("");
    } else {
      setValue("");
      onSearch && onSearch("");
    }
    setShowList(false);
  };

  const handleRemoveChip = (itemToRemove: T) => {
    Haptics.selectionAsync();

    const updatedItems = selectedItems.filter(
      (item) => getLabel(item) !== getLabel(itemToRemove)
    );
    setValue(updatedItems);
  };

  const showClearIcon = multiple
    ? selectedItems.length > 0 || currentSearchValue.length > 0
    : (value as string).length > 0;

  return (
    <View style={[styles.container, isFocused && { zIndex: 2000 }]}>
      <AppInput
        {...props}
        value={multiple ? currentSearchValue : (value as string)}
        setValue={
          multiple
            ? setCurrentSearchValue
            : (val) => setValue(val as T[] | string)
        }
        onChangeText={(text) => {
          if (multiple) {
            setCurrentSearchValue(text);
            onSearch && onSearch(text);
          } else {
            setValue(text);
            onSearch && onSearch(text);
          }
          setShowList(true);
        }}
        onFocus={() => {
          setIsFocused(true);
          setShowList(true);
        }}
        onBlur={() =>
          setTimeout(() => {
            setShowList(false);
            setIsFocused(false);
          }, 200)
        }
        onLayout={handleLayout}
        right={
          isLoading ? (
            <TextInput.Icon
              icon={() => <ActivityIndicator color={Colors.primary} />}
            />
          ) : showClearIcon ? (
            <TextInput.Icon
              icon={() => (
                <Ionicons name="close" size={hp("2%")} color={Colors.primary} />
              )}
              onPress={handleClear}
            />
          ) : null
        }
      />

      {multiple && selectedItems.length > 0 && (
        <View style={styles.chipsContainer}>
          {selectedItems.map((item, index) => (
            <Chip
              key={index.toString()}
              onClose={() => handleRemoveChip(item)}
              style={styles.chip}
            >
              <AppText>{getLabel(item)}</AppText>
            </Chip>
          ))}
        </View>
      )}

      {showList && (
        <>
          {data.length > 0 && !isLoading ? (
            <FlatList
              style={[styles.dropdown, { top: inputHeight }]}
              keyboardShouldPersistTaps="handled"
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectOption(item)}>
                  {renderOption(item)}
                </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={[
                styles.dropdown,
                styles.fallbackDropdown,
                { top: inputHeight },
              ]}
            >
              <AppText style={styles.fallbackText}>
                {isLoading ? "Buscando...." : "No se encontraron resultados"}
              </AppText>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  dropdown: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 5,
  },

  fallbackDropdown: {
    justifyContent: "center",
    padding: 10,
  },

  fallbackText: {
    color: Colors.primary,
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: hp("2%"),
  },

  chip: {
    marginRight: wp("1%"),
    marginBottom: hp("2%"),
    backgroundColor: Colors.primaryVariant,
  },
});
