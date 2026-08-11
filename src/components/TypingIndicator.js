import { useTheme } from "../theme";
import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
} from "react-native";

function Dot({ delay, color }) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          opacity,
          backgroundColor: color,
        },
      ]}
    />
  );
}

export default function TypingIndicator() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.avatar} />

      <View style={styles.bubble}>
        <Dot delay={0} color={colors.isDark ? colors.white : colors.black} />
        <Dot delay={150} color={colors.isDark ? colors.white : colors.black} />
        <Dot delay={300} color={colors.isDark ? colors.white : colors.black} />
      </View>
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({

  container:{
    flexDirection:"row",
    alignItems:"flex-end",
    marginVertical:12,
  },

  avatar:{
    width:36,
    height:36,
    borderRadius:18,
    backgroundColor:colors.primary,
    marginRight:10,
  },

  bubble:{
    flexDirection:"row",
    backgroundColor:colors.aiBubble,
    paddingHorizontal:14,
    paddingVertical:10,
    borderRadius:18,
  },

  dot:{
    width:8,
    height:8,
    borderRadius:4,
    backgroundColor:colors.textSecondary,
    marginHorizontal:3,
  }

});
