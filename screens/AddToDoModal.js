import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import A from '../styles/A'

const AddToDoModal = (props) => {

    let [todo, setTodo] = useState("")

    return (
        <View style={A.container}>
            <Text style={A.header}>Add ToDo</Text>
            <TextInput
                style={[A.textInput, A.darkTextInput]}
                placeholder='ToDo'
                value={todo}
                onChangeText={setTodo} />
            <View style={[A.rowContainer, A.rightAligned, A.rightMargin]}>
                <Button title="Cancel" onPress={props.onClose} />
                <Button title="OK" onPress={() => {
                    props.addToDo(todo);
                    setTodo("");
                    props.onClose();
                }} />
            </View>
        </View>
    );
}

export default AddToDoModal
