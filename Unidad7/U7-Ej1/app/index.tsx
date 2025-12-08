import { Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function Index() {
  
  const [isRunning, setIsRunning] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(60);
  
  useEffect(() => {
    if (isRunning && secondsLeft > 0) {

      const interval = setInterval(() => {

        setSecondsLeft(secondsLeft - 1);

      }, 1000);

      return() => clearInterval(interval)
    }
  }, [secondsLeft,isRunning])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{secondsLeft}</Text>
      <Pressable
      onPress={() =>
        setIsRunning(!isRunning)
      }
      ><Text>Start/Stop</Text> </Pressable>
      <Pressable
      onPress={() => {
          setSecondsLeft(60)
        setIsRunning(false)
      } 
      }
      ><Text>Reset</Text> </Pressable>
    </View>
  );
}