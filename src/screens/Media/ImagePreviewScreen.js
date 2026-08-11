import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Radius, Spacing, Typography, useTheme } from "../../theme";

const AnimatedImage = Animated.createAnimatedComponent(Image);

function ImagePreviewScreen({ navigation, route }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const image = route?.params?.image || "https://picsum.photos/900/1200";
  const title = route?.params?.title || "Generated Image";
  const prompt = route?.params?.prompt || "";
  const [favorite, setFavorite] = useState(false);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const resetImage = () => {
    scale.value = withSpring(1);
    savedScale.value = 1;
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };

  const handleDownload = async () => {
    try {
      await Linking.openURL(image);
    } catch (error) {
      Alert.alert("Unable to open image", "Please try again.");
    }
  };

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = Math.max(1, Math.min(savedScale.value * event.scale, 4));
    })
    .onEnd(() => {
      savedScale.value = scale.value;

      if (scale.value <= 1.02) {
        scale.value = withSpring(1);
        savedScale.value = 1;
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    })
    .onEnd((event) => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;

      if (scale.value <= 1.05 && event.translationY > 120) {
        runOnJS(navigation.goBack)();
        return;
      }

      if (scale.value <= 1.05) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      }
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        scale.value = withSpring(1);
        savedScale.value = 1;
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
        return;
      }

      scale.value = withSpring(2);
      savedScale.value = 2;
    });

  const composedGesture = Gesture.Simultaneous(pinch, pan, doubleTap);
  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>

        <TouchableOpacity style={styles.headerButton} onPress={() => setFavorite(!favorite)}>
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={24}
            color={favorite ? colors.danger : colors.text}
          />
        </TouchableOpacity>
      </View>

      <GestureDetector gesture={composedGesture}>
        <Animated.View style={styles.imageContainer}>
          <AnimatedImage
            source={{ uri: image }}
            resizeMode="contain"
            style={[styles.image, imageStyle]}
          />
        </Animated.View>
      </GestureDetector>

      <View style={styles.infoCard}>
        <Text style={styles.imageTitle}>{title}</Text>
        {Boolean(prompt) && (
          <Text style={styles.imageInfo} numberOfLines={2}>
            {prompt}
          </Text>
        )}
        <Text style={styles.imageHint}>Pinch to zoom • Double tap • Swipe down to close</Text>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity activeOpacity={0.85} style={styles.actionButton} onPress={resetImage}>
          <Ionicons name="refresh-outline" size={22} color={colors.text} />
          <Text style={styles.actionText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} style={styles.actionButton} onPress={handleDownload}>
          <Ionicons name="download-outline" size={22} color={colors.text} />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      height: 60,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.lg,
    },
    headerButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      flex: 1,
      color: colors.text,
      fontSize: Typography.title,
      fontWeight: "700",
      textAlign: "center",
      marginHorizontal: Spacing.md,
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: Spacing.md,
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: Radius.lg,
    },
    infoCard: {
      backgroundColor: colors.surface,
      marginHorizontal: Spacing.lg,
      borderRadius: Radius.lg,
      padding: Spacing.md,
      marginBottom: Spacing.md,
    },
    imageTitle: {
      color: colors.text,
      fontSize: Typography.subtitle,
      fontWeight: "700",
    },
    imageInfo: {
      color: colors.textSecondary,
      fontSize: Typography.caption,
      marginTop: 6,
      lineHeight: 20,
    },
    imageHint: {
      color: colors.textMuted,
      fontSize: Typography.small,
      marginTop: 8,
    },
    actionBar: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: Spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.surface,
    },
    actionButton: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    actionText: {
      color: colors.text,
      fontSize: Typography.small,
      marginTop: 5,
      fontWeight: "600",
    },
  });

export default React.memo(ImagePreviewScreen);
