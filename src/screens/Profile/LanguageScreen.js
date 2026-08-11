import React, {
  useState,
  useMemo,
} from "react";

import {
  ScrollView,
  View,
  Text,
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

function LanguageScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* State                                              */
  /* -------------------------------------------------- */

  const [search, setSearch] =
    useState("");

  const [selectedLanguage,
    setSelectedLanguage] =
    useState("English");

  /* -------------------------------------------------- */
  /* Languages                                          */
  /* -------------------------------------------------- */

  const languages = useMemo(() => [

    "System Default",

    "English",

    "Hindi",

    "Telugu",

    "Tamil",

    "Kannada",

    "Malayalam",

    "Marathi",

    "Gujarati",

    "Punjabi",

    "Bengali",

    "Urdu",

  ], []);

  /* -------------------------------------------------- */
  /* Filter Languages                                   */
  /* -------------------------------------------------- */

  const filteredLanguages =
    useMemo(() => {

      return languages.filter(

        (item) =>

          item

            .toLowerCase()

            .includes(

              search.toLowerCase()

            )

      );

    }, [

      search,

      languages,

    ]);

  /* -------------------------------------------------- */
  /* Render Item                                        */
  /* -------------------------------------------------- */

  const renderItem = (item) => (

    <TouchableOpacity

      key={item}

      activeOpacity={0.85}

      style={styles.languageItem}

      onPress={() =>

        setSelectedLanguage(item)

      }

    >

      <Text style={styles.languageText}>

        {item}

      </Text>

      {

        selectedLanguage === item &&

        (

          <Ionicons

            name="checkmark-circle"

            size={24}

            color={colors.primary}

          />

        )

      }

    </TouchableOpacity>

  );

  /* -------------------------------------------------- */
  /* Save                                               */
  /* -------------------------------------------------- */

  const handleSave = () => {

    /*
      Backend

      PUT /language

    */

    navigation.goBack();

  };

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

            Language

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

            placeholder="Search language..."

            placeholderTextColor={colors.textMuted}

            style={styles.searchInput}

          />

        </View>

        {/* Languages */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            Select Language

          </Text>

          {

            filteredLanguages.map(

              renderItem

            )

          }

        </View>

                {/* ------------------------------------------ */}
        {/* Save Button                                */}
        {/* ------------------------------------------ */}

        <TouchableOpacity

          activeOpacity={0.85}

          style={styles.saveButton}

          onPress={handleSave}

        >

          <Text style={styles.saveButtonText}>

            Save Language

          </Text>

        </TouchableOpacity>

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

    color:colors.text,

    fontSize:Typography.body,

    marginLeft:Spacing.sm,

  },

  card:{

    backgroundColor:colors.surface,

    marginHorizontal:Spacing.lg,

    borderRadius:Radius.lg,

    padding:Spacing.lg,

  },

  cardTitle:{

    color:colors.text,

    fontSize:Typography.subtitle,

    fontWeight:"700",

    marginBottom:Spacing.lg,

  },

  languageItem:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    paddingVertical:16,

    borderBottomWidth:1,

    borderBottomColor:colors.border,

  },

  languageText:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"500",

  },

  saveButton:{

    height:56,

    marginHorizontal:Spacing.lg,

    marginTop:Spacing.xl,

    backgroundColor:colors.primary,

    borderRadius:Radius.lg,

    justifyContent:"center",

    alignItems:"center",

  },

  saveButtonText:{

    color:colors.buttonText,

    fontSize:Typography.body,

    fontWeight:"700",

  },

    saveButton:{

    height:56,

    marginHorizontal:Spacing.lg,

    marginTop:Spacing.xl,

    marginBottom:Spacing.xxxl,

    borderRadius:Radius.lg,

    backgroundColor:colors.primary,

    justifyContent:"center",

    alignItems:"center",

  },

  saveButtonText:{

    color:colors.buttonText,

    fontSize:Typography.body,

    fontWeight:"700",

  },

});

export default React.memo(LanguageScreen);
