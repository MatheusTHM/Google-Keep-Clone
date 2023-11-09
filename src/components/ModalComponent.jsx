import React, { useEffect } from "react";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { Modal } from "react-native";

export function ModalComponent({ onRequestClose, modalVisible, children }) {
	useEffect(() => {
		if (modalVisible) {
			setStatusBarBackgroundColor("#2d2e32");
		}

		return () => {
			setStatusBarBackgroundColor("#1f1f1f");
		};
	}, [modalVisible]);

	return (
		<Modal
			onRequestClose={onRequestClose}
			animationType="slide"
			transparent={true}
			visible={modalVisible}>
			{children}
		</Modal>
	);
}
