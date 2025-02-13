import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';

const CustomInputToolbar = React.memo(({ onSend }) => {
    const [text, setText] = useState('');
    const [pressed, setPressed] = useState("");
    const handleSend = useCallback(() => {
        if (text.trim().length > 0) {
            onSend({ text: text.trim() });
            setText('');
        }
    }, [text, onSend]);

    return (
        <View style={{
            height: Platform.OS == 'ios' ? 85 : 60,
            backgroundColor: '#fff',
            flexDirection: 'row',
            gap: 15,
            padding: 10,
            justifyContent: 'center',
            alignItems : Platform.OS == 'ios' ? '' : 'center',
        }}>
            <TouchableOpacity
                onPress={() => {
                    // Keyboard.dismiss()
                    // setOnclick(true)
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
                placeholder="Tin nhắn..."
                style={{
                    backgroundColor: '#fff',
                    height: 40,
                    flex: 1,
                    borderRadius: 7,
                    fontSize: 17
                }}
                onChangeText={(t) => setText(t)}
                value={text}
                multiline={true}
            />
            {
                !text ?
                    <>
                        <TouchableOpacity onPressIn={() =>
                            setPressed('menupoint')
                        }>
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
                        <TouchableOpacity onPressIn={() =>
                            setPressed('image')}>
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
                    <TouchableOpacity onPress={handleSend}>
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
    );
});

export default CustomInputToolbar;
