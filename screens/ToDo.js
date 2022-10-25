import { View, Text, Button, Modal, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'
import InlineTextButton from '../components/InlineTextButton'
import A from '../styles/A'
import { auth, db } from '../firebase'
import { signOut, sendEmailVerification } from 'firebase/auth'
import React, { useState } from 'react'
import AddToDoModal from './AddToDoModal'
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import BouncyCheckbox from 'react-native-bouncy-checkbox'


const ToDo = ({ navigation }) => {
    let [modalVisible, setModalVisible] = useState(false)
    let [isLoading, setIsLoading] = useState(true)
    let [isRefreshing, setIsRefreshing] = useState(false);
    let [toDos, setToDos] = useState([])

    let loadToDoList = async () => {
        const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

        const querySnapshot = await getDocs(q);
        let toDos = [];
        querySnapshot.forEach((doc) => {
            let toDo = doc.data();
            toDo.id = doc.id;
            toDos.push(toDo);
        });

        setToDos(toDos);
        setIsLoading(false);
        setIsRefreshing(false);
    };

    if (isLoading) {
        loadToDoList()
    }

    let logout = () => {
        signOut(auth).then(() => {
            navigation.navigate("Login");
        })
    }

    let checkToDoItem = (item, isChecked) => {

    }

    let renderToDoItem = ({ item }) => {
        return (
            <View style={[AppStyles.rowContainer, AppStyles.rightMargin, AppStyles.leftMargin]}>
                <View style={AppStyles.fillSpace}>
                    <BouncyCheckbox
                        isChecked={item.complated}
                        size={25}
                        fillColor="#258ea6"
                        unfillColor="#FFFFFF"
                        text={item.text}
                        iconStyle={{ borderColor: "#258ea6" }}
                        onPress={(isChecked) => { checkToDoItem(item, isChecked) }}
                    />
                </View>
                <InlineTextButton text="Delete" color="#258ea6" onPress={() => deleteToDo(item.id)} />
            </View>
        );
    }

    let showToDoList = () => {
        return (
            <FlatList
                data={toDos}
                refreshing={isRefreshing}
                onRefresh={() => {
                    loadToDoList();
                    setIsRefreshing(true);
                }}
                renderItem={renderToDoItem}
                keyExtractor={item => item.id} />
        )
    };

    let showContent = () => {
        return (
            <View style={A.container}>
                {isLoading ? <ActivityIndicator size='large' /> : showToDoList()}
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
        const docRef = await addDoc(collection(db, "todos"), {
            text: todo,
            completed: false,
            // adds current users ID to the document being made
            userId: auth.currentUser.uid
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