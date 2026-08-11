import { useTheme } from "../../theme";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";

import ChatHeader from "../../components/ChatHeader";
import MessageBubble from "../../components/MessageBubble";
import MessageInput from "../../components/MessageInput";
import EmptyChat from "../../components/EmptyChat";
import TypingIndicator from "../../components/TypingIndicator";
import { createChat, respond } from "../../api/chatApi";
import { getErrorMessage } from "../../api/apiError";
import { mapChat } from "../../api/chatMapper";
import { uploadFile } from "../../api/uploadApi";
import { useChats } from "../../contexts/ChatContext";

export default function ChatScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const {
    conversations,
    setConversations,
    activeConversationId,
    setActiveConversationId,
    createNewDraft,
  } = useChats();


  /* -------------------------------------------------- */
  /* Refs                                               */
  /* -------------------------------------------------- */

  const flatListRef = useRef(null);
  const isUserInteractingRef = useRef(false);
  const userScrolledUpRef = useRef(false);
  const shouldAutoScrollRef = useRef(false);
  const abortControllerRef = useRef(null);
  const sendInFlightRef = useRef(false);

  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);

  /* -------------------------------------------------- */
  /* UI State                                           */
  /* -------------------------------------------------- */

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [typing, setTyping] = useState(false);

  /* -------------------------------------------------- */
  /* Input State                                        */
  /* -------------------------------------------------- */

  const [input, setInput] = useState("");

  const [attachment, setAttachment] = useState(null);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder, 250);
  const [isRecording, setIsRecording] = useState(false);

  /* -------------------------------------------------- */
  /* Conversation State                                 */
  /* -------------------------------------------------- */

  /* -------------------------------------------------- */
  /* Active Conversation                                */
  /* -------------------------------------------------- */

  const activeConversation =
    conversations.find(
      (conversation) => conversation.id === activeConversationId
    ) || conversations[0];

  /* -------------------------------------------------- */
  /* Auto Scroll                                        */
  /* -------------------------------------------------- */

  const scheduleAutoScroll = useCallback(() => {
    if (!shouldAutoScrollRef.current || userScrolledUpRef.current || isUserInteractingRef.current) {
      return;
    }

    shouldAutoScrollRef.current = false;

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
      setShowScrollBottom(false);
    });
  }, []);

  const handleScrollBegin = useCallback(() => {
    isUserInteractingRef.current = true;
  }, []);

  const handleScrollEnd = useCallback(() => {
    isUserInteractingRef.current = false;
  }, []);

  const handleScroll = useCallback(({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    const layoutHeight = nativeEvent.layoutMeasurement.height;
    const contentHeight = nativeEvent.contentSize.height;
    const distanceFromBottom = contentHeight - (offsetY + layoutHeight);
    const atBottom = distanceFromBottom <= 24;

    setShowScrollBottom(!atBottom);
    userScrolledUpRef.current = !atBottom;
  }, []);

  useEffect(() => {
    shouldAutoScrollRef.current = true;
    userScrolledUpRef.current = false;
    isUserInteractingRef.current = false;
    setShowScrollBottom(false);
  }, [activeConversation?.id]);

  useEffect(() => {
    if (!activeConversation?.messages?.length || !shouldAutoScrollRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      scheduleAutoScroll();
    }, 150);

    return () => clearTimeout(timer);
  }, [activeConversation?.id, activeConversation?.messages?.length, scheduleAutoScroll]);

  /* -------------------------------------------------- */
  /* Drawer                                              */
  /* -------------------------------------------------- */

  const handleOpenDrawer = () => {

    Keyboard.dismiss();
    requestAnimationFrame(() => navigation.openDrawer());

  };

  /* -------------------------------------------------- */
  /* New Chat                                            */
  /* -------------------------------------------------- */

  const handleNewChat = () => {
    createNewDraft();
  };

  /* -------------------------------------------------- */
  /* More Menu                                           */
  /* -------------------------------------------------- */

  const handleProfile = () => navigation.navigate("Profile");

  /* -------------------------------------------------- */
  /* Select Conversation                                 */
  /* -------------------------------------------------- */

  const handleConversationSelect = (id) => {

    setActiveConversationId(id);

  };

  /* -------------------------------------------------- */
  /* Copy Message                                        */
  /* -------------------------------------------------- */

  const handleCopy = useCallback(async (message) => {
    try {
      await Clipboard.setStringAsync(message.text || "");
      Alert.alert("Copied", "Message copied to clipboard.");
    } catch {
      Alert.alert("Unable to copy", "Please try again.");
    }
  }, []);

  const handleEdit = useCallback((message) => {
    setInput(message.text || "");
    setEditingMessageId(message.id);
    shouldAutoScrollRef.current = false;
  }, []);

  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
    setTyping(false);
  }, []);

  /* -------------------------------------------------- */
  /* Regenerate Response                                 */
  /* -------------------------------------------------- */

  const handleRegenerate = (message) => {

    console.log(message);

  };

  /* -------------------------------------------------- */
  /* Attachment                                           */
  /* -------------------------------------------------- */

  const handleAttachment = async (type) => {
    try {
      if (type === "images" || type === "videos") {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
          Alert.alert(
            "Permission required",
            "Allow photo library access to select media."
          );
          return;
        }

        const mediaTypes = type === "images" ? "images" : "videos";

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes,
          allowsMultipleSelection: false,
          quality: 1,
        });

        const asset = result.assets?.[0];
        const isSuccess = !result.canceled;

        if (isSuccess && asset?.uri) {
          setAttachment({
            uri: asset.uri,
            name:
              asset.fileName || asset.name ||
              (type === "images" ? "Image" : "Video"),
            type,
            mimeType:
              asset.mimeType ||
              (type === "images" ? "image/jpeg" : "video/mp4"),
          });
        }

        return;
      }

      const result = await DocumentPicker.getDocumentAsync({
        type: type === "audio" ? "audio/*" : "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        setAttachment({
          uri: asset.uri,
          name: asset.name,
          type,
          mimeType: asset.mimeType || (type === "audio" ? "audio/mpeg" : "application/octet-stream"),
          size: asset.size,
        });
      }
    } catch (error) {
      Alert.alert("Unable to attach", "Please try selecting the item again.");
    }
  };

  const handlePreviewAttachment = () => {
    if (!attachment) return;

    if (attachment.type === "images") {
      navigation.navigate("ImagePreview", {
        image: attachment.uri,
        title: attachment.name,
        prompt: attachment.name,
      });
      return;
    }

    navigation.navigate("FilePreview", {
      file: {
        name: attachment.name,
        type: attachment.type === "videos" ? "VIDEO" : attachment.type.toUpperCase(),
        size: attachment.size ? `${attachment.size} bytes` : "Unknown size",
        modified: "",
        url: attachment.uri,
      },
    });
  };

  /* -------------------------------------------------- */
  /* Voice                                                */
  /* -------------------------------------------------- */

  const handleVoice = async () => {
    try {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission required", "Allow microphone access to record audio.");
        return;
      }
      await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setIsRecording(true);
    } catch (error) {
      Alert.alert("Unable to record", getErrorMessage(error));
    }
  };

  const handleCancelRecording = async () => {
    try {
      await audioRecorder.stop();
    } catch {}
    setIsRecording(false);
    await setAudioModeAsync({ allowsRecording: false }).catch(() => {});
  };

  const handleStopRecording = async () => {
    try {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;
      if (!uri) throw new Error("The recording file was not created.");
      const isWeb = Platform.OS === "web";
      setAttachment({
        uri,
        name: `Recording-${Date.now()}.${isWeb ? "webm" : "m4a"}`,
        type: "audio",
        mimeType: isWeb ? "audio/webm" : "audio/mp4",
      });
      setIsRecording(false);
      await setAudioModeAsync({ allowsRecording: false });
    } catch (error) {
      Alert.alert("Unable to save recording", getErrorMessage(error));
    }
  };

    /* -------------------------------------------------- */
  /* Update Conversation Messages                        */
  /* -------------------------------------------------- */

  const updateConversationMessages = useCallback(
    (conversationId, newMessage) => {
      setConversations((previous) =>
        previous.map((conversation) => {
          if (conversation.id !== conversationId) {
            return conversation;
          }

          return {
            ...conversation,
            updatedAt: new Date().toISOString(),
            messages: [
              ...conversation.messages,
              newMessage,
            ],
          };
        })
      );
    },
    []
  );

  /* -------------------------------------------------- */
  /* Update Conversation Title                           */
  /* -------------------------------------------------- */

  const updateConversationTitle = useCallback(
    (conversationId, title) => {
      setConversations((previous) =>
        previous.map((conversation) => {
          if (conversation.id !== conversationId) {
            return conversation;
          }

          return {
            ...conversation,
            title,
          };
        })
      );
    },
    []
  );

  /* -------------------------------------------------- */
  /* Send Message                                        */
  /* -------------------------------------------------- */

  const handleSend = async () => {
    const text = input.trim();

    if ((!text && !attachment) || loading || sendInFlightRef.current) return;

    // State updates are asynchronous, so use a ref to close the duplicate-tap
    // window before chat creation or attachment upload begins.
    sendInFlightRef.current = true;
    setSubmitting(true);

    let conversationId = activeConversationId;
    let conversation = activeConversation;

    if (!conversationId || conversationId.startsWith("local-")) {
      try {
        const title =
          text.substring(0, 30) || attachment?.name?.substring(0, 30) || "New chat";
        const created = mapChat(await createChat(title));
        const localId = conversationId;
        setConversations((previous) => [
          created,
          ...previous.filter((item) => item.id !== localId),
        ]);
        setActiveConversationId(created.id);
        conversationId = created.id;
        conversation = created;
      } catch (error) {
        Alert.alert("Unable to create chat", getErrorMessage(error));
        sendInFlightRef.current = false;
        setSubmitting(false);
        return;
      }
    }

    let attachmentIds = [];

    if (attachment) {
      try {
        const uploadResult = await uploadFile({
          chatId: conversationId,
          file: {
            uri: attachment.uri,
            name: attachment.name || "attachment",
            type: attachment.mimeType || "application/octet-stream",
          },
        });
        const uploadedAttachment = uploadResult?.attachment || uploadResult;
        attachmentIds = uploadedAttachment?.id ? [uploadedAttachment.id] : [];
        if (!attachmentIds.length) {
          throw new Error("The upload completed without an attachment ID.");
        }
        attachment.server = uploadedAttachment;
      } catch (error) {
        Alert.alert("Unable to upload file", getErrorMessage(error));
        sendInFlightRef.current = false;
        setSubmitting(false);
        return;
      }
    }

    const isEditing = Boolean(editingMessageId);
    const userMessage = {
      id: editingMessageId || Date.now().toString(),
      role: "user",
      text,
      details: attachment
        ? {
            attachments: [
              {
                original_name: attachment.name,
                mime_type: attachment.mimeType,
                media_kind: attachment.type,
                id: attachment.server?.id,
                uri: attachment.server?.url || attachment.server?.file_url || attachment.uri,
                file_url: attachment.server?.file_url || attachment.server?.url,
                thumbnail_url: attachment.server?.thumbnail_url || attachment.uri,
              },
            ],
          }
        : {},
      createdAt: new Date().toISOString(),
    };

    shouldAutoScrollRef.current = true;

    setConversations((previous) =>
      previous.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        return {
          ...conversation,
          updatedAt: new Date().toISOString(),
          messages: isEditing
            ? conversation.messages.map((message) =>
                message.id === editingMessageId ? { ...message, text } : message
              )
            : [...conversation.messages, userMessage],
        };
      })
    );

    if (conversation?.title === "New Chat") {
      updateConversationTitle(
        conversationId,
        text.substring(0, 30) || attachment?.name?.substring(0, 30) || "New Chat"
      );
    }

    setInput("");
    setAttachment(null);
    setEditingMessageId(null);
    setLoading(true);
    setTyping(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const result = await respond({
        chatId: conversationId,
        prompt: text,
        attachmentIds,
        signal: controller.signal,
      });
      const updatedChat = mapChat(result.chat);
      const serverUserMessage = [...updatedChat.messages].reverse().find(
        (message) => message.role === "user" && message.text === userMessage.text
      );
      if (attachment && serverUserMessage) {
        const persisted = serverUserMessage.details?.attachments;
        if (!Array.isArray(persisted) || persisted.length === 0) {
          serverUserMessage.details = userMessage.details;
        }
      }
      shouldAutoScrollRef.current = true;
      setConversations((previous) =>
        previous.map((item) => (item.id === conversationId ? updatedChat : item))
      );
    } catch (error) {
      shouldAutoScrollRef.current = true;

      if (error.name !== "CanceledError" && error.name !== "AbortError") {
        updateConversationMessages(conversationId, {
          id: Date.now().toString(),
          role: "assistant",
          text: getErrorMessage(error, "Something went wrong. Please try again."),
          createdAt: new Date().toISOString(),
        });
      }
    } finally {
      abortControllerRef.current = null;
      setTyping(false);
      setLoading(false);
      sendInFlightRef.current = false;
      setSubmitting(false);
    }
  };

  /* -------------------------------------------------- */
  /* FlatList Render                                     */
  /* -------------------------------------------------- */

  const renderMessage = useCallback(
    ({ item }) => {
      return (
        <MessageBubble
          message={item}
          onCopy={handleCopy}
          onEdit={item.role === "user" ? handleEdit : undefined}
          onRegenerate={handleRegenerate}
        />
      );
    },
    [handleCopy, handleEdit, handleRegenerate]
  );

  /* -------------------------------------------------- */
  /* FlatList Key                                        */
  /* -------------------------------------------------- */

  const keyExtractor = useCallback((item) => item.id, []);

  /* -------------------------------------------------- */
  /* Render Empty                                        */
  /* -------------------------------------------------- */

  const renderEmpty = useCallback(() => {
    return (
      <EmptyChat
        title="Nyro GPT"
        subtitle="How can I help you today?"
      />
    );
  }, []);

  /* -------------------------------------------------- */
  /* Screen                                              */
  /* -------------------------------------------------- */

  return (

    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>

      <StatusBar
        barStyle={colors.isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ChatHeader

        title="Nyro GPT"

        online={true}

        onMenuPress={handleOpenDrawer}

        onNewChat={handleNewChat}

        onProfilePress={handleProfile}

      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >

        <FlatList
          ref={flatListRef}
          data={activeConversation?.messages || []}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={typing ? <TypingIndicator /> : null}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          initialNumToRender={15}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
          extraData={[typing, activeConversation?.messages?.length]}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onScrollBeginDrag={handleScrollBegin}
          onMomentumScrollBegin={handleScrollBegin}
          onScrollEndDrag={handleScrollEnd}
          onMomentumScrollEnd={handleScrollEnd}
          onContentSizeChange={scheduleAutoScroll}
        />

        {showScrollBottom && (
          <TouchableOpacity
            style={styles.scrollToBottom}
            activeOpacity={0.9}
            onPress={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
              setShowScrollBottom(false);
              userScrolledUpRef.current = false;
            }}
          >
            <Ionicons name="chevron-down-outline" size={20} color={colors.primary || colors.text} />
          </TouchableOpacity>
        )}

        <MessageInput
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
          onAttachment={handleAttachment}
          onPreviewAttachment={handlePreviewAttachment}
          attachment={attachment}
          onRemoveAttachment={() => setAttachment(null)}
          onVoice={handleVoice}
          isRecording={isRecording}
          recordingDuration={recorderState.durationMillis || 0}
          onCancelRecording={handleCancelRecording}
          onStopRecording={handleStopRecording}
          disabled={loading || submitting}
          isGenerating={typing}
          onStop={handleStop}
        />

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

}

const createStyles = (colors) => StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: colors.background,

  },

  listContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },
  scrollToBottom: {
    position: "absolute",
    right: 22,
    bottom: 104,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  keyboardContainer: {

    flex: 1,

    backgroundColor: colors.background,

  },

  separator: {

    height: 14,

  },

  footerSpacing: {

    height: 10,

  },

  loadingContainer: {

    paddingHorizontal: 16,

    paddingBottom: 8,

  },

  typingContainer: {

    paddingHorizontal: 16,

    paddingBottom: 10,

  },

});
