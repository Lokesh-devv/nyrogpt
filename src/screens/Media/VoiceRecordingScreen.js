import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
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

function VoiceRecordingScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* State                                              */
  /* -------------------------------------------------- */

  const [isRecording,
    setIsRecording] =
    useState(false);

  const [isPaused,
    setIsPaused] =
    useState(false);

  const [seconds,
    setSeconds] =
    useState(0);

  /* -------------------------------------------------- */
  /* Timer                                              */
  /* -------------------------------------------------- */

  useEffect(() => {

    let interval;

    if (

      isRecording &&

      !isPaused

    ) {

      interval = setInterval(() => {

        setSeconds(

          prev => prev + 1

        );

      },1000);

    }

    return () => {

      clearInterval(interval);

    };

  },[

    isRecording,

    isPaused,

  ]);

  /* -------------------------------------------------- */
  /* Format Time                                        */
  /* -------------------------------------------------- */

  const formatTime = (time) => {

    const minutes = Math.floor(

      time / 60

    );

    const remainingSeconds =

      time % 60;

    return `${String(minutes).padStart(2,"0")}:${String(remainingSeconds).padStart(2,"0")}`;

  };

  /* -------------------------------------------------- */
  /* Actions                                            */
  /* -------------------------------------------------- */

  const handleRecord = () => {

    setIsRecording(true);

    setIsPaused(false);

  };

  const handlePause = () => {

    setIsPaused(

      !isPaused

    );

  };

  const handleStop = () => {

    setIsRecording(false);

    setIsPaused(false);

  };

  const handleDelete = () => {

    setSeconds(0);

    setIsRecording(false);

    setIsPaused(false);

  };

  const handleSend = () => {

    console.log(

      "Send Recording"

    );

  };

  /* -------------------------------------------------- */
  /* Render                                             */
  /* -------------------------------------------------- */

  return (

    <SafeAreaView style={styles.container} edges={["top"]}>

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

          Voice Recorder

        </Text>

        <View style={styles.placeholder} />

      </View>

      {/* Timer */}

      <View style={styles.timerContainer}>

        <Text style={styles.timerText}>

          {formatTime(seconds)}

        </Text>

        <Text style={styles.recordStatus}>

          {

            isRecording

            ?

            isPaused

              ?

              "Paused"

              :

              "Recording..."

            :

            "Ready to Record"

          }

        </Text>

      </View>

      {/* Waveform */}

      <View style={styles.waveContainer}>

        {

          Array.from({

            length:40,

          }).map((_,index)=>(

            <View

              key={index}

              style={[

                styles.waveBar,

                {

                  height:

                    15 +

                    (index % 6) * 8,

                },

              ]}

            />

          ))

        }

      </View>

            {/* ------------------------------------------ */}
      {/* Recording Controls                          */}
      {/* ------------------------------------------ */}

      <View style={styles.controlsContainer}>

        <TouchableOpacity

          activeOpacity={0.85}

          style={styles.controlButton}

          onPress={handleDelete}

        >

          <Ionicons

            name="trash-outline"

            size={26}

            color={colors.danger}

          />

          <Text

            style={[

              styles.controlText,

              {

                color:colors.danger,

              },

            ]}

          >

            Delete

          </Text>

        </TouchableOpacity>

        {

          !isRecording

          ?

          (

            <TouchableOpacity

              activeOpacity={0.9}

              style={styles.recordButton}

              onPress={handleRecord}

            >

              <Ionicons

                name="mic"

                size={42}

                color={colors.text}

              />

            </TouchableOpacity>

          )

          :

          (

            <TouchableOpacity

              activeOpacity={0.9}

              style={styles.pauseButton}

              onPress={handlePause}

            >

              <Ionicons

                name={

                  isPaused

                  ?

                  "play"

                  :

                  "pause"

                }

                size={36}

                color={colors.text}

              />

            </TouchableOpacity>

          )

        }

        <TouchableOpacity

          activeOpacity={0.85}

          style={styles.controlButton}

          onPress={handleStop}

        >

          <Ionicons

            name="stop-circle-outline"

            size={26}

            color={colors.warning}

          />

          <Text

            style={[

              styles.controlText,

              {

                color:colors.warning,

              },

            ]}

          >

            Stop

          </Text>

        </TouchableOpacity>

      </View>

      {/* ------------------------------------------ */}
      {/* Bottom Buttons                              */}
      {/* ------------------------------------------ */}

      <View style={styles.bottomContainer}>

        <TouchableOpacity

          activeOpacity={0.85}

          style={styles.previewButton}

        >

          <Ionicons

            name="play-circle-outline"

            size={22}

            color={colors.text}

          />

          <Text style={styles.previewText}>

            Preview

          </Text>

        </TouchableOpacity>

        <TouchableOpacity

          activeOpacity={0.85}

          style={styles.sendButton}

          onPress={handleSend}

        >

          <Ionicons

            name="send"

            size={20}

            color={colors.text}

          />

          <Text style={styles.sendButtonText}>

            Send Recording

          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );

}

