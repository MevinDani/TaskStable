import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, TextInput, Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ToastManager, { Toast } from 'toastify-react-native'



// import DateTimePicker from 'react-native-ui-datepicker';
// import dayjs from 'dayjs';

const EmployeeTaskHome = () => {

    const [taskList, setTaskList] = useState(null)

    const [modalVisible, setModalVisible] = useState(false);

    const [taskname, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const [taskComesUnder, setTaskComesUnder] = useState(null)

    const handleTaskComeUnder = (option) => {
        setTaskComesUnder(option)
    }

    const [taskType, setTaskType] = useState(null)

    const handleTaskType = (option) => {
        setTaskType(option)
    }

    const [includeTravel, setIncludeTravel] = useState(null)

    const handleIncludeTravel = (option) => {
        setIncludeTravel(option)
    }

    const [priorityLevel, setPriorityLevel] = useState(null)

    const handlePriorityLevel = (option) => {
        setPriorityLevel(option)
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('https://cubixweberp.com:156/api/CRMTaskMainList/CPAYS/all/-/-/-/-/-/2024-01-10/2024-03-28/-');
            setTaskList(response.data);
            console.log('fetchData')
        } catch (error) {
            console.log(error, 'getTaskListError')
        }
    };

    useEffect(() => {

        fetchData();
    }, [])

    const showTaskSaveToast = () => {
        Toast.success('Task Added Successfully')
    }

    const showEmptyTaskFields = () => {
        Toast.error('Form is not filled!')
    }

    const ErrorAddTask = () => {
        Toast.error('Some Error Occured')
    }


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const [combinedDateTime, setCombinedDateTime] = useState('')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        console.warn("A date has been picked: ", date);

        // Extract date part
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        // Formatted date in yyyy-MM-dd format
        const formattedDate = `${year}-${month}-${day}`;

        setDate(formattedDate);
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        console.warn("A time has been picked: ", time);

        // Extract time part
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const seconds = String(time.getSeconds()).padStart(2, '0');

        // Formatted time in HH:mm:ss format
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        setTime(formattedTime);
        hideTimePicker();
    };

    // Combine date and time into a single Date object
    const combineDateTime = () => {
        // Get date object from formatted date string
        const dateParts = date.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Month is zero-based
        const day = parseInt(dateParts[2]);

        // Get time object from formatted time string
        const timeParts = time.split(':');
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const seconds = parseInt(timeParts[2]);

        // Create combined Date object
        const combinedDateTime = new Date(year, month, day, hours, minutes, seconds);

        setCombinedDateTime(combinedDateTime)

        // Use combinedDateTime as needed
        console.log("Combined DateTime:", combinedDateTime);
    };

    useEffect(() => {
        if (date && time) {
            combineDateTime()
        }
    }, [date, time])

    const getPriorityColor = priority => {
        switch (priority.toLowerCase()) {
            case 'high':
                return '#870404';
            case 'moderate':
                return '#F0D802';
            case 'low':
                return '#36CC36';
            default:
                return '#F3F3F3'; // Default color
        }
    };

    const getTextColor = (priority) => {
        return priority === 'High' || priority === 'Low' ? '#FFFFFF' : '#000000'; // White for High and Low, black for others
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const saveTask = async () => {
        if (taskname !== '' && taskDescription !== '' && includeTravel !== null && priorityLevel !== null && taskComesUnder !== null && taskType !== null) {
            console.log('field is filled')
            try {

                const createdOn = getCurrentDateTime();

                const response = await axios.post('https://cubixweberp.com:156/api/CRMTaskMain', [
                    {
                        "cmpcode": "CPAYS",
                        "mode": "ENTRY",
                        "task_id": "DE9ECBC2-F1DF-40F1-BC67-4BD3087978BD",
                        "task_name": taskname,
                        "task_description": taskDescription,
                        "include_travel": includeTravel,
                        "job_code": "",
                        "priority": priorityLevel,
                        "task_scheduledon": combinedDateTime,
                        "task_owner_id": "AJMAL",
                        "task_ownder_name": "AJMAL",
                        "task_ownder_dept": "",
                        "task_comes_under": taskComesUnder,
                        "task_type": "Inhouse",
                        "latest_status": "",
                        "latest_status_code": "",
                        "latest_stage": "",
                        "latest_stage_code": "",
                        "created_on": createdOn,
                        "task_creator_name": "AJMAL",
                        "task_creator_id": "AJMAL"
                    }
                ]);

                // Assuming a successful response has status code 200
                if (response.status === 200) {
                    showTaskSaveToast()
                    fetchData()
                    // Task saved successfully, handle any further actions here
                    console.log('Task saved successfully');
                    console.log(response.data)
                    // setModalVisible(false)
                } else {
                    // Handle other status codes if needed
                    console.error('Failed to save task:', response.statusText);
                    console.log(response)
                    setModalVisible(false)
                }
                setModalVisible(false)
            } catch (error) {
                // Handle network errors or other issues
                console.error('Error while saving task:', error);
                ErrorAddTask()
            }

        } else {
            console.log('field is empty')
            showEmptyTaskFields()
        }
    };

    useEffect(() => {
        if (modalVisible === false) {
            setTaskName('')
            setTaskDescription('')
            setTaskComesUnder(null)
            setTaskType(null)
            setIncludeTravel(null)
            setPriorityLevel(null)
            setCombinedDateTime('')
        }
    }, [modalVisible])


    // console.log(taskList)
    // console.log(date, 'date')
    // console.log(time, 'time')
    return (
        <SafeAreaView style={styles.container}>
            <ToastManager />

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
                    <View style={styles.THUserBanner}>
                        <View><Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>AJMAL</Text></View>
                        <TouchableOpacity style={styles.button}>
                            <Image source={require('../images/location.png')} style={{
                                width: 16,
                                height: 16,
                            }}></Image>
                            <Text style={styles.buttonText}>CHECKOUT</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                {/* AddButtton */}
                <View style={styles.AddButton}>
                    <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
                        <Image source={require('../images/addB.png')} style={{
                            width: 25,
                            height: 20,
                        }}></Image>
                        <Text style={{
                            fontSize: 16,
                            color: "black"
                        }}>Add Task</Text>
                    </TouchableOpacity>
                </View>

                {/* TaskTable */}
                <ScrollView vertical={true} style={{
                    marginTop: 8
                }}>
                    <ScrollView horizontal={true}>
                        <View style={styles.TableContainer}>
                            {/* Table Header */}
                            <View style={styles.tableRow}>
                                <Text style={styles.headerCell}>Name</Text>
                                <Text style={styles.headerCell}>Description</Text>
                                <Text style={styles.headerCell}>Scheduled on</Text>
                                <Text style={styles.headerCell}>Task owner name</Text>
                                <Text style={styles.headerCell}>Priority</Text>
                            </View>

                            {/* Table Data */}
                            {
                                taskList?.map((task, index) => (
                                    <View style={styles.tableRow} key={index}>
                                        <Text style={styles.dataCell}>{task.task_name}</Text>
                                        <Text style={styles.dataCell}>{task.task_description}</Text>
                                        <Text style={styles.dataCell}>{task.task_scheduledon}</Text>
                                        <Text style={styles.dataCell}>{task.task_owner_name}</Text>
                                        <Text style={[styles.dataCell, { backgroundColor: getPriorityColor(task.priority), color: getTextColor(task.priority) }]}>
                                            {task.priority}
                                        </Text>
                                    </View>
                                ))
                            }

                            {/* Add more rows as needed */}
                        </View>
                    </ScrollView>
                </ScrollView>

                {/* AddTaskModal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <ToastManager />
                        <View style={styles.modalContent}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'left', width: '100%', color: 'black'
                            }}>New Task</Text>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setTaskName(text)}
                                    value={taskname}
                                    placeholder='task name'
                                />
                            </View>

                            <View style={[styles.inputContainer, { marginBottom: 8 }]}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setTaskDescription(text)}
                                    value={taskDescription}
                                    placeholder='task description'
                                />
                            </View>

                            <View style={styles.taskComesUnderCont}>
                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleTaskComeUnder('Common Job')}
                                >
                                    <Text style={[styles.defaultOption, taskComesUnder === 'Common Job' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Common Job</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleTaskComeUnder('Project')}
                                >
                                    <Text style={[styles.defaultOption, taskComesUnder === 'Project' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Project</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                textAlign: 'left',
                                width: '100%'
                            }}><Text>Task Type</Text></View>

                            <View style={styles.taskComesUnderCont}>
                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleTaskType('Inhouse')}
                                >
                                    <Text style={[styles.defaultOption, taskType === 'Inhouse' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Inhouse</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleTaskType('Outdoor')}
                                >
                                    <Text style={[styles.defaultOption, taskType === 'Outdoor' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Outdoor</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.dateTimeCont}>

                                <View>
                                    <Text>
                                        Select Task Start Date and Time
                                    </Text>
                                </View>

                                {/* <View style={{ width: '85%' }}>
                                    <Button title="Select Date" onPress={showDatepicker} />
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={chosenDate}
                                            mode="datetime"
                                            is24Hour={true}
                                            display="default"
                                            onChange={onDateChange}
                                        />
                                    )}
                                </View> */}

                                <View style={{ width: '98%', justifyContent: 'space-between', flexDirection: "row" }}>
                                    <Button title="Date Picker" onPress={showDatePicker} />
                                    <Button title="Time Picker" onPress={showTimePicker} />
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleDateConfirm}
                                        onCancel={hideDatePicker}
                                    />
                                    <DateTimePickerModal
                                        isVisible={isTimePickerVisible}
                                        mode="time"
                                        onConfirm={handleTimeConfirm}
                                        onCancel={hideTimePicker}
                                    />
                                </View>

                            </View>

                            {
                                combinedDateTime !== '' &&
                                <View style={{
                                    backgroundColor: 'green',
                                    padding: 8,
                                    borderRadius: 4
                                }}>
                                    <Text style={{ color: 'white' }}>{combinedDateTime ? combinedDateTime.toLocaleString() : ''}</Text>
                                </View>
                            }



                            <View style={{
                                textAlign: 'left',
                                width: '100%'
                            }}><Text>Include Travel</Text></View>

                            <View style={styles.taskComesUnderCont}>
                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleIncludeTravel('Y')}
                                >
                                    <Text style={[styles.defaultOption, includeTravel === 'Y' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Yes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleIncludeTravel('N')}
                                >
                                    <Text style={[styles.defaultOption, includeTravel === 'N' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>No</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{
                                textAlign: 'left',
                                width: '100%'
                            }}><Text>Priority level</Text></View>

                            <View style={styles.taskComesUnderCont}>
                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handlePriorityLevel('Low')}
                                >
                                    <Text style={[styles.defaultOption, priorityLevel === 'Low' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Low</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handlePriorityLevel('Moderate')}
                                >
                                    <Text style={[styles.defaultOption, priorityLevel === 'Moderate' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Moderate</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handlePriorityLevel('High')}
                                >
                                    <Text style={[styles.defaultOption, priorityLevel === 'High' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>High</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                justifyContent: 'flex-end',
                                flexDirection: "row",
                                width: '100%',
                                borderTopColor: 'black',
                                borderTopWidth: 1
                                // backgroundColor: 'black'
                            }}>

                                <View style={{
                                    margin: 4,
                                    backgroundColor: 'red',
                                    color: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 4,
                                    paddingHorizontal: 4
                                }}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                                        margin: 4,
                                        backgroundColor: 'red',
                                        color: 'white'
                                    }}>
                                        <Text style={styles.closeModalButton}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    margin: 4,
                                    backgroundColor: 'green',
                                    color: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 4,
                                    paddingHorizontal: 4
                                }}>
                                    <TouchableOpacity onPress={() => saveTask()} style={{
                                        margin: 4,
                                        color: 'white'
                                    }}>
                                        <Text style={styles.closeModalButton}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
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
    AddButton: {
        alignItems: "flex-end",
        width: "100%",
        paddingRight: 14,
        paddingTop: 14,
        color: "black"
    },
    buttonAdd: {
        width: '45%',
        backgroundColor: '#FFC107',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "center",
        color: 'black'
    },
    TableContainer: {
        width: "100%",
        padding: 10,
        marginTop: 8
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 5,
        // paddingVertical: 5,
    },
    headerCell: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        flexWrap: 'nowrap',
        width: 120
    },
    dataCell: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        padding: 10,
        textAlign: 'center',
        width: 120,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'white',
        color: "black"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#F7F7F7',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%'
    },
    closeModalButton: {
        marginTop: 10,
        fontSize: 18,
        color: 'white',
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
    taskComesUnderCont: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 8
    },
    defaultOption: {
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 50
    },
    selectedOption: {
        width: 20,
        height: 20,
        backgroundColor: 'gold',
        borderRadius: 50
    },
    dateTimeCont: {
        justifyContent: "center",
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 12
    }
})

export default EmployeeTaskHome