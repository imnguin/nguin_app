import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Bubble, GiftedChat, Time } from 'react-native-gifted-chat';

const Message = ({ navigation }) => {
    const [focus, setFocus] = useState(false)
    const [onClick, setOnclick] = useState(false)
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [pressed, setPressed] = useState("");
    const handleInputText = (text) => {
        setInputMessage(text);
    }
    const renderMessage = (props) => {
        const { currentMessage } = props;
        if (currentMessage.user._id === 1) {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}>
                    <Bubble
                        {...props}
                        wrapperStyle={
                            {
                                right: {
                                    backgroundColor: '#F46138',
                                    marginRight: 12,
                                    marginVertical: 6,
                                    borderRadius: 7
                                }
                            }
                        }
                        textStyle={{
                            right: {
                                color: '#fff',
                                fontSize: 15,
                            }
                        }}
                        renderTime={(bubbleProps) => (
                            <Time
                                {...bubbleProps}
                                timeTextStyle={{
                                    right: {
                                        color: '#fff',
                                    }
                                }}
                            />
                        )}
                    />
                    {
                        currentMessage._id === messages[0]._id && <View
                            style={{
                                alignSelf: 'flex-end',
                                borderRadius: 7,
                                backgroundColor: "#B5C0C4",
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 12,
                                marginBottom: 12,
                                // width: 55,
                                justifyContent: 'center'
                            }}>
                            <Image
                                source={require('../../../assets/me.png')}
                                style={{
                                    height: 17,
                                    width: 17,
                                    resizeMode: 'contain',
                                    borderRadius: 50,
                                    borderColor: '#fff',
                                    borderWidth: 1
                                }}
                            />
                            {/* <Icon
                                name="check"
                                type="Feather"
                                size={10}
                            />
                            <Text style={{
                                fontSize: 9,
                                marginLeft: 3,
                                color : COLORS.white
                            }}>Đã nhận</Text> */}
                        </View>
                    }

                </View>
            )
        } else {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                }}>
                    <Bubble
                        {...props}
                        wrapperStyle={
                            {
                                left: {
                                    backgroundColor: '#fff',
                                    marginLeft: 12,
                                    marginVertical: 8,
                                    borderRadius: 7
                                }
                            }
                        }
                        textStyle={{
                            left: {
                                color: '#000000',
                                fontSize: 15
                            }
                        }}
                        renderTime={(bubbleProps) => (
                            <Time
                                {...bubbleProps}
                                timeTextStyle={{
                                    left: {
                                        color: '#000000',
                                    }
                                }}
                            />
                        )}
                    />
                </View>
            )
        }
    }

    const handleSendMessage = () => {
        setInputMessage('')
        const message = {
            _id: Math.random().toString(36).toString(7),
            text: inputMessage,
            createdAt: new Date().getTime(),
            user: { _id: 1 },
            read: false
        }

        const message2 = {
            _id: Math.random().toString(36).toString(7),
            text: 'Con mẹ mày!',
            createdAt: new Date().getTime(),
            user: { _id: 2 },
            read: false
        }

        setMessages((previousMessage) =>
            GiftedChat.append(previousMessage, [message2, message]))
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <View style={styles.header}>
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
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss()
                    setOnclick(false)
                    setPressed('')
                }}>
                    <View style={styles.middle}>
                        <GiftedChat
                            messages={messages}
                            renderInputToolbar={() => { return null }}
                            user={{ _id: 1 }}
                            minInputToolbarHeight={0}
                            renderMessage={renderMessage}
                            isKeyboardInternallyHandled={false}
                        />
                    </View>
                </TouchableWithoutFeedback>


                <View style={{ height: focus || onClick ? 50 : 85, ...styles.footer }}>
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss()
                            setOnclick(true)
                            setPressed('sticker')
                        }}
                    >
                        <Image
                            source={require('../../../assets/sticker.png')}
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: pressed == 'sticker' ? '#F46138' : '#605f5f',
                            }}
                        />
                    </TouchableOpacity>
                    <TextInput
                        onFocus={() => {
                            setFocus(true)
                            setOnclick(false)
                        }}
                        onBlur={() => {
                            setFocus(false)
                        }}
                        placeholder="Tin nhắn..."
                        style={{
                            backgroundColor: '#fff',
                            height: 30,
                            flex: 1,
                            borderRadius: 7,
                            fontSize: 17
                        }}
                        onChangeText={handleInputText}
                        value={inputMessage}
                        multiline={true}
                    />
                    {
                        !inputMessage && inputMessage == '' ?
                            <>
                                <TouchableOpacity onPressIn={() => setPressed('menupoint')}>
                                    <Image
                                        source={require('../../../assets/menu_point.png')}
                                        resizeMode='contain'
                                        style={{
                                            width: 30,
                                            height: 30,
                                            tintColor: pressed == 'menupoint' ? '#F46138' : '#605f5f',
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPressIn={() => setPressed('image')}>
                                    <Image
                                        source={require('../../../assets/image.png')}
                                        resizeMode='contain'
                                        style={{
                                            width: 30,
                                            height: 30,
                                            tintColor: pressed == 'image' ? '#F46138' : '#605f5f',
                                        }}
                                    />
                                </TouchableOpacity>
                            </>
                            :
                            <TouchableOpacity onPress={handleSendMessage}>
                                <Image
                                    source={require('../../../assets/send.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 30,
                                        height: 30,
                                        tintColor: '#F46138',
                                    }}
                                />
                            </TouchableOpacity>
                    }
                </View>

                {
                    onClick && <View
                        style={{
                            height: 345
                        }}>
                    </View>
                }
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 95,
        backgroundColor: '#F46138',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10
    },
    middle: {
        flex: 1,
        backgroundColor: '#f2edea',
        borderBottomWidth: 0.5,
        borderBottomColor: '#d4dadd'
    },
    footer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 15,
        padding: 10,
        justifyContent: 'center'
    },
});

export default Message