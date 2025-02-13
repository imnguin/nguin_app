import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HOSTNAME } from '../../utils/constants/systemVar'
import { useDispatch } from 'react-redux';
import { _fetchLogin } from '../../services/callAPI'
import { showNotification } from '../../services/notification';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);

    useEffect(() => {
        setDisableSubmit(!username || !password);
    }, [username, password]);

    const onLogin = async () => {
        const response = await dispatch(_fetchLogin(HOSTNAME, 'api/authen/login', { username, password }));
        if (!response.iserror) {
            showNotification("Thông báo", "Đăng nhập thành công!", navigation.navigate("Main"));
        } else {
            Alert.alert(
                "Thông báo",
                response.message,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                ],
                { cancelable: true }
            );
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.container}>
                    <View
                        style={{
                            height: 300,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 30,
                                color: '#fff',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >Bizlinks{'\n'}Đăng nhập!</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            flex: 1,
                            borderTopRightRadius: 40,
                            borderTopLeftRadius: 40,
                            paddingHorizontal: 25,
                            paddingTop: 40,
                            alignItems: 'center',
                        }}
                    >
                        <TextInput
                            style={{
                                width: '100%',
                                borderBottomWidth: 1,
                                borderBottomColor: '#F46138',
                                height: 40,
                                alignItems: 'center',
                                color: '#000',
                                paddingVertical: 10,
                                marginBottom: 20,
                            }}
                            placeholder="Tài khoản"
                            placeholderTextColor="#F46138"
                            onChangeText={(text) => setUserName(text)}
                        />
                        <TextInput
                            style={{
                                width: '100%',
                                borderBottomWidth: 1,
                                borderBottomColor: '#F46138',
                                height: 40,
                                alignItems: 'center',
                                color: '#000',
                                paddingVertical: 10,
                                marginBottom: 20,
                            }}
                            placeholder="Mật khẩu"
                            placeholderTextColor="#F46138"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassWord(text)}
                        />

                        <TouchableOpacity
                            disabled={disableSubmit}
                            onPress={onLogin}
                            style={{
                                backgroundColor: disableSubmit ? 'gray' : '#F46138',
                                borderRadius: 30,
                                paddingVertical: 15,
                                paddingHorizontal: 100,
                                marginTop: 30,
                                marginBottom: 50,
                            }}>
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}>Đăng nhập</Text>
                        </TouchableOpacity>

                        <View style={{
                            alignItems: 'flex-end',
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                color: 'grey',
                                fontWeight: 'bold',
                            }}>Bạn vẫn chưa có tài khoản?</Text>
                            <TouchableOpacity>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    color: '#000',
                                }}>{" "}Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F46138',
    },
});

export default Login