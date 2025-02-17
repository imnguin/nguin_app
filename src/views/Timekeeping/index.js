import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { calculateTimeLeft, formatTime } from '../../utils/funtions';

const Timekeeping = ({ navigation }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [timeCheckIn, setTimeCheckIn] = useState(null);
    const [timeCheckOut, setTimeCheckOut] = useState(null);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!!timeCheckIn) {
            setTimeLeft(calculateTimeLeft(timeCheckIn.hours, timeCheckIn.minutes, timeCheckIn.seconds));
        }
    }, [timeCheckIn])

    const checkIn = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        updateTimekeeping('checkin', { hours, minutes, seconds });
    };

    const checkOut = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        updateTimekeeping('checkout', { hours, minutes, seconds })
    };

    const updateTimekeeping = (key, time) => {
        if (key == 'checkin') {
            setTimeCheckIn(time)
        }

        if (key == 'checkout') {
            setTimeCheckOut(time)
            setTimeCheckIn({ hours: 0, minutes: 0, seconds: 0 })
        }
    }

    return (
        <View style={styles.container}>
            <Header title='Chấm công' />
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    {/* <Image
            source={require('../../../assets/time_keeping.png')}
            resizeMode='contain'
            style={styles.cardContentImage}
          /> */}
                    <View style={styles.cardContentTimerRow}>
                        <Text style={styles.cardContentTimerText}>Còn lại </Text>
                        <Text style={styles.cardContentTimerHighlight}>{formatTime(timeLeft)}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ ...styles.btnTimekeeping, backgroundColor: !!timeCheckOut ? 'gray' : '#F46138' }}
                    onPress={!timeCheckIn ? checkIn : checkOut}
                    disabled={!!timeCheckOut ? true : false}>
                    <Text style={styles.btnTimekeepingText}>{!timeCheckIn ? 'Chấm công vào' : 'Chấm công ra'}</Text>
                </TouchableOpacity>
                <View style={styles.timekeepingInfo}>
                    <View style={styles.timekeepingInfoRow}>
                        <View style={styles.timekeepingInfoRowContent}>
                            <Image
                                source={require('../../../assets/352521_location_on_icon.png')}
                                resizeMode='contain'
                                style={styles.timekeepingInfoRowImage}
                            />
                            <Text style={styles.timekeepingInfoText}>Nơi làm việc</Text>
                        </View>
                        <Text style={styles.timekeepingInfoText}>Trụ sở</Text>
                    </View>
                    <View style={styles.timekeepingInfoHr} />
                    <View style={styles.timekeepingInfoRow}>
                        <View style={styles.timekeepingInfoRowContent}>
                            <Image
                                source={require('../../../assets/8666798_clock_watch_icon.png')}
                                resizeMode='contain'
                                style={styles.timekeepingInfoRowImage}
                            />
                            <Text style={styles.timekeepingInfoText}>Giờ vào</Text>
                        </View>
                        <Text style={styles.timekeepingInfoText}>00:00</Text>
                    </View>
                    <View style={styles.timekeepingInfoHr} />
                    <View style={styles.timekeepingInfoRow}>
                        <View style={styles.timekeepingInfoRowContent}>
                            <Image
                                source={require('../../../assets/8666798_clock_watch_icon.png')}
                                resizeMode='contain'
                                style={styles.timekeepingInfoRowImage}
                            />
                            <Text style={styles.timekeepingInfoText}>Giờ ra</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.history}>
                <TouchableOpacity style={styles.btnHistory} onPress={() => navigation.navigate("TimekeepingHistory")}>
                    <View style={styles.historyRow}>
                        <Image
                            source={require('../../../assets/history_timekeeping_icon.png')}
                            resizeMode='contain'
                            style={styles.historyIcon}
                        />
                        <Text style={styles.historyText}>Lịch sử chấm công</Text>
                    </View>
                    <Image
                        source={require('../../../assets/nextIcon.png')}
                        resizeMode='contain'
                        style={styles.historyIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    card: {
        marginTop: 25,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 15,
        borderColor: 'grey',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15
    },
    cardContentImage: {
        width: 200,
        height: 150
    },
    cardContentTimerRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    cardContentTimerText: {
        fontSize: 16,
        color: '#F46138'
    },
    cardContentTimerHighlight: {
        fontWeight: '700',
        fontSize: 16,
        color: '#F46138'
    },
    btnTimekeeping: {
        backgroundColor: '#F46138',
        borderRadius: 10,
        paddingVertical: 13,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTimekeepingText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#fff'
    },
    timekeepingInfo: {
        gap: 20,
        margin: 20,
        borderRadius: 15,
        borderColor: 'grey',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        padding: 20
    },
    timekeepingInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    timekeepingInfoRowContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15
    },
    timekeepingInfoRowImage: {
        width: 20,
        height: 20,
        tintColor: '#F46138'
    },
    timekeepingInfoHr: {
        height: 1,
        backgroundColor: '#f2efef'
    },
    timekeepingInfoText: {
        fontSize: 17,
        color: '#F46138',
        fontWeight: '500'
    },
    history: {
        borderRadius: 15,
        borderColor: 'grey',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 25,
        marginRight: 10,
        marginLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    btnHistory: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        justifyContent: 'space-between'
    },
    historyRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    historyIcon: {
        width: 30,
        height: 30,
        tintColor: '#F46138'
    },
    historyText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#F46138',
        marginLeft: 10
    }
});

export default Timekeeping