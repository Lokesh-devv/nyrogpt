import React, {
  useState,
  useMemo,
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
  useTheme,
  Typography,
  Spacing,
  Radius,
} from "../../theme";

function ChatHistoryScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* State                                              */
  /* -------------------------------------------------- */

  const [search, setSearch] =
    useState("");

  /* -------------------------------------------------- */
  /* Dummy Data                                         */
  /* -------------------------------------------------- */

  const chatSections = useMemo(() => ([

    {

      title:"Today",

      data:[

        {

          id:"1",

          title:"React Native Interview Questions",

          time:"11:45 AM",

          pinned:true,

        },

        {

          id:"2",

          title:"Build AI Chat App",

          time:"09:30 AM",

        },

      ],

    },

    {

      title:"Yesterday",

      data:[

        {

          id:"3",

          title:"Java Backend APIs",

          time:"08:20 PM",

        },

        {

          id:"4",

          title:"Portfolio Design",

          time:"04:10 PM",

        },

      ],

    },

    {

      title:"Last 7 Days",

      data:[

        {

          id:"5",

          title:"Family Media Hub",

          time:"Monday",

        },

        {

          id:"6",

          title:"Aqua Pulse",

          time:"Sunday",

        },

      ],

    },

  ]), []);

  /* -------------------------------------------------- */
  /* Filter                                             */
  /* -------------------------------------------------- */

  const filteredSections =
    useMemo(() => {

      if (!search.trim()) {

        return chatSections;

      }

      return chatSections

        .map(section => ({

          ...section,

          data: section.data.filter(

            item =>

              item.title

                .toLowerCase()

                .includes(

                  search.toLowerCase()

                )

          ),

        }))

        .filter(

          section =>

            section.data.length > 0

        );

    }, [

      search,

      chatSections,

    ]);

  /* -------------------------------------------------- */
  /* Render Chat                                        */
  /* -------------------------------------------------- */

  const renderChat = (chat) => (

    <TouchableOpacity

      key={chat.id}

      activeOpacity={0.85}

      style={styles.chatItem}

    >

      <View style={styles.chatLeft}>

        <Ionicons

          name="chatbubble-ellipses-outline"

          size={22}

          color={colors.primary}

        />

        <View style={styles.chatContent}>

          <Text

            numberOfLines={1}

            style={styles.chatTitle}

          >

            {chat.title}

          </Text>

          <Text style={styles.chatTime}>

            {chat.time}

          </Text>

        </View>

      </View>

      <View style={styles.chatRight}>

        {

          chat.pinned &&

          (

            <Ionicons

              name="bookmark"

              size={18}

              color={colors.primary}

            />

          )

        }

        <TouchableOpacity>

          <Ionicons

            name="ellipsis-vertical"

            size={18}

            color={colors.textMuted}

          />

        </TouchableOpacity>

      </View>

    </TouchableOpacity>

  );

  /* -------------------------------------------------- */
  /* Render                                             */
  /* -------------------------------------------------- */

  return (

    <SafeAreaView style={styles.container} edges={["top"]}>

      <ScrollView

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.content}

      >

        {/* Header */}

        <View style={styles.header}>

          <TouchableOpacity

            style={styles.backButton}

            onPress={()=>

              navigation.goBack()

            }

          >

            <Ionicons

              name="arrow-back"

              size={22}

              color={colors.text}

            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>

            Chat History

          </Text>

          <View style={styles.placeholder} />

        </View>

        {/* Search */}

        <View style={styles.searchContainer}>

          <Ionicons

            name="search"

            size={20}

            color={colors.textMuted}

          />

          <TextInput

            value={search}

            onChangeText={setSearch}

            placeholder="Search chats..."

            placeholderTextColor={colors.textMuted}

            style={styles.searchInput}

          />

        </View>

                {/* ------------------------------------------ */}
        {/* Chat Sections                              */}
        {/* ------------------------------------------ */}

        {

          filteredSections.length === 0

          ?

          (

            <View style={styles.emptyContainer}>

              <Ionicons

                name="search-outline"

                size={70}

                color={colors.textMuted}

              />

              <Text style={styles.emptyTitle}>

                No chats found

              </Text>

              <Text style={styles.emptySubtitle}>

                Try searching with a different keyword.

              </Text>

            </View>

          )

          :

          (

            filteredSections.map((section) => (

              <View

                key={section.title}

                style={styles.section}

              >

                <Text style={styles.sectionTitle}>

                  {section.title}

                </Text>

                {

                  section.data.map(renderChat)

                }

              </View>

            ))

          )

        }

      </ScrollView>

    </SafeAreaView>

  );

}

const createStyles = (colors) => StyleSheet.create({

  container:{

    flex:1,

    backgroundColor:colors.background,

  },

  content:{

    paddingBottom:40,

  },

  header:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    paddingHorizontal:Spacing.lg,

    paddingVertical:Spacing.lg,

  },

  backButton:{

    width:44,

    height:44,

    borderRadius:Radius.round,

    backgroundColor:colors.surface,

    justifyContent:"center",

    alignItems:"center",

  },

  placeholder:{

    width:44,

  },

  headerTitle:{

    color:colors.text,

    fontSize:Typography.title,

    fontWeight:"700",

  },

  searchContainer:{

    flexDirection:"row",

    alignItems:"center",

    marginHorizontal:Spacing.lg,

    marginBottom:Spacing.lg,

    backgroundColor:colors.surface,

    borderRadius:Radius.lg,

    borderWidth:1,

    borderColor:colors.border,

    paddingHorizontal:Spacing.md,

    height:56,

  },

  searchInput:{

    flex:1,

    marginLeft:Spacing.sm,

    color:colors.text,

    fontSize:Typography.body,

  },

  section:{

    marginBottom:Spacing.xl,

    paddingHorizontal:Spacing.lg,

  },

  sectionTitle:{

    color:colors.textSecondary,

    fontSize:Typography.subtitle,

    fontWeight:"700",

    marginBottom:Spacing.md,

  },

  chatItem:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    backgroundColor:colors.surface,

    borderRadius:Radius.lg,

    padding:Spacing.md,

    marginBottom:Spacing.sm,

  },

  chatLeft:{

    flexDirection:"row",

    alignItems:"center",

    flex:1,

  },

  chatContent:{

    flex:1,

    marginLeft:Spacing.md,

  },

  chatTitle:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"600",

  },

  chatTime:{

    color:colors.textSecondary,

    fontSize:Typography.small,

    marginTop:4,

  },

  chatRight:{

    flexDirection:"row",

    alignItems:"center",

    gap:12,

  },

  emptyContainer:{

    flex:1,

    alignItems:"center",

    justifyContent:"center",

    paddingVertical:80,

    paddingHorizontal:Spacing.xl,

  },

  emptyTitle:{

    color:colors.text,

    fontSize:24,

    fontWeight:"700",

    marginTop:Spacing.lg,

  },

  emptySubtitle:{

    color:colors.textSecondary,

    fontSize:Typography.body,

    textAlign:"center",

    marginTop:Spacing.sm,

    lineHeight:24,

  },

    placeholder:{

    width:44,

  },

  menuButton:{

    width:34,

    height:34,

    borderRadius:17,

    justifyContent:"center",

    alignItems:"center",

    marginLeft:Spacing.sm,

  },

  pinnedIcon:{

    marginRight:Spacing.sm,

  },

  divider:{

    height:1,

    backgroundColor:colors.border,

    marginVertical:Spacing.sm,

  },

  listBottomSpace:{

    height:Spacing.xxxl,

  },

});

export default React.memo(ChatHistoryScreen);
