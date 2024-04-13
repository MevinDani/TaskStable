import { View, Text, Modal, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const Loader = ({ visible }) => {
    return (
        <Modal visible={visible} transparent>
            <View style={styles.modalView}>
                <View style={styles.mainView}>
                    <ActivityIndicator size={'large'} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        // width: '100%',
        // height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainView: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})

export default Loader