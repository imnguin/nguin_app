import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = (props) => {
    let {
        title
    } = props;
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        height: 95,
        backgroundColor: '#F46138',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
});
export default Header