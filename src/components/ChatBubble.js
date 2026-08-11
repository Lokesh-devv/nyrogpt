import { useTheme } from "../theme";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatBubble({
  message,
  isUser = false,
}) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      {!isUser && (
        <View style={styles.avatar}>
          <Ionicons
            name="sparkles"
            size={18}
            color={colors.primary}
          />
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.message,
            { color: isUser ? colors.buttonText : colors.text },
          ]}
        >
          {message}
        </Text>
      </View>

      {isUser && (
        <View style={styles.userAvatar}>
          <Ionicons
            name="person"
            size={18}
            color={colors.buttonText}
          />
        </View>
      )}
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({

  container: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 12,
    alignItems: "flex-end",
  },

  aiContainer: {
    justifyContent: "flex-start",
  },

  userContainer: {
    justifyContent: "flex-end",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  bubble: {
    maxWidth: "78%",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  aiBubble: {
    backgroundColor: colors.surface,
  },

  userBubble: {
    backgroundColor: colors.primary,
  },

  message: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },

});
