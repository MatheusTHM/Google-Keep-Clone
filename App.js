import { useState } from "react";
import {
	Button,
	FlatList,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeViewMobile from "./src/components/SafeViewMobile";
import ActionsBar from "./src/components/ActionsBar";
import { ModalComponent } from "~/components/ModalComponent";
import { monthNumberToText } from "~/helpers/parseDates";

export default function App() {
	const [modalVisible, setModalVisible] = useState(false);
	const [currentNote, setCurrentNote] = useState({
		id: null,
		title: "",
		text: "",
		updatedAt: new Date(),
	});

	const [notesList, setNotesList] = useState([]);

	function currentNoteInputHandler(value, name) {
		setCurrentNote({
			...currentNote,
			[name]: value,
		});
	}

	function openEditNote(note) {
		setCurrentNote({
			...note,
		});
		setModalVisible(true);
	}

	function handleEditNote(contentFilled) {
		if (!contentFilled) {
			setNotesList([...notesList.filter((note) => note.id !== currentNote.id)]);

			return;
		}

		setNotesList([
			...notesList.filter((note) => note.id !== currentNote.id),
			{ ...currentNote, updatedAt: new Date() },
		]);

		return;
	}

	function handleNewNote(contentFilled) {
		if (!contentFilled) return;

		const newID = notesList.length ? notesList[notesList.length - 1].id + 1 : 1;

		setNotesList([
			...notesList,
			{
				...currentNote,
				id: newID,
				updatedAt: new Date(),
			},
		]);
	}

	function handleCloseModal() {
		const isEditing = !!currentNote.id;
		const contentFilled = currentNote.title || currentNote.text.trim();

		if (isEditing) handleEditNote(contentFilled);
		if (!isEditing) handleNewNote(contentFilled);

		setCurrentNote({
			id: 0,
			title: "",
			text: "",
			updatedAt: new Date(),
		});

		setModalVisible(false);
	}

	function handleAddButtonPress() {
		setModalVisible(true);
	}

	function parseUpdatedAt(updatedAt) {
		const today = new Date();

		if (today.toDateString() === updatedAt.toDateString()) {
			const hours = updatedAt.getHours().toString().padStart(2, "0");
			const minutes = updatedAt.getMinutes().toString().padStart(2, "0");
			return `${hours}:${minutes}`;
		}

		if (today.getFullYear() === updatedAt.getFullYear()) {
			const day = updatedAt.getDate().toString().padStart(2, "0");
			const month = (updatedAt.getMonth() + 1).toString().padStart(2, "0");
			return `${day} de ${monthNumberToText(month).substring(0, 3)}`;
		}

		const day = updatedAt.getDate().toString().padStart(2, "0");
		const month = (updatedAt.getMonth() + 1).toString().padStart(2, "0");
		const year = updatedAt.getFullYear();
		return `${day} de ${monthNumberToText(month).substring(0, 3)} de ${year}`;
	}

	return (
		<View style={styles.appContainer}>
			<SafeViewMobile style={styles.contentContainer}>
				<View style={styles.notesContainer}>
					<FlatList
						data={notesList}
						keyExtractor={(item) => item.id.toString()}
						numColumns={2}
						renderItem={({ item }) => (
							<Pressable style={styles.pressableNote} onPress={() => openEditNote(item)}>
								<View style={styles.noteItem}>
									<Text style={styles.noteText}>
										{!!item.title ? item.title : item.text.trimStart()}
									</Text>
								</View>
							</Pressable>
						)}
					/>
				</View>
				<ModalComponent onRequestClose={handleCloseModal} modalVisible={modalVisible}>
					<View style={styles.modalContentContainer}>
						<View style={styles.modalContent}>
							<View style={styles.modalHeader}>
								<Pressable style={styles.modalButton} onPress={handleCloseModal}>
									<Ionicons name="ios-arrow-back" size={24} color="#fff" />
								</Pressable>
							</View>
							<ScrollView
								style={styles.modalBody}
								contentContainerStyle={styles.modalInputsContainer}>
								<TextInput
									placeholder="Título"
									placeholderTextColor="#969696"
									value={currentNote.title}
									onChangeText={(value) => currentNoteInputHandler(value, "title")}
									style={{ ...styles.input, ...styles.titleInput }}
								/>
								<TextInput
									placeholder="Nota"
									placeholderTextColor="#969696"
									value={currentNote.text}
									onChangeText={(value) => currentNoteInputHandler(value, "text")}
									style={{ ...styles.input, ...styles.textInput }}
									multiline={true}
								/>
							</ScrollView>
							<View style={styles.modalFooter}>
								<Text style={styles.modalFooterText}>
									Editado {parseUpdatedAt(currentNote.updatedAt)}
								</Text>
							</View>
						</View>
					</View>
				</ModalComponent>
				<ActionsBar handleAddButtonPress={handleAddButtonPress} />
			</SafeViewMobile>
		</View>
	);
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
	},
	contentContainer: {
		position: "relative",
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	notesContainer: {
		flex: 1,
		width: "100%",
		height: "100%",
		maxHeight: "100%",
		paddingHorizontal: 8,
		paddingTop: 16,
		marginBottom: 56,
	},
	modalContentContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		width: "100%",
		height: "100%",
		backgroundColor: "#2d2e32",
	},
	modalHeader: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		width: "100%",
		paddingHorizontal: 8,
		marginVertical: 16,
		marginBottom: 16,
	},
	modalFooter: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		paddingHorizontal: 8,
		marginVertical: 16,
	},
	modalFooterText: {
		fontSize: 12,
		color: "#e5e5e5",
	},
	modalButton: {
		padding: 8,
	},
	modalBody: {
		display: "flex",
		width: "100%",
	},
	modalInputsContainer: {
		display: "flex",
		gap: 16,
		width: "100%",
		height: "100%",
	},
	input: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		width: "100%",
		paddingVertical: 8,
		paddingHorizontal: 16,
		fontSize: 16,
		lineHeight: 16,
		textAlign: "left",
		textAlignVertical: "center",
		color: "#e5e5e5",
	},
	titleInput: {
		fontSize: 18,
		lineHeight: 18,
	},
	textInput: {
		flex: 1,
		textAlignVertical: "top",
	},
	pressableNote: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		maxWidth: "48%",
		maxHeight: 50,
		margin: 4,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#636363",
	},
	noteItem: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		width: "100%",
		height: "100%",
		padding: 16,
	},
	noteText: {
		fontSize: 16,
		lineHeight: 16,
		color: "#f3f3f3",
	},
});
