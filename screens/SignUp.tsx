import { Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform } from 'react-native';
import InlineTextButton from '../components/InlineTextButton';
import React, { useState } from 'react';
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import A from '../styles/A';
import { collection, addDoc } from 'firebase/firestore';

export default function SignUp({ navigation }) {
    const background = require("../assets/background.jpg");


    //username and password signup start
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [validationMessage, setValidationMessage] = useState("");

    // confirm passwords match for sign up
    let validateAndSet = (value, valueToCompare, setValue) => {
        if (value !== valueToCompare) {
            setValidationMessage("Passwords do not match.");
        } else {
            setValidationMessage("");
        }

        setValue(value);
    };

    // if passwords match, sends new signup data to firestore
    let signUp = () => {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    sendEmailVerification(auth.currentUser)
                    navigation.navigate("BusinessPage", { user: userCredential.user });
                })
                .catch((error) => {
                    setValidationMessage(error.message);
                });
        }
    }
    // username and password signup end

    // personal name

    let addPersonalData = async (name) => {
        const docRef = await addDoc(collection(db, "users"), {
            name: name
        });
    }


    // business name 

    const [businessName, setBusinessName] = useState('')


    return (
        <ImageBackground style={A.imageContainer} source={background}>
            <KeyboardAvoidingView
                style={A.backgroundCover}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={60}>
                <Text style={[A.lightText, A.header]}>Sign Up</Text>
                <Text style={[A.errorText]}>{validationMessage}</Text>

                {/* add email */}
                <TextInput
                    style={[A.textInput, A.lightTextInput, A.lightText]}
                    placeholder='Email'
                    placeholderTextColor="#BEBEBE"
                    value={email}
                    onChangeText={setEmail} />

                {/* set password */}
                <TextInput
                    style={[A.textInput, A.lightTextInput, A.lightText]}
                    placeholder='Password'
                    placeholderTextColor="#BEBEBE"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} />

                {/* confirm password */}
                <TextInput
                    style={[A.textInput, A.lightTextInput, A.lightText]}
                    placeholder='Confirm Password'
                    placeholderTextColor="#BEBEBE"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />

                {/* personal name */}
                {/* <TextInput
                    style={[A.textInput, A.lightTextInput, A.lightText]}
                    placeholder='Your name here'
                    placeholderTextColor="#BEBEBE"
                    value={personalName}
                    onChangeText={setPersonalName} /> */}


                {/* business name */}
                <TextInput
                    style={[A.textInput, A.lightTextInput, A.lightText]}
                    placeholder='Your business name here'
                    placeholderTextColor="#BEBEBE"
                    value={businessName}
                    onChangeText={setBusinessName} />

                {/* business Logo */}

                <TextInput
                    style={[A.textInput, A.lightTextInput, A.lightText]}
                    placeholder='Your business name here'
                    placeholderTextColor="#BEBEBE"
                    value={businessName}
                    onChangeText={setBusinessName} />

                <View style={[A.rowContainer, A.topMargin]}>
                    <Text style={A.lightText}>Already have an account? </Text>
                    <InlineTextButton text="Login" onPress={() => navigation.popToTop()} />
                </View>
                <Button title="Sign Up" onPress={signUp} color="#f7b267" />
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}
