import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useRef, useState } from 'react'
import Login from './components/Login';
import EmployeeTaskHome from './components/EmployeeTaskHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskDetails from './components/TaskDetails';
import CompletedTask from './components/CompletedTask';
import CompletedTaskDetails from './components/CompletedTaskDetails';
import messaging from '@react-native-firebase/messaging';

// import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createNativeStackNavigator();

// const Drawer = createDrawerNavigator()

const MainApp = () => {

    const [userDataExists, setUserDataExists] = useState(false);
    const [fcmToken, setFcmToken] = useState(null);
    

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    useEffect(() => {
        // Function to retrieve FCM token
        const retrieveFcmToken = async () => {
            try {
                const token = await messaging().getToken();
                setFcmToken(token);
            } catch (error) {
                console.error('Error retrieving FCM token:', error);
            }
        };

        // Call the function to retrieve FCM token
        retrieveFcmToken();

        // Add listener to refresh FCM token if it changes
        const unsubscribe = messaging().onTokenRefresh(retrieveFcmToken);

        // Clean up subscription when component unmounts
        return unsubscribe;
    }, []);


    // const getToken = async () => {
    //     const token = await messaging.getToken()
    //     console.log('token', token)
    // }

    useEffect(() => {
        requestUserPermission()
        // getToken()
    }, [])

    console.log('fcmToken', fcmToken)

    // Define a navigation reference using useRef
    const navigationRef = useRef(null);

    // Function to handle navigation to TaskDetails
    const navigateToTaskDetails = (data) => {
        navigationRef.current?.navigate('TaskDetails', {
            task_id: data.task_id,
            created_on: data.created_on,
            task_scheduledon: data.task_scheduledon,
            openChat: true
        });
    };

    // Function to handle navigation to TaskDetails
    const navigateToNewTaskDetails = (data) => {
        navigationRef.current?.navigate('EmployeeHome')
        // navigationRef.current?.navigate('TaskDetails', {
        //     task_id: data.task_id,
        //     created_on: data.created_on,
        //     task_scheduledon: data.task_scheduledon,
        //     openChat: false
        // });
    };

    // Configure messaging event handler
    messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log('Handle notification click event', remoteMessage);
        // Check if the notification contains data

        if (remoteMessage.notification.title === 'New Message') {
            // Extract the task details from the notification data
            const taskData = {
                task_id: remoteMessage.data.task_id,
                created_on: remoteMessage.data.created_on,
                task_scheduledon: remoteMessage.data.task_scheduledon
            };

            // Navigate to TaskDetails screen with the task details
            navigateToTaskDetails(taskData);
        }

        if (remoteMessage.notification.title === 'New Task') {
            // Extract the task details from the notification data
            const taskData = {
                task_id: remoteMessage.data.task_id,
                created_on: remoteMessage.data.created_on,
                task_scheduledon: remoteMessage.data.task_scheduledon
            };

            // Navigate to TaskDetails screen with the task details
            navigateToNewTaskDetails(taskData)
        }

    });

    // Function to handle FCM messages when the app is in the background or terminated
    const handleBackgroundMessage = async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
        // Check if the notification contains data
        if (remoteMessage.notification.title === 'New Message') {
            // Extract the task details from the notification data
            const taskData = {
                task_id: remoteMessage.data.task_id,
                created_on: remoteMessage.data.created_on,
                task_scheduledon: remoteMessage.data.task_scheduledon
            };

            // Navigate to TaskDetails screen with the task details
            navigateToTaskDetails(taskData);
        }

        if (remoteMessage.notification.title === 'New Task') {
            // Extract the task details from the notification data
            const taskData = {
                task_id: remoteMessage.data.task_id,
                created_on: remoteMessage.data.created_on,
                task_scheduledon: remoteMessage.data.task_scheduledon
            };

            // Navigate to TaskDetails screen with the task details
            navigateToNewTaskDetails(taskData)
        }
    };


    // // Handle notification click event
    // messaging().onNotificationOpenedApp((remoteMessage) => {
    //     console.log('Handle notification click event', remoteMessage);
    //     // Navigate to TaskDetails when notification is clicked
    //     navigationRef.current?.navigate('CompletedTask');
    // });

    // // Function to handle FCM messages when the app is in the background or terminated
    // const handleBackgroundMessage = async (remoteMessage) => {
    //     console.log('Message handled in the background!', remoteMessage);
    //     // You can perform any necessary processing here, such as navigating to a specific screen
    //     // Example: navigate to CompletedTaskPage
    //     navigationRef.current?.navigate('CompletedTask');
    // };

    // messaging().onMessage(handleBackgroundMessage);


    // Set up background message handler
    messaging().setBackgroundMessageHandler(handleBackgroundMessage);

    // kill state
    messaging().getInitialNotification(handleBackgroundMessage)


    useEffect(() => {
        const checkUserData = async () => {
            try {
                const userDataJson = await AsyncStorage.getItem('userData');
                const userData = JSON.parse(userDataJson);
                setUserDataExists(userData !== null);
            } catch (error) {
                console.error('Error checking user data:', error);
            }
        };
        checkUserData();
    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                {/* {!userDataExists ? (
                    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                ) : null} */}
                <Stack.Screen name='LoginPage' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='EmployeeHome' component={EmployeeTaskHome} options={{ headerShown: false }} />
                <Stack.Screen name='TaskDetails' component={TaskDetails} options={{ headerShown: false }} />
                <Stack.Screen name='CompletedTask' component={CompletedTask} options={{ headerShown: false }} />
                <Stack.Screen name='CompletedTaskDetails' component={CompletedTaskDetails} options={{ headerShown: false }} />
                {/* <Stack.Screen
                    name="SidePanel"
                    component={SidePanel}
                    options={{
                        headerShown: false,
                        gestureEnabled: true, // Enable gestures for this screen
                        gestureDirection: 'horizontal', // Set the gesture direction to horizontal
                    }}
                /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// const SidePanel = () => {
//     return (
//         <Drawer.Navigator
//             drawerPosition="right" // Set the drawer position to right
//             drawerType="slide" // Set the drawer type to slide
//         >
//             <Drawer.Screen name='DrawerScreen1' component={DrawerScreen1} />
//             <Drawer.Screen name='DrawerScreen2' component={DrawerScreen2} />
//             {/* Add more screens as needed */}
//         </Drawer.Navigator>
//     )
// }

export default MainApp