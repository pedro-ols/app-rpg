import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import AppLoading from "expo-app-loading";

export default function Header({ title, subtitle }) {
  let [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 28,
    marginTop: 8,
  },
  title: {
    fontSize: 68,
    fontFamily: "BebasNeue_400Regular",
    textAlign: "center",
    color: "#d32f2f",
    letterSpacing: 2,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#b71c1c",
    fontWeight: "bold",
    letterSpacing: 1,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});