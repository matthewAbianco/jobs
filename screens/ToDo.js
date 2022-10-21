import { View, Text, Button, Modal } from 'react-native'
import InlineTextButton from '../components/InlineTextButton'
import A from '../styles/A'
import { auth, db } from '../firebase'
import { signOut, sendEmailVerification } from 'firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import AddToDoModal from './AddToDoModal'
import { collection, addDoc } from "firebase/firestore";


const ToDo = ({ navigation, route }) => {
    let [modalVisible, setModalVisible] = useState(false)

    let logout = () => {
        signOut(auth).then(() => {
            navigation.navigate("Login");
        })
    }

    let showContent = () => {
        return (
            <View style={A.container}>
                <Button title="Add To Do" onPress={() => setModalVisible(true)} color='#db4608' />
            </View>
        )
    }

    let showSendVerificationEmail = () => {
        return (
            <View>
                <Text>PLease Verify your email to use ToDo</Text>
                <Button title="Send Verification Email" onPress={() => sendEmailVerification(auth.currentUser)} />
            </View>

        )
    }

    const addToDo = async (todo) => {
        const docRef = await addDoc(collection(db, "todo"), {
            text: todo,
            completed: false
        });

    }



    return (
        <SafeAreaView style={A.container} >
            <View style={[A.rowContainer, A.rightAligned, A.rightMargin]} >
                <InlineTextButton text='Manage Account' color='#db4608' />
            </View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <AddToDoModal
                    onClose={() => setModalVisible(false)}
                    addToDo={addToDo}
                />
            </Modal>
            <Text style={A.header} >To Do</Text>
            {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
            <Button title="logout" onPress={logout} color='#db4608' />
        </SafeAreaView>
    )
}

export default ToDo