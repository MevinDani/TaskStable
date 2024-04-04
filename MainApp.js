import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import Login from './components/Login';
import EmployeeTaskHome from './components/EmployeeTaskHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskDetails from './components/TaskDetails';
import CompletedTask from './components/CompletedTask';
import CompletedTaskDetails from './components/CompletedTaskDetails';
// import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createNativeStackNavigator();

// const Drawer = createDrawerNavigator()

const MainApp = () => {

    const [userDataExists, setUserDataExists] = useState(false);

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
        <NavigationContainer>
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