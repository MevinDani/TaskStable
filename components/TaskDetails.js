import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView } from 'react-native'
import userAvt from '../images/userAvt.png'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TaskDetails = () => {
    const route = useRoute()
    const { task_id, created_on, task_scheduledon } = route.params;
    const createdDate = created_on.split('T')[0]; // Extract date part
    const scheduledDate = task_scheduledon.split('T')[0]; // Extract date part

    const [userData, setUserData] = useState(null)

    const [taskData, setTaskData] = useState(null)
    const [taskHistory, setTaskHistory] = useState(null)
    const [allStatusList, setAllStatusList] = useState(null)
    const [statusArray, setStatusArray] = useState([])

    const [statusDescription, setStatusDescription] = useState('')
    const [fileDescription, setFileDescription] = useState('')

    const initStatus = ['ESCALATED', 'ACCEPTED_OPEN', 'ACCEPTED_ON_HOLD']
    const travelStart = ['TRAVEL_START']
    const travelStop = ['TRAVEL_END']
    const taskStart = ['TASK_START']
    const taskStop = ['TASK_END']
    const lastStatus = ['CUSTOMER_REJECTION', 'COMPLETED', 'BEYOND THE SCOPE']

    const [selectedStatus, setSelectedStatus] = useState(null);

    const handleStatusClick = (item) => {
        setSelectedStatus(item === selectedStatus ? null : item);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDataJson = await AsyncStorage.getItem('userData');
                const userData = JSON.parse(userDataJson);
                // Now you have userData, you can use it here
                setUserData(userData)
                console.log(userData, 'userData')

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchTaskData = async () => {
            if (task_id) {
                try {
                    const response = await axios.get(`https://cubixweberp.com:156/api/CRMTaskMainList/CPAYS/single/-/-/-/${task_id}/-/${createdDate}/${scheduledDate}/-`);
                    const data = response.data;
                    setTaskData(data)

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchTaskData();
    }, [task_id])

    useEffect(() => {
        const fetchHistoryData = async () => {
            if (task_id) {
                try {
                    const response = await axios.get(`https://cubixweberp.com:156/api/CRMTAskHistoryList/cpays/all/-/${task_id}/`);
                    const data = response.data;
                    setTaskHistory(data)

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchHistoryData();
    }, [task_id])

    useEffect(() => {
        const fetchStatusListAll = async () => {
            try {
                const response = await axios.get(`https://cubixweberp.com:156/api/CRMTAskStageList/CPAYS/all/-`);
                const data = response.data;
                setAllStatusList(data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchStatusListAll()
    }, [])

    useEffect(() => {
        if (taskHistory) {
            if (taskHistory.length == 0) {
                setStatusArray(initStatus)
            }
        }
    }, [taskHistory])

    // taskstatusSave
    const taskStatusSave = async () => {

        const statusCode = allStatusList.find((item) => item.code_name === selectedStatus)?.code_value;

        let reqData = [
            {
                cmpcode: "CPAYS",
                created_on: created_on.replace("T", " "),
                latitude: userData && userData.latitude.toString(),
                longitude: userData && userData.longitude.toString(),
                mode: "ENTRY",
                name_of_file_uploaded: "",
                task_id: task_id,
                task_ownder_id: userData && userData.empid,
                task_ownder_name: userData && userData.Name,
                task_scheduledon: task_scheduledon,
                task_stage: '',
                task_stage_code: '0',
                task_stage_description: statusDescription,
                task_status: selectedStatus,
                task_status_code: statusCode,
                task_status_description: statusDescription,
            }
        ]

        let stringifiedJson = JSON.stringify(reqData)

        console.log(stringifiedJson)
        try {
            await axios.post(`https://cubixweberp.com:156/api/CRMTaskHistory`, stringifiedJson, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                console.log(res, 'taskSave')
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // console.log(taskData)
    // console.log(taskHistory)

    // console.log(allStatusList)

    console.log(statusArray)

    // console.log(task_id, created_on, task_scheduledon)
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
                        padding: 4,
                        backgroundColor: 'white'
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Task Details</Text>
                    </View>

                    <View style={{
                        width: "100%",
                        justifyContent: 'flex-start',
                        margin: 8,
                        padding: 4,
                        backgroundColor: 'white'
                    }}>
                        <Text style={{ fontSize: 16, color: 'grey' }}>task name</Text>
                        <Text style={{ fontSize: 16, color: 'black' }}>{taskData ? taskData[0].task_name : ''}</Text>
                    </View>

                    <View style={{
                        width: "100%",
                        justifyContent: 'flex-start',
                        margin: 8,
                        padding: 4,
                        backgroundColor: 'white'
                    }}>
                        <Text style={{ fontSize: 16, color: 'grey' }}>task description</Text>
                        <Text style={{ fontSize: 16, color: 'black' }}>{taskData ? taskData[0].task_description : ''}</Text>

                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        backgroundColor: 'white'
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
                            <Text style={{ fontSize: 16, color: 'black' }}>{taskData ? taskData[0].include_travel : ''}</Text>
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
                            <Text style={{ fontSize: 16, color: 'black' }}>{taskData ? taskData[0].priority : ''}</Text>
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
                            <Text style={{ fontSize: 16, color: 'black' }}>{scheduledDate}</Text>
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
                            <Text style={{ fontSize: 16, color: 'black' }}>{taskData ? taskData[0].task_owner_name : ''}</Text>
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
                            <Text style={{ fontSize: 16, color: 'black' }}>{taskData ? taskData[0].task_type : ''}</Text>
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
                            {/* {
                                taskHistory?.length == 0 &&
                                <> */}

                            {
                                statusArray.map((status, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleStatusClick(status)}
                                        style={{
                                            backgroundColor: selectedStatus === status ? '#0D6EFD' : '#F1F1F1',
                                            padding: 8,
                                            margin: 4,
                                            borderRadius: 4
                                        }}
                                    >
                                        <Text style={{ color: selectedStatus === status ? 'white' : 'black' }}>{status}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                            {/* </>
                            } */}

                        </View>

                        <View>
                            <View>
                                <Text>optional</Text>
                            </View>
                            <View style={[styles.inputContainer]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Enter description'
                                    onChangeText={text => setStatusDescription(text)}
                                    value={statusDescription}
                                />
                            </View>
                            {
                                selectedStatus &&
                                <TouchableOpacity
                                    onPress={() => taskStatusSave()}
                                    style={{
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
                            }
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
                                    onChangeText={text => setFileDescription(text)}
                                    value={fileDescription}
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
        backgroundColor: 'white'
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