const createStyles = (colors) => StyleSheet.create({

  container:{

    flex:1,

    backgroundColor:colors.background,

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

  placeholder:{

    width:42,

  },

  headerTitle:{

    color:colors.text,

    fontSize:Typography.title,

    fontWeight:"700",

  },

  timerContainer:{

    alignItems:"center",

    marginTop:Spacing.xxxl,

  },

  timerText:{

    color:colors.text,

    fontSize:42,

    fontWeight:"700",

  },

  recordStatus:{

    color:colors.primary,

    fontSize:Typography.body,

    marginTop:Spacing.sm,

  },

  waveContainer:{

    height:180,

    marginTop:Spacing.xxxl,

    flexDirection:"row",

    justifyContent:"center",

    alignItems:"center",

    paddingHorizontal:Spacing.md,

  },

  waveBar:{

    width:4,

    marginHorizontal:2,

    borderRadius:2,

    backgroundColor:colors.primary,

  },

  controlsContainer:{

    flexDirection:"row",

    justifyContent:"space-around",

    alignItems:"center",

    marginTop:Spacing.xxxl,

    paddingHorizontal:Spacing.lg,

  },

  controlButton:{

    justifyContent:"center",

    alignItems:"center",

  },

  controlText:{

    marginTop:Spacing.sm,

    fontSize:Typography.small,

    fontWeight:"600",

  },

  recordButton:{

    width:90,

    height:90,

    borderRadius:45,

    backgroundColor:colors.danger,

    justifyContent:"center",

    alignItems:"center",

    elevation:6,

  },

  pauseButton:{

    width:90,

    height:90,

    borderRadius:45,

    backgroundColor:colors.primary,

    justifyContent:"center",

    alignItems:"center",

    elevation:6,

  },

  bottomContainer:{

    marginTop:"auto",

    padding:Spacing.lg,

  },

  previewButton:{

    height:54,

    borderRadius:Radius.lg,

    borderWidth:1,

    borderColor:colors.border,

    backgroundColor:colors.surface,

    justifyContent:"center",

    alignItems:"center",

    flexDirection:"row",

    marginBottom:Spacing.md,

  },

  previewText:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"600",

    marginLeft:Spacing.sm,

  },

  sendButton:{

    height:56,

    borderRadius:Radius.lg,

    backgroundColor:colors.primary,

    justifyContent:"center",

    alignItems:"center",

    flexDirection:"row",

  },

  sendButtonText:{

    color:colors.buttonText,

    fontSize:Typography.body,

    fontWeight:"700",

    marginLeft:Spacing.sm,

  },

    recordingIndicator:{

    width:12,

    height:12,

    borderRadius:6,

    backgroundColor:colors.danger,

    marginRight:Spacing.sm,

  },

  waveformSpacer:{

    height:Spacing.lg,

  },

  divider:{

    height:1,

    backgroundColor:colors.border,

    marginVertical:Spacing.md,

  },

  safeBottom:{

    height:Spacing.xxxl,

  },

});

export default React.memo(VoiceRecordingScreen);
