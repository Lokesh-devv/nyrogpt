import React, { memo, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Markdown from "react-native-markdown-display";

import { Radius, Spacing, Typography, useTheme } from "../theme";

function MessageBubble({ message, onCopy, onEdit, onRegenerate }) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isUser = message.role === "user";
  const messageText =
    typeof message.text === "string"
      ? message.text
      : message.text == null
        ? ""
        : JSON.stringify(message.text);
  const markdownStyles = useMemo(
    () => createMarkdownStyles(colors, colors.text),
    [colors]
  );
  const segments = useMemo(() => splitCodeBlocks(messageText), [messageText]);
  const hasCode = segments.some((segment) => segment.type === "code");
  const details = message.details || {};
  const mediaKind = (item) => String(item?.media_kind || item?.type || "").toLowerCase();
  const generatedImage = details.generated_image;
  const generatedVideo = details.generated_video;
  const generatedDocument = details.generated_document;
  const localImageAttachment = details.attachments?.find(
    (item) =>
      ["image", "images"].includes(mediaKind(item)) &&
      (item.uri || item.thumbnail_url || item.link)
  );
  const localVideoAttachment = details.attachments?.find(
    (item) =>
      ["video", "videos"].includes(mediaKind(item)) &&
      (item.uri || item.thumbnail_url || item.link)
  );
  const localDocumentAttachment = details.attachments?.find(
    (item) =>
      ["file", "files", "document"].includes(mediaKind(item)) &&
      (item.uri || item.file_url || item.link)
  );
  const localAudioAttachment = details.attachments?.find(
    (item) => ["audio", "recording"].includes(mediaKind(item))
  );
  const imageUrl =
    generatedImage?.image_url ||
    generatedImage?.thumbnail_url ||
    generatedImage?.link ||
    localImageAttachment?.uri ||
    localImageAttachment?.thumbnail_url ||
    localImageAttachment?.link;
  const videoUrl =
    generatedVideo?.video_url ||
    generatedVideo?.url ||
    generatedVideo?.link ||
    localVideoAttachment?.uri ||
    localVideoAttachment?.thumbnail_url ||
    localVideoAttachment?.link;
  const videoThumbnail =
    generatedVideo?.thumbnail_url ||
    generatedVideo?.thumbnail ||
    generatedVideo?.poster_url ||
    localVideoAttachment?.thumbnail_url ||
    localVideoAttachment?.uri;
  const documentUrl =
    generatedDocument?.document_url ||
    generatedDocument?.file_url ||
    generatedDocument?.url ||
    generatedDocument?.link ||
    localDocumentAttachment?.uri ||
    localDocumentAttachment?.file_url ||
    localDocumentAttachment?.link;
  const documentName =
    generatedDocument?.filename ||
    generatedDocument?.name ||
    generatedDocument?.title ||
    localDocumentAttachment?.original_name ||
    localDocumentAttachment?.name ||
    "Generated file";
  const audioUrl =
    localAudioAttachment?.uri ||
    localAudioAttachment?.file_url ||
    localAudioAttachment?.url ||
    localAudioAttachment?.link;
  const audioName =
    localAudioAttachment?.original_name || localAudioAttachment?.name || "Audio recording";
  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const copyText = async (text, successMessage = "Copied.") => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied", successMessage);
  };

  const openUrl = async (url) => {
    if (!url) return;

    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Unable to open", "Please try again.");
    }
  };

  const previewImage = () => {
    if (!imageUrl) return;

    navigation.navigate("ImagePreview", {
      image: imageUrl,
      title: generatedImage?.title || "Generated Image",
      prompt: generatedImage?.prompt,
    });
  };

  const previewFile = () => {
    if (!documentUrl) return;

    navigation.navigate("FilePreview", {
      file: {
        name: documentName,
        type: getFileType(documentName),
        size: formatBytes(generatedDocument?.size_bytes || generatedDocument?.size),
        modified: generatedDocument?.created_at || "",
        url: documentUrl,
      },
    });
  };

  const renderText = () => {
    if (segments.length === 0) {
      return <Markdown style={markdownStyles}>{messageText}</Markdown>;
    }

    return segments.map((segment, index) => {
      if (segment.type === "code") {
        return (
          <View key={`${segment.type}-${index}`} style={styles.codeBlock}>
            <View style={styles.codeHeader}>
              <Text style={styles.codeLanguage}>{segment.language || "code"}</Text>
              <TouchableOpacity
                style={styles.codeCopy}
                onPress={() => copyText(segment.content, "Code copied.")}
              >
                <Ionicons name="copy-outline" size={15} color={colors.textSecondary} />
                <Text style={styles.codeCopyText}>Copy</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.codeScrollContent}
            >
              <Text selectable style={styles.codeText}>{segment.content}</Text>
            </ScrollView>
          </View>
        );
      }

      return (
        <Markdown key={`${segment.type}-${index}`} style={markdownStyles}>
          {segment.content}
        </Markdown>
      );
    });
  };

  const renderActions = (actions, iconOnly = false) => (
    <View style={styles.mediaActions}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.label}
          activeOpacity={0.85}
          style={iconOnly ? styles.messageAction : styles.mediaAction}
          onPress={action.onPress}
        >
          <Ionicons name={action.icon} size={16} color={colors.textSecondary} />
          {!iconOnly && <Text style={styles.mediaActionText}>{action.label}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMessageActions = () => {
    const actions = [];

    // Code responses expose Copy on each code block, matching ChatGPT's UI.
    // Avoid a second message-level Copy action that also copies surrounding prose/examples.
    if (onCopy && (isUser || !hasCode)) {
      actions.push({ icon: "copy-outline", label: "Copy", onPress: () => onCopy(message) });
    }

    if (isUser && onEdit) {
      actions.push({ icon: "create-outline", label: "Edit", onPress: () => onEdit(message) });
    }

    if (!isUser && onRegenerate) {
      actions.push({ icon: "refresh-outline", label: "Regenerate", onPress: () => onRegenerate(message) });
    }

    if (actions.length === 0) return null;

    return (
      <View style={[styles.actionRow, isUser ? styles.userActionRow : styles.aiActionRow]}>
        {renderActions(actions, true)}
      </View>
    );
  };

  return (
    <View style={[styles.row, isUser ? styles.userRow : styles.aiRow]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Ionicons name="sparkles" size={16} color={colors.text} />
        </View>
      )}

      <View style={styles.stack}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
          {renderText()}

          {Boolean(imageUrl) && (
            <View style={styles.mediaCard}>
              <TouchableOpacity activeOpacity={0.9} onPress={previewImage}>
                <ImageWithLoader uri={imageUrl} styles={styles} colors={colors} />
              </TouchableOpacity>
              {renderActions([
                { label: "Preview", icon: "expand-outline", onPress: previewImage },
                { label: "Download", icon: "download-outline", onPress: () => openUrl(imageUrl) },
              ])}
            </View>
          )}

          {Boolean(videoUrl) && (
            <View style={styles.mediaCard}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.videoBox}
                onPress={() =>
                  navigation.navigate("FilePreview", {
                    file: {
                      name: generatedVideo?.title || "Video",
                      type: "VIDEO",
                      size: formatBytes(generatedVideo?.size_bytes || generatedVideo?.size),
                      modified: generatedVideo?.created_at || "",
                      url: videoUrl,
                    },
                  })
                }
              >
                {videoThumbnail ? (
                  <Image source={{ uri: videoThumbnail }} style={styles.videoThumbnail} />
                ) : (
                  <Ionicons name="videocam-outline" size={34} color={colors.textSecondary} />
                )}
                <View style={styles.playButton}>
                  <Ionicons name="play" size={20} color={colors.buttonText} />
                </View>
              </TouchableOpacity>
              {renderActions([
                {
                  label: "Preview",
                  icon: "expand-outline",
                  onPress: () =>
                    navigation.navigate("FilePreview", {
                      file: {
                        name: generatedVideo?.title || "Video",
                        type: "VIDEO",
                        size: formatBytes(generatedVideo?.size_bytes || generatedVideo?.size),
                        modified: generatedVideo?.created_at || "",
                        url: videoUrl,
                      },
                    }),
                },
                { label: "Download", icon: "download-outline", onPress: () => openUrl(videoUrl) },
              ])}
            </View>
          )}

          {Boolean(documentUrl) && (
            <View style={styles.fileCard}>
              <View style={styles.fileTop}>
                <View style={styles.fileIcon}>
                  <Ionicons name="document-text-outline" size={22} color={colors.primary} />
                </View>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {documentName}
                  </Text>
                  <Text style={styles.fileMeta}>
                    {getFileType(documentName)} •{" "}
                    {formatBytes(generatedDocument?.size_bytes || generatedDocument?.size)}
                  </Text>
                </View>
              </View>
              {renderActions([
                { label: "Preview", icon: "eye-outline", onPress: previewFile },
                { label: "Download", icon: "download-outline", onPress: () => openUrl(documentUrl) },
                { label: "Share", icon: "share-social-outline", onPress: () => openUrl(documentUrl) },
              ])}
            </View>
          )}

          {Boolean(localAudioAttachment) && (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.fileCard}
              disabled={!audioUrl}
              onPress={() =>
                navigation.navigate("FilePreview", {
                  file: { name: audioName, type: "AUDIO", size: "", modified: "", url: audioUrl },
                })
              }
            >
              <View style={styles.fileTop}>
                <View style={styles.fileIcon}>
                  <Ionicons name="musical-notes-outline" size={22} color={colors.primary} />
                </View>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName} numberOfLines={1}>{audioName}</Text>
                  <Text style={styles.fileMeta}>Audio attachment</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {renderMessageActions()}

        <View style={[styles.meta, isUser ? styles.userMeta : styles.aiMeta]}>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      {isUser && (
        <View style={styles.userAvatar}>
          <Ionicons name="person" size={16} color={colors.text} />
        </View>
      )}
    </View>
  );
}

