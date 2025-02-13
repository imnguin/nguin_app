import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'

const ToConfirm = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 200
                }}>
                <Image
                    source={require('../../../assets/49596_history_order_icon.png')}
                    resizeMode='contain'
                    style={{
                        width: 60,
                        height: 60,
                    }}
                />
                <Text style={{
                    marginTop: 15,
                    color: 'gray'
                }}>Bạn chưa có đơn hàng nào cả</Text>
            </View>
        </ScrollView>
    )
}

export default ToConfirm