import React, {
  useState,
  useMemo,
} from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
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

function SearchScreen({

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
  /* Recent Searches                                    */
  /* -------------------------------------------------- */

  const recentSearches = useMemo(() => [

    "React Native",

    "Java",

    "Expo",

    "Authentication",

    "Family Media Hub",

  ], []);

  /* -------------------------------------------------- */
  /* Suggested Searches                                 */
  /* -------------------------------------------------- */

  const suggestions = useMemo(() => [

    {

      id:"1",

      title:"React Native",

      category:"Technology",

    },

    {

      id:"2",

      title:"Java Backend",

      category:"Programming",

    },

    {

      id:"3",

      title:"UI Design",

      category:"Design",

    },

    {

      id:"4",

      title:"AI Assistant",

      category:"Artificial Intelligence",

    },

    {

      id:"5",

      title:"Flutter",

      category:"Mobile",

    },

  ], []);

  /* -------------------------------------------------- */
  /* Filter                                             */
  /* -------------------------------------------------- */

  const filteredSuggestions =
    useMemo(() => {

      if (!search.trim()) {

        return suggestions;

      }

      return suggestions.filter(

        item =>

          item.title

            .toLowerCase()

            .includes(

              search.toLowerCase()

            )

      );

    }, [

      search,

      suggestions,

    ]);

  /* -------------------------------------------------- */
  /* Render Suggestion                                  */
  /* -------------------------------------------------- */

  const renderSuggestion = (item) => (

    <TouchableOpacity

      key={item.id}

      activeOpacity={0.85}

      style={styles.resultItem}

    >

      <Ionicons

        name="search"

        size={20}

        color={colors.primary}

      />

      <View style={styles.resultContent}>

        <Text style={styles.resultTitle}>

          {item.title}

        </Text>

        <Text style={styles.resultCategory}>

          {item.category}

        </Text>

      </View>

      <Ionicons

        name="arrow-forward"

        size={18}

        color={colors.textMuted}

      />

    </TouchableOpacity>

  );

  /* -------------------------------------------------- */
  /* Render                                             */
  /* -------------------------------------------------- */

  return (

    <SafeAreaView style={styles.container} edges={["top"]}>

      <ScrollView

        contentContainerStyle={styles.content}

        showsVerticalScrollIndicator={false}

      >

        {/* Header */}

        <View style={styles.header}>

          <TouchableOpacity

            style={styles.backButton}

            onPress={() =>

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

            Search

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

            placeholder="Search chats or messages..."

            placeholderTextColor={colors.textMuted}

            style={styles.searchInput}

            autoFocus

          />

        </View>


                {/* ------------------------------------------ */}
        {/* Recent Searches                            */}
        {/* ------------------------------------------ */}

        {

          search.length === 0 &&

          (

            <View style={styles.card}>

              <View style={styles.sectionHeader}>

                <Text style={styles.sectionTitle}>

                  Recent Searches

                </Text>

                <TouchableOpacity>

                  <Text style={styles.clearText}>

                    Clear All

                  </Text>

                </TouchableOpacity>

              </View>

              {

                recentSearches.map((item,index)=>(

                  <TouchableOpacity

                    key={index}

                    activeOpacity={0.85}

                    style={styles.recentItem}

                    onPress={()=>

                      setSearch(item)

                    }

                  >

                    <Ionicons

                      name="time-outline"

                      size={20}

                      color={colors.textSecondary}

                    />

                    <Text style={styles.recentText}>

                      {item}

                    </Text>

                  </TouchableOpacity>

                ))

              }

            </View>

          )

        }

        {/* ------------------------------------------ */}
        {/* Search Results                             */}
        {/* ------------------------------------------ */}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>

            {

              search.length > 0

              ?

              "Search Results"

              :

              "Suggested Searches"

            }

          </Text>

          {

            filteredSuggestions.length === 0

            ?

            (

              <View style={styles.emptyContainer}>

                <Ionicons

                  name="search-outline"

                  size={64}

                  color={colors.textMuted}

                />

                <Text style={styles.emptyTitle}>

                  No Results Found

                </Text>

                <Text style={styles.emptySubtitle}>

                  Try another keyword or search phrase.

                </Text>

              </View>

            )

            :

            (

              filteredSuggestions.map(

                renderSuggestion

              )

            )

          }

        </View>

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

    backgroundColor:colors.surface,

    marginHorizontal:Spacing.lg,

    marginBottom:Spacing.lg,

    borderRadius:Radius.lg,

    borderWidth:1,

    borderColor:colors.border,

    paddingHorizontal:Spacing.md,

    height:56,

  },

  searchInput:{

    flex:1,

    color:colors.text,

    fontSize:Typography.body,

    marginLeft:Spacing.sm,

  },

  card:{

    backgroundColor:colors.surface,

    marginHorizontal:Spacing.lg,

    marginBottom:Spacing.lg,

    borderRadius:Radius.lg,

    padding:Spacing.lg,

  },

  sectionHeader:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    marginBottom:Spacing.md,

  },

  sectionTitle:{

    color:colors.text,

    fontSize:Typography.subtitle,

    fontWeight:"700",

  },

  clearText:{

    color:colors.primary,

    fontSize:Typography.small,

    fontWeight:"600",

  },

  recentItem:{

    flexDirection:"row",

    alignItems:"center",

    paddingVertical:12,

    borderBottomWidth:1,

    borderBottomColor:colors.border,

  },

  recentText:{

    color:colors.text,

    fontSize:Typography.body,

    marginLeft:Spacing.md,

  },

  resultItem:{

    flexDirection:"row",

    alignItems:"center",

    paddingVertical:16,

    borderBottomWidth:1,

    borderBottomColor:colors.border,

  },

  resultContent:{

    flex:1,

    marginLeft:Spacing.md,

  },

  resultTitle:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"600",

  },

  resultCategory:{

    color:colors.textSecondary,

    fontSize:Typography.small,

    marginTop:4,

  },

  emptyContainer:{

    alignItems:"center",

    justifyContent:"center",

    paddingVertical:50,

  },

  emptyTitle:{

    color:colors.text,

    fontSize:22,

    fontWeight:"700",

    marginTop:Spacing.lg,

  },

  emptySubtitle:{

    color:colors.textSecondary,

    fontSize:Typography.body,

    textAlign:"center",

    marginTop:Spacing.sm,

  },

    placeholder:{

    width:44,

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

export default React.memo(SearchScreen);
