import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import Login from './components/Login';
import EmployeeTaskHome from './components/EmployeeTaskHome';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

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
                {!userDataExists ? (
                    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                ) : null}
                <Stack.Screen name='EmployeeHome' component={EmployeeTaskHome} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainApp