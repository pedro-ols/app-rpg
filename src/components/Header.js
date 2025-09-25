import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";

export default function Header({ title, subtitle }) {
  let [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.headerContainer}>
      <View style={styles.ornamentTop}>
        <MaterialCommunityIcons name="fleur-de-lis" size={28} color="#D4A574" />
        <View style={styles.decorativeLine} />
        <MaterialCommunityIcons name="shield-crown" size={32} color="#D4A574" />
        <View style={styles.decorativeLine} />
        <MaterialCommunityIcons name="fleur-de-lis" size={28} color="#D4A574" />
      </View>
      <View style={styles.titleSection}>
        <View style={styles.bannerLeft} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.titleUnderline} />
        </View>
        <View style={styles.bannerRight} />
      </View>
      <View style={styles.subtitleContainer}>
        <MaterialCommunityIcons name="sword-cross" size={16} color="#8B4513" />
        <Text style={styles.subtitle}>{subtitle}</Text>
        <MaterialCommunityIcons name="sword-cross" size={16} color="#8B4513" />
      </View>
      <View style={styles.ornamentBottom}>
        <View style={styles.scrollDecoration} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 25,
    marginTop: 10,
    backgroundColor: '#2C1810',
    borderRadius: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderTopColor: '#D4A574',
    borderBottomColor: '#D4A574',
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 15,
    position: 'relative',
  },
  ornamentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  decorativeLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#D4A574',
    marginHorizontal: 10,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bannerLeft: {
    width: 0,
    height: 0,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderRightWidth: 30,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#8B0000',
  },
  titleContainer: {
    backgroundColor: '#8B0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bannerRight: {
    width: 0,
    height: 0,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderLeftWidth: 30,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#8B0000',
  },
  title: {
    fontSize: 36,
    fontFamily: "BebasNeue_400Regular",
    textAlign: "center",
    color: "#F5DEB3",
    letterSpacing: 3,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  titleUnderline: {
    width: '100%',
    height: 2,
    backgroundColor: '#D4A574',
    marginTop: 2,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#CD853F",
    fontWeight: "600",
    letterSpacing: 1,
    marginHorizontal: 8,
    fontStyle: 'italic',
  },
  ornamentBottom: {
    alignItems: 'center',
  },
  scrollDecoration: {
    width: 100,
    height: 8,
    backgroundColor: '#8B4513',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D4A574',
  },
});