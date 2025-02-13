import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { getDataStore } from '../../utils/funtions';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');
const Home = ({ navigation }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const sidebarTranslateX = useRef(new Animated.Value(width)).current;
    const info = useSelector(state => JSON.parse(state.user.value));
    const openSidebar = () => {
        if (!isSidebarVisible) {
            setSidebarVisible(true);
            Animated.timing(sidebarTranslateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const closeSidebar = () => {
        if (isSidebarVisible) {
            Animated.timing(sidebarTranslateX, {
                toValue: width,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setSidebarVisible(false));
        }
    };

    return (
        info && <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: info.thumbnail }}
                        resizeMode='contain'
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileName} numberOfLines={2} ellipsizeMode="tail">
                        {`${info.fullname}`}
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image
                            source={require('../../../assets/211693_bell_icon.png')}
                            resizeMode='contain'
                            style={styles.iconImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={openSidebar}>
                        <Image
                            source={require('../../../assets/list.png')}
                            resizeMode='contain'
                            style={styles.iconImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}
                    onPress={() => navigation.navigate('Timekeeping')}
                >
                    <Image
                        source={require('../../../assets/timekeeping.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: '#F46138',
                        }}
                    />
                    <Text style={{ fontSize: 13, marginTop: 5, textAlign: 'center' }} >Chấm công</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}
                    onPress={() => navigation.navigate('VacationsDate')}
                >
                    <Image
                        source={require('../../../assets/9111285_calendar_plus_icon.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: '#F46138',
                        }}
                    />
                    <Text style={{ fontSize: 13, marginTop: 5, textAlign: 'center' }}>Đăng ký nghỉ phép</Text>
                </TouchableOpacity>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}
                >
                    <Image
                        source={require('../../../assets/1181190_email_gmail_google_mail_icon.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: '#F46138',
                        }}
                    />
                    <Text style={{ fontSize: 13, marginTop: 5, textAlign: 'center' }}>Mail</Text>
                </View>
            </View>
            {isSidebarVisible && (
                <Animated.View
                    style={[
                        styles.sidebar,
                        { transform: [{ translateX: sidebarTranslateX }] },
                    ]}
                >
                    <TouchableOpacity onPress={closeSidebar}>
                        <Text style={styles.closeButton}>Đóng</Text>
                    </TouchableOpacity>
                    <Text style={styles.sidebarContent}>Tính năng đang phát triển!</Text>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
    },
    profileName: {
        flexWrap: 'wrap',
        marginLeft: 10,
        fontSize: 14,
        fontWeight: '600'
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    iconButton: {
        backgroundColor: '#F46138',
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        width: 15,
        height: 15,
        tintColor: '#fff',
    },
    card: {
        height: 100,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        borderColor: 'grey',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '80%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 10,
        padding: 20,
    },
    closeButton: {
        fontSize: 16,
        color: '#F46138',
        textAlign: 'right',
        marginBottom: 20,
    },
    sidebarContent: {
        fontSize: 16,
        color: '#333',
    },
});

export default Home;