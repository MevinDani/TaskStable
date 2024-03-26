import React, { useEffect, useState } from 'react'
import {
    Button,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native';

const Form = () => {

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? '#fff' : 'white',
    };

    const [apiData, setApiData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const userApiRes = await fetch('https://dummyjson.com/users')
            const userData = await userApiRes.json()

            if (userData) {
                setApiData(userData.users.map(
                    (userItem) =>
                        `${userItem.firstName} ${userItem.lastName}`
                ))
            }
        }

        getData()
    }, [])

    return (
        <SafeAreaView style={backgroundStyle}>

            <View style={styles.FormWrapper}>

                <View style={styles.searchUserTitle}>
                    <Text style={styles.searchUserText}>Search Users</Text>
                </View>
                <View>
                    <TextInput placeholder='username' />
                </View>
                {/* <View>
                    <TextInput style={styles.PlaceHolder} placeholder='email' />
                </View>
                <View>
                    <TextInput style={styles.PlaceHolder} placeholder='password' />
                </View> */}

                <Button title='Search' />
            </View>

            <ScrollView>
                <View>
                    <FlatList
                        data={apiData}
                        renderItem={(itemData) =>
                            <Text style={styles.UsernameList}>{itemData.item}</Text>
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    whiteBg: {
        backgroundColor: "white"
    },
    searchUserTitle: {
        backgroundColor: '#b2ff9e',
        padding: 12
    },
    searchUserText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    FormWrapper: {
        // backgroundColor: 'black',
        justifyContent: "center",
        marginTop: 30,
        marginHorizontal: 12,
        paddingHorizontal: 8,
        paddingVertical: 8
    },
    ButtonWrapper: {
        marginTop: 20,
        backgroundColor: 'blue', // Button background color
        borderRadius: 5, // Optional: Add border radius for button
        paddingHorizontal: 20, // Optional: Add horizontal padding
        paddingVertical: 10, // Optional: Add vertical padding
    },
    UsernameList: {
        padding: 24,
        backgroundColor: '#c7f9cc',
        color: 'black',
        borderBottomWidth: 1,

    },
    PlaceHolder: {
        color: 'white'
    }
})

export default Form