function ImageWithLoader({ uri, styles, colors }) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.imageFrame}>
      <Image
        source={{ uri }}
        style={styles.generatedImage}
        resizeMode="cover"
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.imagePlaceholder}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )}
    </View>
  );
}

const splitCodeBlocks = (text) => {
  const regex = /```([^\n`]*)\n?([\s\S]*?)```/g;
  const segments = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }

    segments.push({
      type: "code",
      language: match[1]?.trim(),
      content: match[2]?.trimEnd() || "",
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) });
  }

  return segments.filter((segment) => segment.content.trim().length > 0);
};

const formatBytes = (bytes) => {
  const size = Number(bytes);

  if (!Number.isFinite(size) || size <= 0) return "Unknown size";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileType = (name = "") => {
  const extension = String(name).split(".").pop();
  return extension && extension !== name ? extension.toUpperCase() : "FILE";
};

export default memo(MessageBubble);

const createStyles = (colors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: Spacing.md,
    },
    aiRow: {
      justifyContent: "flex-start",
    },
    userRow: {
      justifyContent: "flex-end",
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: Spacing.sm,
      marginTop: 0,
    },
    userAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surfaceLight,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: Spacing.sm,
      marginTop: 0,
    },
    stack: {
      maxWidth: "82%",
    },
    bubble: {
      borderRadius: Radius.lg,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    aiBubble: {
      backgroundColor: colors.aiBubble,
    },
    userBubble: {
      backgroundColor: colors.aiBubble,
      borderTopRightRadius: 6,
    },
    meta: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 4,
    },
    aiMeta: {
      justifyContent: "flex-start",
    },
    userMeta: {
      justifyContent: "flex-end",
    },
    time: {
      color: colors.textMuted,
      fontSize: Typography.small,
    },
    actionRow: {
      marginTop: 6,
    },
    userActionRow: {
      justifyContent: "flex-end",
    },
    aiActionRow: {
      justifyContent: "flex-start",
    },
    mediaActions: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 8,
    },
    mediaAction: {
      minHeight: 34,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      marginRight: 8,
      marginBottom: 8,
    },
    messageAction: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 8,
    },
    regenerateText: {
      color: colors.textSecondary,
      fontSize: Typography.small,
      fontWeight: "600",
      marginLeft: 4,
    },
    codeBlock: {
      overflow: "hidden",
      borderRadius: 12,
      backgroundColor: colors.isDark ? colors.background : colors.accent,
      borderWidth: 1,
      borderColor: colors.border,
      marginVertical: 8,
    },
    codeHeader: {
      minHeight: 36,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.isDark ? colors.surface : colors.surface,
    },
    codeLanguage: {
      color: colors.textSecondary,
      fontSize: Typography.small,
      fontWeight: "700",
    },
    codeCopy: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      paddingLeft: 10,
    },
    codeCopyText: {
      color: colors.textSecondary,
      fontSize: Typography.small,
      fontWeight: "600",
      marginLeft: 5,
    },
    codeText: {
      color: colors.text,
      fontSize: 14,
      lineHeight: 22,
      fontFamily: Platform.select({ ios: "Menlo", android: "monospace", web: "monospace" }),
    },
    codeScrollContent: {
      padding: 12,
    },
    mediaCard: {
      marginTop: 4,
    },
    imageFrame: {
      width: 260,
      height: 260,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: colors.surfaceLight,
    },
    generatedImage: {
      width: "100%",
      height: "100%",
    },
    imagePlaceholder: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.surfaceLight,
    },
    videoBox: {
      width: 260,
      height: 150,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: colors.surfaceLight,
      justifyContent: "center",
      alignItems: "center",
    },
    videoThumbnail: {
      width: "100%",
      height: "100%",
    },
    playButton: {
      position: "absolute",
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    fileCard: {
      marginTop: 8,
      padding: 12,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    fileTop: {
      flexDirection: "row",
      alignItems: "center",
    },
    fileIcon: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: colors.accent,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    fileInfo: {
      flex: 1,
    },
    fileName: {
      color: colors.text,
      fontSize: Typography.body,
      fontWeight: "700",
    },
    fileMeta: {
      color: colors.textSecondary,
      fontSize: Typography.small,
      marginTop: 3,
    },
  });

const createMarkdownStyles = (colors, textColor) => ({
  body: {
    color: textColor,
    fontSize: Typography.body,
    lineHeight: 26,
  },
  paragraph: {
    color: textColor,
    marginBottom: 8,
    lineHeight: 26,
    fontSize: Typography.body,
  },
  heading1: {
    color: textColor,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },
  heading2: {
    color: textColor,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  heading3: {
    color: textColor,
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 8,
  },
  strong: {
    color: textColor,
    fontWeight: "700",
  },
  em: {
    color: textColor,
    fontStyle: "italic",
  },
  bullet_list: {
    marginVertical: 6,
  },
  ordered_list: {
    marginVertical: 6,
  },
  list_item: {
    color: textColor,
    marginBottom: 6,
  },
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    paddingLeft: 12,
    marginVertical: 10,
    opacity: 0.9,
  },
  code_inline: {
    backgroundColor: colors.isDark ? colors.background : colors.accent,
    color: colors.text,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    fontSize: 14,
  },
});
