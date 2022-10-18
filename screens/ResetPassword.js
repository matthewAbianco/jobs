import { Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform } from 'react-native';
import A from '../styles/A';
import InlineTextButton from '../components/InlineTextButton';
import React from 'react';
// import { auth } from "../firebase";
// import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPassword({ navigation }) {
    const background = require("../assets/background.jpg");

    let [email, setEmail] = React.useState("");
    let [errorMessage, setErrorMessage] = React.useState("");

    let resetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigation.popToTop();
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }

    return (
        <ImageBackground style={A.imageContainer} source={background}>
            <KeyboardAvoidingView
                style={A.backgroundCover}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={60}>
                <Text style={[A.lightText, A.header]}>Reset Password</Text>
                <Text style={A.errorText}>{errorMessage}</Text>
                <TextInput
                    style={[A.textInput, A.lightTextInput, A.lightText]}
                    placeholder='Email'
                    placeholderTextColor="#BEBEBE"
                    value={email}
                    onChangeText={setEmail} />
                <View style={[A.rowContainer, A.topMargin]}>
                    <Text style={A.lightText}>Log in? </Text>
                    <InlineTextButton text="Login" onPress={() => navigation.navigate("Login")} />
                </View>
                <View style={[A.rowContainer, A.topMargin]}>
                    <Text style={A.lightText}>Don't have an account? </Text>
                    <InlineTextButton text="Sign Up" onPress={() => navigation.navigate("SignUp")} />
                </View>


            </KeyboardAvoidingView>
        </ImageBackground>
    );
}


