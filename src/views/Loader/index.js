import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { selectLoadding } from '../../redux/reducers';

const GlobalLoader = () => {
    const loading = useSelector(selectLoadding) > 0;
    return (
        <Modal
            visible={loading}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default GlobalLoader;
