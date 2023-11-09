import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

const SafeViewMobile = ({ style, children }) => {
	return (
		<SafeAreaView style={{ ...styles.SafeViewMobile, ...style }}>{children}</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	SafeViewMobile: {
		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
});

export default SafeViewMobile;
