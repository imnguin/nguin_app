import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AllOrder from './AllOrder'
import ToConfirm from './ToConfirm'
import ToReceive from './ToReceive'
import Completed from './Completed'
import Cancelled from './Cancelled'
const Tab = createMaterialTopTabNavigator()
const Order = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'none',
        },
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: 120 },
        tabBarIndicatorStyle: {
          backgroundColor: '#F46138'
        }
      }}
    >
      <Tab.Screen
        name='allorders'
        children={() => { return <AllOrder /> }}
        options={{
          tabBarLabel: 'Tất cả'
        }}
      />
      <Tab.Screen
        name='toconfirm'
        children={() => {
          return <ToConfirm />
        }}
        options={{
          tabBarLabel: 'Chờ xác nhận'
        }}
      />
      <Tab.Screen
        name='toreceive'
        children={() => {
          return <ToReceive />
        }}
        options={{
          tabBarLabel: 'Đang giao'
        }}
      />
      <Tab.Screen
        name='completed'
        children={() => {
          return <Completed />
        }}
        options={{
          tabBarLabel: 'Hoàn thành'
        }}
      />
      <Tab.Screen
        name='cancelled'
        children={() => {
          return <Cancelled />
        }}
        options={{
          tabBarLabel: 'Đã hủy'
        }}
      />
    </Tab.Navigator>
  )
}

export default Order