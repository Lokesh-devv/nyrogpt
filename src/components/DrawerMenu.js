import React, {
  useMemo,
  useState,
  memo,
} from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useTheme,
  Typography,
  Spacing,
  Radius,
} from "../theme";

function DrawerMenu({

  conversations = [],

  activeConversationId,

  onConversationSelect,

  onNewChat,

  onSearch,

  onProfile,

  onSettings,

  onLogout,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* Search                                              */
  /* -------------------------------------------------- */

  const [searchText, setSearchText] =
    useState("");

  /* -------------------------------------------------- */
  /* Handle Search                                       */
  /* -------------------------------------------------- */

  const handleSearch = (text) => {

    setSearchText(text);

    onSearch?.(text);

  };

  /* -------------------------------------------------- */
  /* Filter Conversations                               */
  /* -------------------------------------------------- */

  const filteredConversations =
    useMemo(() => {

      if (!searchText.trim()) {

        return conversations;

      }

      return conversations.filter(

        (conversation) =>

          conversation.title

            .toLowerCase()

            .includes(

              searchText.toLowerCase()

            )

      );

    }, [

      conversations,

      searchText,

    ]);

  /* -------------------------------------------------- */
  /* Group Chats                                         */
  /* -------------------------------------------------- */

  const groupedChats =
    useMemo(() => {

      const today = [];

      const yesterday = [];

      const last7Days = [];

      const last30Days = [];

      const older = [];

      const now = new Date();

      filteredConversations.forEach(

        (conversation) => {

          const updated =
            new Date(
              conversation.updatedAt
            );

          const diff =
            Math.floor(

              (now - updated) /

              (1000 * 60 * 60 * 24)

            );

          if (diff === 0) {

            today.push(conversation);

          }

          else if (diff === 1) {

            yesterday.push(conversation);

          }

          else if (diff <= 7) {

            last7Days.push(conversation);

          }

          else if (diff <= 30) {

            last30Days.push(conversation);

          }

          else {

            older.push(conversation);

          }

        }

      );

      return [

        {

          title:"Today",

          data:today,

        },

        {

          title:"Yesterday",

          data:yesterday,

        },

        {

          title:"Last 7 Days",

          data:last7Days,

        },

        {

          title:"Last 30 Days",

          data:last30Days,

        },

        {

          title:"Older",

          data:older,

        },

      ];

    }, [

      filteredConversations,

    ]);

  /* -------------------------------------------------- */
  /* Render Chat                                         */
  /* -------------------------------------------------- */

  const renderConversation = (

    item

  ) => {

    const active =

      item.id === activeConversationId;

    return (

      <TouchableOpacity

        activeOpacity={0.8}

        onPress={()=>

          onConversationSelect?.(

            item.id

          )

        }

        style={[

          styles.chatItem,

          active &&

          styles.activeChat,

        ]}

      >

        <Ionicons

          name="chatbubble-outline"

          size={18}

          color={

            active

            ?

            colors.primary

            :

            colors.textSecondary

          }

        />

        <Text

          numberOfLines={1}

          style={[

            styles.chatTitle,

            active &&

            styles.activeTitle,

          ]}

        >

          {item.title}

        </Text>

      </TouchableOpacity>

    );

  };    

    /* -------------------------------------------------- */
  /* Render Section                                     */
  /* -------------------------------------------------- */

  const renderSection = ({ item }) => {

    if (item.data.length === 0) return null;

    return (

      <View style={styles.sectionContainer}>

        <Text style={styles.sectionTitle}>

          {item.title}

        </Text>

        {

          item.data.map((conversation) => (

            <View key={conversation.id}>

              {renderConversation(conversation)}

            </View>

          ))

        }

      </View>

    );

  };

  /* -------------------------------------------------- */
  /* Render                                             */
  /* -------------------------------------------------- */

  return (

    <SafeAreaView style={styles.container} edges={["top"]}>

      {/* -------------------------------------------- */}
      {/* Header                                       */}
      {/* -------------------------------------------- */}

      <View style={styles.header}>

        <View style={styles.logoContainer}>

          <View style={styles.logoCircle}>

            <Ionicons

              name="sparkles"

              size={22}

              color={colors.text}

            />

          </View>

          <View>

            <Text style={styles.logoTitle}>

              Nyro GPT

            </Text>

            <Text style={styles.logoSubtitle}>

              AI Assistant

            </Text>

          </View>

        </View>

      </View>

      {/* -------------------------------------------- */}
      {/* New Chat                                     */}
      {/* -------------------------------------------- */}

      <TouchableOpacity

        style={styles.newChatButton}

        activeOpacity={0.85}

        onPress={onNewChat}

      >

        <Ionicons

          name="add"

          size={22}

          color={colors.text}

        />

        <Text style={styles.newChatText}>

          New Chat

        </Text>

      </TouchableOpacity>

      {/* -------------------------------------------- */}
      {/* Search                                       */}
      {/* -------------------------------------------- */}

      <View style={styles.searchContainer}>

        <Ionicons

          name="search"

          size={18}

          color={colors.textSecondary}

        />

        <TextInput

          value={searchText}

          onChangeText={handleSearch}

          placeholder="Search chats"

          placeholderTextColor={colors.textMuted}

          style={styles.searchInput}

        />

      </View>

      {/* -------------------------------------------- */}
      {/* Chat List                                    */}
      {/* -------------------------------------------- */}

      <FlatList

        data={groupedChats}

        renderItem={renderSection}

        keyExtractor={(item) => item.title}

        showsVerticalScrollIndicator={false}

        style={styles.list}

        contentContainerStyle={styles.listContent}

      />

      {/* -------------------------------------------- */}
      {/* Footer                                       */}
      {/* -------------------------------------------- */}

      <View style={styles.footer}>

        <TouchableOpacity

          style={styles.footerButton}

          activeOpacity={0.8}

          onPress={onProfile}

        >

          <Ionicons

            name="person-circle-outline"

            size={22}

            color={colors.text}

          />

          <Text style={styles.footerText}>

            Profile

          </Text>

        </TouchableOpacity>

        <TouchableOpacity

          style={styles.footerButton}

          activeOpacity={0.8}

          onPress={onSettings}

        >

          <Ionicons

            name="settings-outline"

            size={22}

            color={colors.text}

          />

          <Text style={styles.footerText}>

            Settings

          </Text>

        </TouchableOpacity>

        <TouchableOpacity

          style={styles.footerButton}

          activeOpacity={0.8}

          onPress={onLogout}

        >

          <Ionicons

            name="log-out-outline"

            size={22}

            color={colors.danger}

          />

          <Text style={styles.logoutText}>

            Logout

          </Text>

        </TouchableOpacity>

        <Text style={styles.version}>

          Nyro GPT v1.0.0

        </Text>

      </View>

    </SafeAreaView>

  );

}

const createStyles = (colors) => StyleSheet.create({

  container:{

    flex:1,

    backgroundColor:colors.background,

    paddingTop:60,

  },

  header:{

    paddingHorizontal:Spacing.lg,

    marginBottom:Spacing.xl,

  },

  logoContainer:{

    flexDirection:"row",

    alignItems:"center",

  },

  logoCircle:{

    width:48,

    height:48,

    borderRadius:24,

    backgroundColor:colors.primary,

    justifyContent:"center",

    alignItems:"center",

    marginRight:Spacing.md,

  },

  logoTitle:{

    color:colors.text,

    fontSize:Typography.title,

    fontWeight:"700",

  },

  logoSubtitle:{

    color:colors.textSecondary,

    fontSize:Typography.small,

    marginTop:2,

  },

  newChatButton:{

    flexDirection:"row",

    alignItems:"center",

    justifyContent:"center",

    backgroundColor:colors.primary,

    marginHorizontal:Spacing.lg,

    borderRadius:Radius.lg,

    paddingVertical:14,

    marginBottom:Spacing.lg,

  },

  newChatText:{

    color:colors.buttonText,

    fontSize:Typography.body,

    fontWeight:"600",

    marginLeft:Spacing.sm,

  },

  searchContainer:{

    flexDirection:"row",

    alignItems:"center",

    backgroundColor:colors.surface,

    marginHorizontal:Spacing.lg,

    borderRadius:Radius.lg,

    paddingHorizontal:Spacing.md,

    marginBottom:Spacing.lg,

  },

  searchInput:{

    flex:1,

    color:colors.text,

    fontSize:Typography.body,

    paddingVertical:12,

    marginLeft:Spacing.sm,

  },

    list: {

    flex: 1,

  },

  listContent: {

    paddingHorizontal: Spacing.lg,

    paddingBottom: Spacing.xxl,

  },

  sectionContainer: {

    marginBottom: Spacing.xl,

  },

  sectionTitle: {

    color: colors.textMuted,

    fontSize: Typography.small,

    fontWeight: "600",

    textTransform: "uppercase",

    marginBottom: Spacing.sm,

    marginLeft: Spacing.xs,

  },

  chatItem: {

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: Spacing.md,

    paddingVertical: 12,

    borderRadius: Radius.md,

    marginBottom: 6,

  },

  activeChat: {

    backgroundColor: colors.surface,

    borderLeftWidth: 3,

    borderLeftColor: colors.primary,

  },

  chatTitle: {

    flex: 1,

    color: colors.text,

    fontSize: Typography.body,

    marginLeft: Spacing.md,

  },

  activeTitle: {

    color: colors.primary,

    fontWeight: "700",

  },

  footer: {

    borderTopWidth: 1,

    borderTopColor: colors.border,

    paddingTop: Spacing.md,

    paddingHorizontal: Spacing.lg,

    paddingBottom: Spacing.xxl,

  },

  footerButton: {

    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 12,

  },

  footerText: {

    color: colors.text,

    fontSize: Typography.body,

    marginLeft: Spacing.md,

  },

  logoutText: {

    color: colors.danger,

    fontSize: Typography.body,

    marginLeft: Spacing.md,

    fontWeight: "600",

  },

  version: {

    textAlign: "center",

    color: colors.textMuted,

    fontSize: Typography.small,

    marginTop: Spacing.lg,

  },

});

export default memo(DrawerMenu);
