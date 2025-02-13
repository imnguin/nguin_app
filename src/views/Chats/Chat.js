import React, { useState, useCallback, useEffect } from 'react';
import { Bubble, GiftedChat, Message } from 'react-native-gifted-chat';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import CustomInputToolbar from './CustomInputToolbar'; // Import component tự tạo
import { getDataStore, getNameInitials } from '../../utils/funtions';
import { useRoute } from '@react-navigation/native';
import { HOSTNAME } from '../../utils/constants/systemVar';
import { useDispatch, useSelector } from 'react-redux';
import { _fetchData } from '../../services/callAPI';
import { connectSocket, listenForMessages, removeMessageListener, send, sendMessage, socket } from '../../utils/socket';

const Chat = ({ navigation }) => {
    const dispatch = useDispatch();
    const info = useSelector(state => JSON.parse(state.user.value));
    const route = useRoute();
    const [messages, setMessages] = useState([]);
    const { roomId } = route.params;
    const [isLoad, setIsLoad] = useState(false);
    const loadChat = async () => {
        setIsLoad(false);
        const response = await dispatch(
            _fetchData(HOSTNAME, "api/chat/loadMessageByChatId", { roomId })
        );

        const data = response.resultObject.reverse().map((item) => {
            return {
                ...item,
                user: {
                    _id: item.senderId
                }
            };
        });
        setMessages(data);
    }

    useEffect(() => {
        loadChat(roomId)
        setIsLoad(true)
        connectSocket(roomId);

        // Lắng nghe tin nhắn từ server
        listenForMessages((newMessage) => {
            const smg = {
                ...newMessage,
                user : {
                    _id : newMessage.senderId
                },
                _id : newMessage._id ?? Math.random().toString(36)
            }
            setMessages((prevMessages) => GiftedChat.append(prevMessages, [smg]));
        });

        return () => {
            removeMessageListener(); // Xóa sự kiện khi rời khỏi màn hình
        };
    }, [roomId]);

    const onSend = useCallback(async (newMessages = []) => {
        const res = {
            roomId: roomId,
            createdAt: newMessages[0].createdAt,
            text: newMessages[0].text,
            senderId: info.username,
            isRead: false
        }

        sendMessage(res);
    }, []);

    const CustomMessage = (props) => {
        const { currentMessage } = props;
        return (
            <View>
                <Message {...props} />
                {
                    currentMessage.user._id === info.username && <View
                        style={{
                            alignSelf: 'flex-end',
                            borderRadius: 7,
                            backgroundColor: "#B5C0C4",
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 12,
                            marginBottom: 12,
                            justifyContent: 'center'
                        }}>
                        {/* <Image
                            source={require('../../../assets/me.png')}
                            style={{
                                height: 17,
                                width: 17,
                                resizeMode: 'contain',
                                borderRadius: 50,
                                borderColor: '#fff',
                                borderWidth: 1
                            }}
                        /> */}
                    </View>
                }
            </View>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#F46138',
                    },
                    left: {
                        backgroundColor: '#e5e5ea',
                    },
                }}
            />
        );
    };

    return (
        isLoad &&
        <View style={{
            flex: 1
        }}>
            <View style={{
                height: 95,
                backgroundColor: '#F46138',
                flexDirection: 'row',
                alignItems: 'flex-end',
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 10,
            }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/back.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: '#fff',
                            }}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 1,
                            gap: 3
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: '500',
                                color: '#fff'
                            }}
                        >Lâm Xuân Nguyên</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#fff'
                            }}>Vừa mới truy cập</Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            source={require('../../../assets/call.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: '#fff'
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('../../../assets/video_call.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: '#fff'
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('../../../assets/list.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: '#fff'
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: info.username
                }}
                renderMessage={(props) => <CustomMessage {...props} />}
                renderInputToolbar={(props) => (
                    <CustomInputToolbar
                        onSend={(message) => props.onSend([{ text: message.text, user: props.user }])}
                    />
                )}
                renderBubble={renderBubble}
                isStatusBarTranslucentAndroid={true}
            />
        </View>
    );
};

export default Chat;
