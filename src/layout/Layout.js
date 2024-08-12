import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {children}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // This makes the container take up the full screen height
  },
  scrollViewContent: {
    flexGrow: 1, // Ensures that the ScrollView content expands to fill the space
    justifyContent: 'space-between', // Ensures content is spaced correctly within the ScrollView
  },
});

export default Layout;
