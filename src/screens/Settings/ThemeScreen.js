import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Radius, Spacing, Typography, useTheme } from "../../theme";

export default function ThemeScreen({ navigation }) {
  const { theme, themes, colors, setTheme } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theme</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {Object.values(themes).map((item) => {
          const selected = theme === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.themeItem, selected && styles.selectedItem]}
              activeOpacity={0.8}
              onPress={() => setTheme(item.id)}
            >
              <View style={[styles.swatch, { backgroundColor: item.background }]}> 
                <View style={[styles.swatchSurface, { backgroundColor: item.surface }]} />
                <View style={[styles.swatchPrimary, { backgroundColor: item.primary }]} />
              </View>
              <Text style={styles.themeName}>{item.name}</Text>
              {selected && <Ionicons name="checkmark-circle" size={24} color={colors.primary} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 64,
    paddingHorizontal: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    width: 42,
  },
  headerTitle: {
    color: colors.text,
    fontSize: Typography.title,
    fontWeight: "700",
  },
  content: {
    padding: Spacing.lg,
  },
  themeItem: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  selectedItem: {
    borderColor: colors.primary,
  },
  swatch: {
    width: 54,
    height: 44,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 5,
    justifyContent: "space-between",
  },
  swatchSurface: {
    height: 12,
    borderRadius: Radius.sm,
  },
  swatchPrimary: {
    width: 20,
    height: 8,
    borderRadius: Radius.sm,
    alignSelf: "flex-end",
  },
  themeName: {
    flex: 1,
    marginLeft: Spacing.md,
    color: colors.text,
    fontSize: Typography.body,
    fontWeight: "600",
  },
});
