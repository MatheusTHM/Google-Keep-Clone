import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const ActionsBar = ({ handleAddButtonPress }) => {
	return (
		<View style={styles.actionsBar}>
			<View style={styles.buttonBar}>
				<Pressable onPress={handleAddButtonPress} style={styles.addButton}>
					<Image style={styles.addButtonIcon} source={require("~/assets/addIcon.png")} />
				</Pressable>
			</View>
			<View style={styles.actions}>
				<Pressable style={styles.actionButton}>
					<AntDesign name="checksquareo" size={24} color="#cacdcd" />
				</Pressable>
				<Pressable style={styles.actionButton}>
					<Ionicons name="md-brush-outline" size={24} color="#cacdcd" />
				</Pressable>
				<Pressable style={styles.actionButton}>
					<Ionicons name="mic-outline" size={24} color="#cacdcd" />
				</Pressable>
				<Pressable style={styles.actionButton}>
					<MaterialIcons name="landscape" size={24} color="#cacdcd" />
				</Pressable>
				<Text style={styles.flavorText}>( ´･･)ﾉ(._.`)</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	actionsBar: {
		position: "absolute",
		bottom: 0,
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		gap: 8,
		width: "100%",
		height: "auto",
		backgroundColor: "transparent",
	},
	buttonBar: {
		display: "flex",
		alignItems: "flex-end",
		width: "100%",
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	addButton: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 48,
		height: 48,
		padding: 8,
		borderRadius: 8,
		backgroundColor: "#2d2e32",
	},
	addButtonIcon: {
		width: 24,
		height: 24,
	},
	actions: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		gap: 16,
		width: "100%",
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: "#2d2e32",
	},
	actionButton: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 32,
		height: 32,
	},
	flavorText: {
		marginLeft: "auto",
		color: "#cacdcd",
	},
});

export default ActionsBar;
