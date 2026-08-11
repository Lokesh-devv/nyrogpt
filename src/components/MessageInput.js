import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Keyboard,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
  useTheme,
  Typography,
  Spacing,
  Radius,
} from "../theme";

function MessageInput({

  value,

  onChangeText,

  onSend,

  onAttachment,

  onPreviewAttachment,

  attachment,

  onRemoveAttachment,

  onVoice,
  isRecording = false,
  recordingDuration = 0,
  onCancelRecording,
  onStopRecording,

  disabled = false,

  isGenerating = false,

  onStop,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();

  /* -------------------------------------------------- */
  /* Refs                                               */
  /* -------------------------------------------------- */

  const inputRef = useRef(null);

  const sendScale = useRef(
    new Animated.Value(1)
  ).current;

  const sendOpacity = useRef(
    new Animated.Value(1)
  ).current;

  /* -------------------------------------------------- */
  /* Local State                                        */
  /* -------------------------------------------------- */

  const [inputHeight, setInputHeight] =
    useState(46);

  const [focused, setFocused] =
    useState(false);

  const [attachmentMenuVisible, setAttachmentMenuVisible] =
    useState(false);

  /* -------------------------------------------------- */
  /* Derived State                                      */
  /* -------------------------------------------------- */

  const canSend = useMemo(() => {
    return (value.trim().length > 0 || Boolean(attachment)) && !disabled;
  }, [value, attachment, disabled]);

  const canStop = useMemo(() => isGenerating && typeof onStop === "function", [isGenerating, onStop]);

  /* -------------------------------------------------- */
  /* Send Button Animation                              */
  /* -------------------------------------------------- */

  useEffect(() => {

    Animated.parallel([

      Animated.spring(sendScale, {

        toValue: canSend ? 1 : 0.90,

        friction: 6,

        tension: 120,

        useNativeDriver: true,

      }),

      Animated.timing(sendOpacity, {

        toValue: canSend ? 1 : 0.6,

        duration: 180,

        useNativeDriver: true,

      }),

    ]).start();

  }, [canSend]);

  /* -------------------------------------------------- */
  /* Auto Grow                                          */
  /* -------------------------------------------------- */

  const handleContentSizeChange = (

    event

  ) => {

    const height =
      event.nativeEvent.contentSize.height;

    if (height < 46) {

      setInputHeight(46);

      return;

    }

    if (height > 140) {

      setInputHeight(140);

      return;

    }

    setInputHeight(height);

  };

  /* -------------------------------------------------- */
  /* Keyboard                                           */
  /* -------------------------------------------------- */

  const dismissKeyboard = () => {

    Keyboard.dismiss();

  };

  /* -------------------------------------------------- */
  /* Input                                              */
  /* -------------------------------------------------- */

  const handleChange = (text) => {

    onChangeText(text);

  };

  const handleFocus = () => {

    setFocused(true);

  };

  const handleBlur = () => {

    setFocused(false);

  };

  /* -------------------------------------------------- */
  /* Send                                               */
  /* -------------------------------------------------- */

  const handlePressSend = () => {
    if (!canSend) return;

    dismissKeyboard();
    onSend();
  };

  const handleStopPress = () => {
    if (!canStop) return;
    onStop();
  };

  /* -------------------------------------------------- */
  /* Attachment                                         */
  /* -------------------------------------------------- */

  const handleAttachmentPress = () => {

    if (disabled) return;

    dismissKeyboard();

    setAttachmentMenuVisible((visible) => !visible);

  };

  const handleAttachmentOption = (type) => {

    setAttachmentMenuVisible(false);

    onAttachment?.(type);

  };

  /* -------------------------------------------------- */
  /* Voice                                              */
  /* -------------------------------------------------- */

  const handleVoicePress = () => {

    if (disabled) return;

    onVoice();

  };

  /* -------------------------------------------------- */
  /* Render                                             */
  /* -------------------------------------------------- */

  return (

    <View style={styles.wrapper}>

      <Modal
        visible={attachmentMenuVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setAttachmentMenuVisible(false)}
      >

        <View style={styles.attachmentModal}>

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setAttachmentMenuVisible(false)}
          />

        <View
          style={[
            styles.attachmentMenu,
            { bottom: insets.bottom + 82 },
          ]}
        >

          {[
            { type: "images", label: "Images", icon: "image-outline" },
            { type: "files", label: "Files", icon: "document-outline" },
            { type: "videos", label: "Videos", icon: "videocam-outline" },
            { type: "audio", label: "Audio", icon: "musical-notes-outline" },
          ].map((item) => (

            <TouchableOpacity
              key={item.type}
              style={styles.attachmentMenuItem}
              activeOpacity={0.8}
              onPress={() => handleAttachmentOption(item.type)}
            >

              <View style={styles.attachmentMenuIcon}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>

              <Text style={styles.attachmentMenuText}>{item.label}</Text>

            </TouchableOpacity>

          ))}

        </View>

        </View>

      </Modal>

      {attachment && (
        <View style={styles.attachmentPreview}>
          <TouchableOpacity
            style={styles.attachmentPreviewContent}
            activeOpacity={0.8}
            onPress={() => onPreviewAttachment?.()}
          >
            <Ionicons name="attach-outline" size={20} color={colors.primary} />
            <Text numberOfLines={1} style={styles.attachmentName}>
              {attachment.name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.attachmentRemove}
            onPress={onRemoveAttachment}
          >
            <Ionicons name="close" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      )}

      {isRecording ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.recordingAction} onPress={onCancelRecording}>
            <Text style={styles.recordingActionText}>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.recordingStatus}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>
              Recording... {formatDuration(recordingDuration)}
            </Text>
          </View>
          <TouchableOpacity style={styles.stopButton} onPress={onStopRecording}>
            <Ionicons name="stop" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      ) : <View

        style={[

          styles.container,

          focused && styles.containerFocused,

        ]}

      >        {/* Attachment */}

        <TouchableOpacity

          style={styles.leftButton}

          activeOpacity={0.8}

          onPress={handleAttachmentPress}

          disabled={disabled}

        >

          <Ionicons

            name="add-circle-outline"

            size={26}

            color={
              disabled
                ? colors.textMuted
                : colors.textSecondary
            }

          />

        </TouchableOpacity>

        {/* Text Input */}

        <TextInput

          ref={inputRef}

          value={value}

          onChangeText={handleChange}

          onFocus={handleFocus}

          onBlur={handleBlur}

          placeholder="Ask anything..."

          placeholderTextColor={colors.textMuted}

          multiline

          editable={!disabled}

          autoCorrect={false}

          autoCapitalize="sentences"

          keyboardAppearance="dark"

          textAlignVertical="top"

          maxLength={5000}

          style={[

            styles.input,

            {

              height: inputHeight,

            },

          ]}

          onContentSizeChange={

            handleContentSizeChange

          }

          scrollEnabled={

            inputHeight >= 140

          }

        />

        {/* Right Action */}

        <Animated.View

          style={[

            styles.rightContainer,

            {

              opacity: sendOpacity,

              transform: [

                {

                  scale: sendScale,

                },

              ],

            },

          ]}

        >

          {canStop ? (

            <TouchableOpacity

              activeOpacity={0.85}

              style={styles.stopButton}

              onPress={handleStopPress}

            >

              <Ionicons

                name="stop"

                size={20}

                color={colors.text}

              />

            </TouchableOpacity>

          ) : disabled ? null : canSend ? (

            <TouchableOpacity

              activeOpacity={0.85}

              style={styles.sendButton}

              onPress={handlePressSend}

            >

              <Ionicons

                name="arrow-up"

                size={20}

                color={colors.text}

              />

            </TouchableOpacity>

          ) : (

            <TouchableOpacity

              activeOpacity={0.85}

              style={styles.voiceButton}

              onPress={handleVoicePress}

            >

              <Ionicons

                name="mic-outline"

                size={22}

                color={colors.textSecondary}

              />

            </TouchableOpacity>

          )}

        </Animated.View>

      </View>}

    </View>

  );

}

