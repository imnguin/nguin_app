import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { _fetchAPI } from "../../utils/funcRequest";
import { HOSTNAME } from "../../utils/constants/systemVar";
import { useDispatch } from "react-redux";
import { _fetchData } from "../../services/callAPI";

const Test = () => {
    const dispatch = useDispatch();
    const onclick = async () => {
        const param = {
            senderId: "188197",
            content: "Em ăn cơm chưa?",
        };
        const response = await dispatch(
            _fetchData(HOSTNAME, "api/chat/saveChat", param)
        );
    };

    const onclick1 = async () => {
        const param = {
            members: "188197",
        };
        const response = await dispatch(
            _fetchData(HOSTNAME, "api/chat/loadChatsByUser", param)
        );
    };

    const onclick2 = async () => {
        const param = {
            chatId: "188197-98138",
        };
        const response = await dispatch(
            _fetchData(HOSTNAME, "api/chat/loadMessageByChatId", param)
        );
    };
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                gap: 20
            }}
        >
            <TouchableOpacity
                onPress={onclick}
                style={{
                    backgroundColor: "yellow",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    borderRadius: 15
                }}
            >
                <Text>Test add</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onclick1}
                style={{
                    backgroundColor: "yellow",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    borderRadius: 15
                }}>
                <Text>Test load</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onclick2}
                style={{
                    backgroundColor: "yellow",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    borderRadius: 15
                }}>
                <Text>Test load by chatid</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Test;
