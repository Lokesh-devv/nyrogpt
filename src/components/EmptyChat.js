import { useTheme } from "../theme";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function EmptyChat() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>

      <Ionicons
        name="sparkles"
        size={65}
        color={colors.primary}
      />

      <Text style={styles.title}>
        Nyro GPT
      </Text>

      <Text style={styles.subtitle}>
        How can I help you today?
      </Text>

    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center",
},

title:{
fontSize:34,
color:colors.text,
fontWeight:"700",
marginTop:25,
},

subtitle:{
fontSize:17,
color:colors.textSecondary,
marginTop:12,
}

});
