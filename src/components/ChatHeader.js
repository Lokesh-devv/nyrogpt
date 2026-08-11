import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  useTheme,
  Typography,
  Spacing,
  Radius,
} from "../theme";

function ChatHeader({

  title,

  online,

  onMenuPress,

  onNewChat,
  onProfilePress,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (

    <View style={styles.container}>

      {/* Left */}

      <View style={styles.leftContainer}>

        <TouchableOpacity

          style={styles.iconButton}

          activeOpacity={0.8}

          onPress={onMenuPress}

        >

          <Ionicons

            name="menu"

            size={24}

            color={colors.text}

          />

        </TouchableOpacity>

      </View>

      {/* Center */}

      <View style={styles.centerContainer}>

        <Text
          numberOfLines={1}
          style={styles.title}
        >

          {title}

        </Text>

        {/* {

          online &&

          <View style={styles.statusContainer}>

            <View style={styles.onlineDot} />

            <Text style={styles.statusText}>

              Online

            </Text>

          </View>

        } */}

      </View>

      {/* Right */}

      <View style={styles.rightContainer}>

        <TouchableOpacity

          style={styles.iconButton}

          activeOpacity={0.8}

          onPress={onNewChat}

        >

          <Ionicons

            name="create-outline"

            size={22}

            color={colors.text}

          />

        </TouchableOpacity>

        <TouchableOpacity

          style={styles.iconButton}

          activeOpacity={0.8}

          onPress={onProfilePress}

        >

          <Ionicons

            name="person-circle-outline"

            size={22}

            color={colors.text}

          />

        </TouchableOpacity>

      </View>

    </View>

  );

}

export default React.memo(ChatHeader);

const createStyles = (colors) => StyleSheet.create({

  container:{

    height:72,

    backgroundColor:colors.background,

    borderBottomWidth:1,

    borderBottomColor:colors.border,

    paddingHorizontal:Spacing.lg,

    flexDirection:"row",

    alignItems:"center",

    justifyContent:"space-between",

  },

  leftContainer:{

    width:70,

    alignItems:"flex-start",

  },

  centerContainer:{

    flex:1,

    justifyContent:"center",

    alignItems:"center",

  },

  rightContainer:{

    width:90,

    flexDirection:"row",

    justifyContent:"flex-end",

    alignItems:"center",

  },

  iconButton:{

    width:42,

    height:42,

    borderRadius:Radius.round,

    justifyContent:"center",

    alignItems:"center",

  },

  title:{

    color:colors.text,

    fontSize:Typography.title,

    fontWeight:"700",

  },

  statusContainer:{

    flexDirection:"row",

    alignItems:"center",

    marginTop:4,

  },

  onlineDot:{

    width:8,

    height:8,

    borderRadius:4,

    backgroundColor:colors.success,

    marginRight:6,

  },

  statusText:{

    color:colors.textSecondary,

    fontSize:Typography.small,

  },

});
