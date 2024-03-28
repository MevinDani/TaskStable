import React, { useState } from 'react'
import { Modal, Text, View } from 'react-native'

const LocationModal = ({ mapModalVisible }) => {

    const [modalVisible, setModalVisible] = useState(mapModalVisible)

    console.log('mapModalVisible', mapModalVisible)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >

            <View>
                <Text>
                    Map Modal
                </Text>
            </View>

        </Modal>
    )
}

export default LocationModal