import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import userAvt from '../images/userAvt.png'


const TaskDetails = () => {
    return (
        <SafeAreaView>

            <View style={styles.TaskDetailsWrapper}>

                <View style={styles.TaskUserBannerCont}>
                    <View style={styles.TaskBanner}>
                        <View>
                            <Image source={userAvt} style={styles.TaskUserImg}></Image>
                        </View>
                        <View>
                            <View><Text>Salim</Text></View>
                            <View><Text>Sales Department</Text></View>
                        </View>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TaskDetailsWrapper: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F1F1FB",
    },
    TaskUserBannerCont: {
        justifyContent: "center",
        alignItems: "center"
    },
    TaskBanner: {
        width: '80%'
    },
    TaskUserImg: {
        width: 38,
        height: 38
    }
})

export default TaskDetails