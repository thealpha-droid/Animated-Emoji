import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Line,
  Animated,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [animated] = useState([
    new Animated.Value(0.5),
    new Animated.Value(0.5),
    new Animated.Value(0.5),
    new Animated.Value(0.5),
    new Animated.Value(0.5),
    new Animated.Value(0.5),
  ]);
  const [emojis] = useState([
    require("./assets/like.gif"),
    require("./assets/love.gif"),
    require("./assets/haha.gif"),
    require("./assets/wow.gif"),
    require("./assets/sad.gif"),
    require("./assets/angry.gif"),
  ]);
  const d = require("./assets/like.gif");

  const animateButton = (index) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animated[index], {
          toValue: 1,
          duration: 750,
          delay: 0,
          useNativeDriver: true,
        }),
        Animated.timing(animated[index], {
          toValue: 0.5,
          duration: 750,
          delay: 0,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 1,
      }
    ).start();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          width: 380,
        }}
      >
        {emojis.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => animateButton(index)}>
              <Animated.View
                key={index}
                style={{
                  transform: [
                    {
                      scale: animated[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                }}
              >
                <Image
                  style={{
                    width: 70,
                    height: 70,
                  }}
                  source={emojis[index]}
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
