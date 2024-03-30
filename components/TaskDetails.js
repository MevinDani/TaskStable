import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView } from 'react-native'
import userAvt from '../images/userAvt.png'


const TaskDetails = () => {
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView vertical={true} style={{
                marginTop: 8
            }}>
                <View style={styles.TaskHomeWrapper}>

                    {/* HeaderNav */}
                    <View style={styles.THHeaderNav}>
                        <View><Text>EXPERT</Text></View>
                        <View>
                            <Image source={require('../images/ic_hamburger.png')}></Image>
                        </View>
                    </View>

                    {/* UserBanner */}
                    <ImageBackground source={require('../images/header_background.png')} style={{
                        width: "100%",
                        marginTop: 12,
                        // paddingVertical: 24,
                        height: 110,
                        display: "flex",
                        justifyContent: "flex-end"
                        // paddingHorizontal: 0
                    }}>
                    </ImageBackground>

                    <View style={{
                        width: "100%",
                        justifyContent: 'flex-start',
                        margin: 8,
                        padding: 4
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Task Details</Text>
                    </View>

                    <View style={{
                        width: "100%",
                        justifyContent: 'flex-start',
                        margin: 8,
                        padding: 4
                    }}>
                        <Text style={{ fontSize: 16, color: 'grey' }}>task name</Text>
                        <Text style={{ fontSize: 16, color: 'black' }}>new task</Text>
                    </View>

                    <View style={{
                        width: "100%",
                        justifyContent: 'flex-start',
                        margin: 8,
                        padding: 4
                    }}>
                        <Text style={{ fontSize: 16, color: 'grey' }}>task description</Text>
                        <Text style={{ fontSize: 16, color: 'black' }}>new task</Text>

                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap'
                    }}>

                        <View style={{
                            width: '48%',
                            padding: 8,
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            margin: 4,
                            // borderColor: 'gray', // Border color
                            // borderWidth: 1, // Border width
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,

                            elevation: 1,

                        }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>travel included</Text>
                            <Text style={{ fontSize: 16, color: 'black' }}>yes</Text>
                        </View>
                        <View style={{
                            width: '48%',
                            padding: 8,
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            margin: 4,
                            // borderColor: 'gray', // Border color
                            // borderWidth: 1, // Border width
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,

                            elevation: 1,
                        }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>priority</Text>
                            <Text style={{ fontSize: 16, color: 'black' }}>Moderate</Text>
                        </View>
                        <View style={{
                            width: '48%',
                            padding: 8,
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            margin: 4,
                            // borderColor: 'gray', // Border color
                            // borderWidth: 1, // Border width
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,

                            elevation: 1,
                        }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>task start date</Text>
                            <Text style={{ fontSize: 16, color: 'black' }}>Mar 30 2024 09:00 AM</Text>
                        </View>
                        <View style={{
                            width: '48%',
                            padding: 8,
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            margin: 4,
                            // borderColor: 'gray', // Border color
                            // borderWidth: 1, // Border width
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,

                            elevation: 1,
                        }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>task assigned to</Text>
                            <Text style={{ fontSize: 16, color: 'black' }}>AJMAL</Text>
                        </View>
                        <View style={{
                            width: '48%',
                            padding: 8,
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            margin: 4,
                            // borderColor: 'gray', // Border color
                            // borderWidth: 1, // Border width
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,

                            elevation: 1,

                        }}>
                            <Text style={{ fontSize: 16, color: 'grey' }}>task type</Text>
                            <Text style={{ fontSize: 16, color: 'black' }}>inhouse</Text>
                        </View>
                    </View>

                    <View style={{
                        width: '98%',
                        padding: 12,
                        margin: 8,
                        backgroundColor: '#F8F8FF',
                        borderRadius: 4
                    }}>


                        <View>
                            <Text style={{
                                color: 'black'
                            }}>select status</Text>
                        </View>

                        <View style={{
                            width: '100%',
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                backgroundColor: '#F1F1F1',
                                padding: 8,
                                margin: 4
                            }}>
                                <Text style={{
                                    color: 'black'
                                }}>ESCALATED</Text>
                            </View>

                            <View style={{
                                backgroundColor: '#F1F1F1',
                                padding: 8,
                                margin: 4
                            }}>
                                <Text style={{
                                    color: 'black'
                                }}>ACCEPTED_OPEN</Text>
                            </View>

                            <View style={{
                                backgroundColor: '#F1F1F1',
                                padding: 8,
                                margin: 4
                            }}>
                                <Text style={{
                                    color: 'black'
                                }}>ACCEPTED_ON_HOLD</Text>
                            </View>

                        </View>

                        <View>
                            <View>
                                <Text>optional</Text>
                            </View>
                            <View style={[styles.inputContainer]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Enter description'
                                />
                            </View>
                            <TouchableOpacity style={{
                                width: '20%',
                                margin: 4,
                                color: 'white',
                                backgroundColor: '#0D6EFD',
                                padding: 8,
                                borderRadius: 4
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 15
                                }}>Save</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{
                        width: '98%',
                        padding: 12,
                        margin: 8,
                        backgroundColor: '#F8F8FF',
                        borderRadius: 4
                    }}>


                        <View>
                            <Text style={{
                                color: 'black'
                            }}>upload files</Text>
                        </View>

                        {/* <View style={{
                            width: '100%',
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                backgroundColor: '#F1F1F1',
                                padding: 8,
                                margin: 4
                            }}>
                                <Text style={{
                                    color: 'black'
                                }}>ESCALATED</Text>
                            </View>

                            <View style={{
                                backgroundColor: '#F1F1F1',
                                padding: 8,
                                margin: 4
                            }}>
                                <Text style={{
                                    color: 'black'
                                }}>ACCEPTED_OPEN</Text>
                            </View>

                            <View style={{
                                backgroundColor: '#F1F1F1',
                                padding: 8,
                                margin: 4
                            }}>
                                <Text style={{
                                    color: 'black'
                                }}>ACCEPTED_ON_HOLD</Text>
                            </View>

                        </View> */}

                        <View>
                            <View>
                                <TouchableOpacity style={{
                                    width: '30%',
                                    margin: 4,
                                    color: 'white',
                                    backgroundColor: '#EFEFEF',
                                    padding: 8,
                                    borderRadius: 4
                                }}>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 15
                                    }}>Choose file</Text>
                                </TouchableOpacity>
                                <Text>No File Chosen</Text>
                            </View>
                            <View style={[styles.inputContainer]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Enter description'
                                />
                            </View>
                            <TouchableOpacity style={{
                                width: '20%',
                                margin: 4,
                                color: 'white',
                                backgroundColor: '#FFC107',
                                padding: 8,
                                borderRadius: 4
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 15
                                }}>Upload</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{
                        width: '100%',
                        paddingHorizontal: 12
                    }}>

                        <View>
                            <Text style={{
                                color: 'black',
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>Task timeline</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: 'black'
                            }}>no activity to show</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    TaskHomeWrapper: {
        flex: 1,
        alignItems: "center",
    },
    THHeaderNav: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 14
    },
    THUserBanner: {
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: "center",
    },
    button: {
        width: '45%',
        backgroundColor: '#303289',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    inputContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginTop: 12,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        paddingLeft: 10,
    },
})

export default TaskDetails