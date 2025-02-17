import { View, Text, StyleSheet, TextInput, Button, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const VacationsDate = () => {
    const [value, setValue] = useState(null);
    const data = [
        { label: 'Tùy chọn 1', value: 'option1' },
        { label: 'Tùy chọn 2', value: 'option2' },
        { label: 'Tùy chọn 3', value: 'option3' },
    ];
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header title="Đăng ký nghỉ phép" />
            <ScrollView>
                <View
                    style={{
                        marginTop: 25,
                        marginBottom: 15,
                        marginRight: 10,
                        marginLeft: 10,
                        borderRadius: 10,
                        borderColor: "grey",
                        backgroundColor: "#fff",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5,
                        padding: 15,
                        gap: 10
                    }}
                >
                    <View>
                        <Text style={styles.label}>Loại phép:</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={data}
                            labelField="label"
                            valueField="value"
                            placeholder="---Loại phép---"
                            value={value}
                            onChange={(item) => {
                                setValue(item.value);
                            }}
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Thời gian nghỉ phép:</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={data}
                            labelField="label"
                            valueField="value"
                            placeholder="---Thời gian nghỉ phép---"
                            value={value}
                            onChange={(item) => {
                                setValue(item.value);
                            }}
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Chọn ngày nghỉ:</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Từ ngày:</Text>
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Đến ngày:</Text>
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.label}>Người xác nhận:</Text>
                        <TextInput
                            placeholder="Nhập tên, mã người xác nhận"
                            style={{
                                height: 35,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                borderRadius: 8,
                                paddingHorizontal: 8,
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#F46138',
                            borderRadius: 10,
                            paddingVertical: 13,
                            marginLeft: 50,
                            marginRight: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                            marginBottom: 20
                        }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '500',
                            color: '#fff'
                        }}>Cập nhật</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        marginBottom: 25,
                        marginRight: 10,
                        marginLeft: 10,
                        borderRadius: 10,
                        borderColor: "grey",
                        backgroundColor: "#fff",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5,
                        padding: 15,
                        flex: 1
                    }}
                >
                    <View style={{
                        alignItems: 'center',
                        borderBottomWidth: 0.3,
                        borderColor: "#F46138",
                        paddingBottom: 10
                    }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '500',
                                color: '#F46138'
                            }}>Thông tin ngày phép</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 20,
                    }}>
                        <Text>Tổng số ngày phép: </Text>
                        <Text>12</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 20,
                    }}>
                        <Text>Ngày phép đã sử dụng: </Text>
                        <Text>6</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 20,
                    }}>
                        <Text>Ngày phép tồn: </Text>
                        <Text>6</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    dropdown: {
        height: 35,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#aaa',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#000',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    selectedText: {
        marginTop: 20,
        fontSize: 16,
    },
});
export default VacationsDate