import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startStopHandler = () => {
    if (isRunning) {
      // Pause the timer
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      // Start the timer
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment every 10ms
      }, 10);
    }
  };

  const resetHandler = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0); // Reset time to 0
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor(time / 60000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stopwatch</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={startStopHandler}>
          <MaterialIcons
            name={isRunning ? "pause" : "play-arrow"}
            size={48}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetHandler}>
          <MaterialIcons name="refresh" size={48} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 50,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  button: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
  },
});