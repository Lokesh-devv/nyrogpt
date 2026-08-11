import { useTheme } from "../../theme";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const chats = [
  { id: "1", title: "React Native Help" },
  { id: "2", title: "Python Backend API" },
  { id: "3", title: "Resume Builder" },
  { id: "4", title: "AI Assistant" },
];

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatCard}
      onPress={() => navigation.navigate("App")}
    >
      <Ionicons
        name="chatbubble-ellipses-outline"
        size={22}
        color={colors.primary}
      />

      <Text style={styles.chatTitle}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons
            name="menu"
            size={28}
            color={colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="person-circle-outline"
            size={34}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Title */}

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Nyro GPT
        </Text>

        <Text style={styles.subtitle}>
          What can I help with today?
        </Text>
      </View>

      {/* New Chat */}

      <TouchableOpacity
        style={styles.newChatButton}
        onPress={() => navigation.navigate("App")}
      >
        <Ionicons
          name="add-circle-outline"
          size={22}
          color={colors.buttonText}
        />

        <Text style={styles.newChatText}>
          New Chat
        </Text>
      </TouchableOpacity>

      {/* Recent */}

      <Text style={styles.sectionTitle}>
        Recent Chats
      </Text>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleContainer: {
    marginTop: 45,
    marginBottom: 35,
  },

  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "700",
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 17,
    marginTop: 8,
  },

  newChatButton: {
    height: 58,
    backgroundColor: colors.primary,
    borderRadius: 16,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 35,
  },

  newChatText: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  chatCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.surface,

    borderRadius: 14,

    padding: 18,

    marginBottom: 12,
  },

  chatTitle: {
    color: colors.text,
    fontSize: 16,
    marginLeft: 15,
  },

});
