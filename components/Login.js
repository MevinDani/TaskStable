import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import footerBg from '../images/footer_bg.png'
import cloud from '../images/cloud_svg.png'
import cbxLogo from '../images/cbxLogo.png'
import axios from 'axios';

const Login = () => {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Here you can implement your login logic
        console.log('UserId:', userId);
        console.log('Password:', password);

        try {
            const response = await axios.get(`https://cubixweberp.com:156/api/EmpLogin/EmpLogin`, {
                params: {
                    cmpcode: 'CPAYS',
                    guid: '425cc3d5-8e70-4502-a3a2-dc85e4bfbd83',
                    empid: userId,
                    pass: password
                }
            });
            console.log('API response:', response.data);
            // Handle API response here (e.g., redirect to dashboard on successful login)
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., display error message to the user)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#98b2e5', 'rgba(10, 184, 149, 0.057)']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={styles.container}
            >
                <View style={styles.LoginWrapper}>

                    {/* cloudImg */}
                    <View>
                        <Image source={cloud}></Image>
                    </View>

                    <View style={{
                        justifyContent: 'flex-start',
                        width: "100%"
                    }}>
                        <View
                            style={{
                                width: "44%",
                                backgroundColor: "white",
                                marginLeft: 28,
                                padding: 8,
                                borderRadius: 4,
                            }}
                        >
                            <Image source={cbxLogo} style={styles.cbxLogo}></Image>
                        </View>
                    </View>

                    {/* login form */}
                    <View style={styles.Logincontainer}>
                        <Text style={styles.label}>UserId</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => setUserId(text)}
                                value={userId}
                            />
                        </View>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={text => setPassword(text)}
                                value={password}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    {/* bottomImg */}
                    <View>
                        <Image source={footerBg}></Image>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    LoginWrapper: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: "#F1F1FB",
    },
    Logincontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        backgroundColor: "#F7F7F7",
        paddingVertical: 32,
        borderRadius: 8
    },
    inputContainer: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        paddingLeft: 10,
    },
    // input: {
    //     width: '80%',
    //     height: 40,
    //     border: "none",
    //     borderWidth: 1,
    //     borderRadius: 5,
    //     marginBottom: 20,
    //     paddingLeft: 10,
    // },
    button: {
        width: '80%',
        backgroundColor: '#0D6EFD',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    label: {
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerImg: {
        width: 100,
        height: 250
    },
    cbxLogo: {
        width: 150,
        height: 25
    }
})

export default Login