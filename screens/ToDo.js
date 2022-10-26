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
        loadToDoList();
    }

    let checkToDoItem = (item, isChecked) => {
        const toDoRef = doc(db, 'todos', item.id);
        setDoc(toDoRef, { completed: isChecked }, { merge: true });
    };

    let deleteToDo = async (toDoId) => {
        await deleteDoc(doc(db, "todos", toDoId));
        let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
        setToDos(updatedToDos);
    };

    let logout = () => {
        signOut(auth).then(() => {
            navigation.navigate("Login");
        })
    }

    let renderToDoItem = ({ item }) => {
        return (
            <View style={[A.rowContainer, A.rightMargin, A.leftMargin]}>
                <View style={A.fillSpace}>
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
            <View>
                {isLoading ? <ActivityIndicator size="large" /> : showToDoList()}
                <Button
                    title="Add ToDo"
                    onPress={() => setModalVisible(true)}
                    color="#fb4d3d" />
            </View>
        );
    };

    let showSendVerificationEmail = () => {
        return (
            <View>
                <Text>Please verify your email to use ToDo</Text>
                <Button title="Send Verification Email" onPress={() => sendEmailVerification(auth.currentUser)} />
            </View>
        );
    };

    let addToDo = async (todo) => {
        let toDoToSave = {
            text: todo,
            completed: false,
            userId: auth.currentUser.uid
        };
        const docRef = await addDoc(collection(db, "todos"), toDoToSave);

        toDoToSave.id = docRef.id;

        let updatedToDos = [...toDos];
        updatedToDos.push(toDoToSave);

        setToDos(updatedToDos);
    };

    return (
        <SafeAreaView>
            <View style={[A.rowContainer, A.rightAligned, A.rightMargin, A.topMargin]}>
                <InlineTextButton text="Manage Account" color="#258ea6" onPress={() => navigation.navigate("ManageAccount")} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <AddToDoModal
                    onClose={() => setModalVisible(false)}
                    addToDo={addToDo} />
            </Modal>
            <Text style={A.header}>ToDo</Text>
            {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
        </SafeAreaView>
    )
}

export default ToDo