const formatDuration = (durationMillis) => {
  const seconds = Math.floor(durationMillis / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
};

const createStyles = (colors) => StyleSheet.create({

  wrapper:{

    backgroundColor:colors.background,

    paddingHorizontal:Spacing.lg,

    paddingTop:Spacing.sm,

    paddingBottom:

      Platform.OS === "ios"

        ? Spacing.lg

        : Spacing.md,

  },

  attachmentMenu: {

    position: "absolute",

    left: Spacing.lg,

    width: 190,

    paddingVertical: Spacing.sm,

    borderRadius: Radius.lg,

    borderWidth: 1,

    borderColor: colors.border,

    backgroundColor: colors.card,

    zIndex: 20,

    elevation: 12,

    shadowColor: colors.shadow,

    shadowOffset: { width: 0, height: 4 },

    shadowOpacity: 0.2,

    shadowRadius: 10,

  },

  attachmentModal: {

    flex: 1,

  },

  attachmentMenuItem: {

    minHeight: 48,

    paddingHorizontal: Spacing.md,

    flexDirection: "row",

    alignItems: "center",

  },

  attachmentMenuIcon: {

    width: 34,

    height: 34,

    borderRadius: 17,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: colors.accent,

  },

  attachmentMenuText: {

    marginLeft: Spacing.md,

    color: colors.text,

    fontSize: Typography.body,

    fontWeight: "500",

  },

  container:{

    flexDirection:"row",

    alignItems:"flex-end",

    backgroundColor:colors.inputBackground,

    borderRadius:Radius.round,

    borderWidth:1,

    borderColor:colors.border,

    paddingHorizontal:Spacing.md,

    paddingVertical:10,

    minHeight:58,

  },

  containerFocused:{

    borderColor:colors.primary,

  },

  leftButton:{

    width:42,

    height:42,

    justifyContent:"center",

    alignItems:"center",

  },

  input:{

    flex:1,

    color:colors.text,

    fontSize:Typography.body,

    lineHeight:24,

    paddingHorizontal:Spacing.sm,

    paddingTop:10,

    paddingBottom:10,

    minHeight:46,

    maxHeight:140,

  },

  rightContainer:{

    justifyContent:"center",

    alignItems:"center",

    marginLeft:Spacing.sm,

  },

  sendButton:{

    width:42,

    height:42,

    borderRadius:21,

    backgroundColor:colors.primary,

    justifyContent:"center",

    alignItems:"center",

  },

  voiceButton:{
    width:42,
    height:42,
    borderRadius:21,
    justifyContent:"center",
    alignItems:"center",
  },
  stopButton: {
    width:42,
    height:42,
    borderRadius:21,
    backgroundColor: colors.error || colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {

    opacity: 0.5,

  },

  shadow: {

    shadowColor: colors.shadow,

    shadowOffset: {

      width: 0,

      height: 2,

    },

    shadowOpacity: 0.15,

    shadowRadius: 4,

    elevation: 4,

  },

  sendButtonPressed: {

    transform: [

      {

        scale: 0.96,

      },

    ],

  },

  placeholder: {

    color: colors.textMuted,

  },

  attachmentPreview: {

    width: "100%",

    minHeight: 52,

    backgroundColor: colors.surface,

    borderRadius: Radius.lg,

    marginBottom: Spacing.sm,

    paddingHorizontal: Spacing.md,

    paddingVertical: Spacing.sm,

    flexDirection: "row",

    alignItems: "center",

  },

  attachmentName: {

    flex: 1,

    color: colors.text,

    fontSize: Typography.caption,

    marginLeft: Spacing.sm,

  },

  attachmentRemove: {

    width: 30,

    height: 30,

    justifyContent: "center",

    alignItems: "center",

  },

  recordingContainer: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    width: "100%",

  },
  recordingAction: {
    minWidth: 62,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingActionText: {
    color: colors.primary,
    fontSize: Typography.caption,
    fontWeight: "600",
  },
  recordingStatus: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  recordingDot: {

    width: 10,

    height: 10,

    borderRadius: 5,

    backgroundColor: colors.danger,

    marginRight: Spacing.sm,

  },

  recordingText: {

    color: colors.text,

    fontSize: Typography.caption,

    flex: 1,

  },

  keyboardSpacing: {

    height: Platform.OS === "ios" ? 10 : 0,

  },

});

export default React.memo(MessageInput);
