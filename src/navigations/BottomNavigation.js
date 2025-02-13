import { View, Text, Platform, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { bottomTabs } from '../constants/bottomTab'
const Tab = createBottomTabNavigator()
const BottomNavigation = () => {
    const renderTab = (focused, tab) => {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                gap: 3
            }}>
                <Image
                    source={focused ? tab.image : tab.image}
                    resizeMode='contain'
                    style={{
                        width: 26,
                        height: 26,
                        tintColor: focused ? '#F46138' : 'gray'
                    }}
                />
                <Text
                    style={{
                        color: focused ? '#F46138' : 'gray',
                        fontSize: 10
                    }}
                >{tab.title}</Text>
            </View>
        )
    }

    const renderHeader = (tab) => {
        return (
            !!tab.isHeaderCustom ? <tab.headerCustom title={tab.title} />
                : <View
                    style={{ height: 95, backgroundColor: '#F46138', flexDirection: 'row', alignItems: 'flex-end', paddingLeft: 15, paddingRight: 15, paddingBottom: 15 }}>
                    <View style={{ flexDirection: 'row', gap: 15, }}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/211818_search_icon.png')}
                                resizeMode='contain'
                                style={{ width: 25, height: 25, tintColor: '#fff', }}
                            />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Tìm kiếm"
                            placeholderTextColor={'#fff'}
                            style={{ borderRadius: 7, flex: 1, fontSize: 15, color: '#fff' }}
                        />
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/211693_bell_icon.png')}
                                resizeMode='contain'
                                style={{ width: 25, height: 25, tintColor: '#fff' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/8545624_qr_code_scan_program_barcode_icon.png')}
                                resizeMode='contain'
                                style={{ width: 25, height: 25, tintColor: '#fff' }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }

    return (
        <Tab.Navigator
            detachInactiveScreens
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    height: 85,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarActiveTintColor: '#F46138',
            }}
        >
            {
                bottomTabs.map((tab, key) => {
                    return (
                        <Tab.Screen
                            key={key}
                            name={tab.name}
                            children={({ navigation, focused }) => <View style={{ flex: 1 }}>{tab.component ? <tab.component navigation={navigation}/> : <Text>{tab.title}</Text>}</View>}
                            options={{
                                headerShown: tab.headerShown,
                                title: tab.title || undefined,
                                tabBarLabel: ({ focused }) => Platform.OS == 'ios' ? renderTab(focused, tab) : null,
                                tabBarIcon: ({ focused }) => Platform.OS == 'ios' ? null : renderTab(focused, tab),
                                ...(!tab.isHeaderDefault && { header: () => renderHeader(tab) }),
                                headerStyle: {
                                    height: 95
                                }
                            }}
                        />
                    )
                })
            }
        </Tab.Navigator>
    )
}

export default BottomNavigation