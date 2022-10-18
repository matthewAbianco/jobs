import { React, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, KeyboardAvoidingView, Text, TextInput, View, Button } from 'react-native';
import InlineTextButton from '../components/InlineTextButton';
import A from '../styles/A'

export default function Login({ navigation }) {
    const background = require('../assets/background.jpg')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <ImageBackground style={A.container} source={background}>
            <KeyboardAvoidingView style={A.backgroundCover}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={80}
            >
                <Text style={[A.lightText, A.header]}>Login</Text>
                <TextInput style={[A.textInput, A.lightText, A.lightTextInput]}
                    placeholder='Email'
                    placeholderTextColor='#ECECEC'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput style={[A.textInput, A.lightText, A.lightTextInput]}
                    placeholder='Password'
                    placeholderTextColor='#ECECEC'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <View style={[A.rowContainer, A.topMargin]}>
                    <Text style={A.lightText}>Don't have an account? </Text>
                    <InlineTextButton text="Sign Up" onPress={() => navigation.navigate("SignUp")} />
                </View>
                <View style={[A.rowContainer, A.bottomMargin]}>
                    <Text style={A.lightText}>Forgotten your password? </Text>
                    <InlineTextButton text="Reset" onPress={() => navigation.navigate("ResetPassword")} />
                </View>
                <Button title="Login" onPress={Login} color="#f7b267" />
            </KeyboardAvoidingView>
            <StatusBar style="auto" />
        </ImageBackground>
    );
}