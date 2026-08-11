import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
  useTheme,
  Typography,
  Spacing,
  Radius,
} from "../../theme";

function FilePreviewScreen({

  navigation,

  route,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* File                                               */
  /* -------------------------------------------------- */

  const file =

    route?.params?.file ||

    {

      name:"AI_Notes.pdf",

      type:"PDF",

      size:"2.4 MB",

      modified:"Today, 10:30 AM",

    };

  const [favorite,
    setFavorite] =
    useState(false);

  /* -------------------------------------------------- */
  /* Actions                                            */
  /* -------------------------------------------------- */

  const openFileUrl = async () => {

    if (!file.url) {
      Alert.alert("File unavailable", "No file URL was provided.");
      return;
    }

    try {
      await Linking.openURL(file.url);
    } catch (error) {
      Alert.alert("Unable to open file", "Please try again.");
    }

  };

  const handleOpen = () => {

    openFileUrl();

  };

  const handleDownload = () => {

    openFileUrl();

  };

  const handleShare = async () => {
    if (!file.url) {
      Alert.alert("Unable to share", "No file URL is available.");
      return;
    }

    try {
      await Clipboard.setStringAsync(file.url);
      Alert.alert("Share", "File link copied to clipboard.");
    } catch {
      Alert.alert("Unable to share", "Please try again.");
    }
  };

  const handleCopyLink = async () => {
    if (!file.url) {
      Alert.alert("Unable to copy link", "No file URL is available.");
      return;
    }

    try {
      await Clipboard.setStringAsync(file.url);
      Alert.alert("Copied", "Link copied to clipboard.");
    } catch {
      Alert.alert("Unable to copy link", "Please try again.");
    }
  };

  const handleDelete = () => {

    console.log("Delete File");

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

            style={styles.headerButton}

            onPress={()=>

              navigation.goBack()

            }

          >

            <Ionicons

              name="arrow-back"

              size={24}

              color={colors.text}

            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>

            File Preview

          </Text>

          <TouchableOpacity

            style={styles.headerButton}

            onPress={()=>

              setFavorite(

                !favorite

              )

            }

          >

            <Ionicons

              name={

                favorite

                ?

                "heart"

                :

                "heart-outline"

              }

              size={24}

              color={

                favorite

                ?

                colors.danger

                :

                colors.text

              }

            />

          </TouchableOpacity>

        </View>

        {/* File Card */}

        <View style={styles.fileCard}>

          <View style={styles.fileIconContainer}>

            <Ionicons

              name="document-text"

              size={70}

              color={colors.primary}

            />

          </View>

          <Text style={styles.fileName}>

            {file.name}

          </Text>

          <Text style={styles.fileType}>

            {file.type}

          </Text>

        </View>

        {/* File Information */}

        <View style={styles.infoCard}>

          <View style={styles.infoRow}>

            <Text style={styles.infoLabel}>

              File Size

            </Text>

            <Text style={styles.infoValue}>

              {file.size}

            </Text>

          </View>

          <View style={styles.infoRow}>

            <Text style={styles.infoLabel}>

              Last Modified

            </Text>

            <Text style={styles.infoValue}>

              {file.modified}

            </Text>

          </View>

          <View style={styles.infoRow}>

            <Text style={styles.infoLabel}>

              File Type

            </Text>

            <Text style={styles.infoValue}>

              {file.type}

            </Text>

          </View>

        </View>

                {/* ------------------------------------------ */}
        {/* Actions                                    */}
        {/* ------------------------------------------ */}

        <TouchableOpacity

          activeOpacity={0.85}

          style={styles.primaryButton}

          onPress={handleOpen}

        >

          <Ionicons

            name="open-outline"

            size={22}

            color={colors.text}

          />

          <Text style={styles.primaryButtonText}>

            Open File

          </Text>

        </TouchableOpacity>

        <View style={styles.actionGrid}>

          <TouchableOpacity

            style={styles.actionButton}

            activeOpacity={0.85}

            onPress={handleDownload}

          >

            <Ionicons

              name="download-outline"

              size={26}

              color={colors.text}

            />

            <Text style={styles.actionText}>

              Download

            </Text>

          </TouchableOpacity>

          <TouchableOpacity

            style={styles.actionButton}

            activeOpacity={0.85}

            onPress={handleShare}

          >

            <Ionicons

              name="share-social-outline"

              size={26}

              color={colors.text}

            />

            <Text style={styles.actionText}>

              Share

            </Text>

          </TouchableOpacity>

          <TouchableOpacity

            style={styles.actionButton}

            activeOpacity={0.85}

            onPress={handleCopyLink}

          >

            <Ionicons

              name="copy-outline"

              size={26}

              color={colors.text}

            />

            <Text style={styles.actionText}>

              Copy Link

            </Text>

          </TouchableOpacity>

          <TouchableOpacity

            style={styles.actionButton}

            activeOpacity={0.85}

            onPress={handleDelete}

          >

            <Ionicons

              name="trash-outline"

              size={26}

              color={colors.danger}

            />

            <Text

              style={[

                styles.actionText,

                {

                  color:colors.danger,

                },

              ]}

            >

              Delete

            </Text>

          </TouchableOpacity>

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

    height:60,

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    paddingHorizontal:Spacing.lg,

  },

  headerButton:{

    width:42,

    height:42,

    borderRadius:21,

    backgroundColor:colors.surface,

    justifyContent:"center",

    alignItems:"center",

  },

  headerTitle:{

    color:colors.text,

    fontSize:Typography.title,

    fontWeight:"700",

  },

  fileCard:{

    alignItems:"center",

    paddingVertical:Spacing.xxxl,

    marginHorizontal:Spacing.lg,

  },

  fileIconContainer:{

    width:120,

    height:120,

    borderRadius:60,

    backgroundColor:colors.surface,

    justifyContent:"center",

    alignItems:"center",

    marginBottom:Spacing.lg,

  },

  fileName:{

    color:colors.text,

    fontSize:22,

    fontWeight:"700",

    textAlign:"center",

  },

  fileType:{

    color:colors.textSecondary,

    fontSize:Typography.body,

    marginTop:6,

  },

  infoCard:{

    marginHorizontal:Spacing.lg,

    backgroundColor:colors.surface,

    borderRadius:Radius.lg,

    padding:Spacing.lg,

    marginBottom:Spacing.lg,

  },

  infoRow:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    paddingVertical:12,

    borderBottomWidth:1,

    borderBottomColor:colors.border,

  },

  infoLabel:{

    color:colors.textSecondary,

    fontSize:Typography.body,

  },

  infoValue:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"600",

  },

  primaryButton:{

    flexDirection:"row",

    justifyContent:"center",

    alignItems:"center",

    height:56,

    marginHorizontal:Spacing.lg,

    backgroundColor:colors.primary,

    borderRadius:Radius.lg,

    marginBottom:Spacing.lg,

  },

  primaryButtonText:{

    color:colors.buttonText,

    fontSize:Typography.body,

    fontWeight:"700",

    marginLeft:Spacing.sm,

  },

  actionGrid:{

    flexDirection:"row",

    flexWrap:"wrap",

    justifyContent:"space-between",

    marginHorizontal:Spacing.lg,

  },

  actionButton:{

    width:"48%",

    height:100,

    backgroundColor:colors.surface,

    borderRadius:Radius.lg,

    justifyContent:"center",

    alignItems:"center",

    marginBottom:Spacing.md,

  },

  actionText:{

    color:colors.text,

    fontSize:Typography.body,

    marginTop:Spacing.sm,

    fontWeight:"600",

  },
    placeholder:{

    width:42,

  },

  favoriteActive:{

    color:colors.danger,

  },

  divider:{

    height:1,

    backgroundColor:colors.border,

    marginVertical:Spacing.sm,

  },

  bottomSpacing:{

    height:Spacing.xxxl,

  },

});

export default React.memo(FilePreviewScreen);
