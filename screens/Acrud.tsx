import { useState, useEffect } from 'react'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase'
import { Text, View, TextInput, Button, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import A from '../styles/A'


const Acrud = () => {

    const [first, setFirst] = useState('')
    const [profile, setProfile] = useState([])

    const addData = async (data) => {
        const docRef = await addDoc(collection(db, "Profile"), {
            FirstName: first,
            userId: auth.currentUser.uid
        });

    }
    useEffect(() => {
        let loadData = async () => {
            const q = query(collection(db, "Profile"), where("userId", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            let profile = []
            querySnapshot.forEach((doc) => {
                profile.push(doc.data())
            });

            console.log(profile)
            setProfile(profile)
        }
    }, [])

    // pulls all of the "profile" data from firebase into an object to be deconstructed/mapped
    const EditProfile = () => {
        // Business Bio Start
        const [profile, setProfile] = useState([])
        const bioDataRef = collection(db, "Profile")

        useEffect(() => {
            const getProfile = async () => {
                const data = await getDocs(bioDataRef)
                setProfile(data.docs.map((doc) => ({ ...doc.data(), id: doc })))
            }
            getProfile()
        }, [])
        // Business Bio end


        return (
            <KeyboardAvoidingView>
                <SafeAreaView>
                    <View>
                        <Text style={[A.lightText, A.header]}>Screen to Edit on</Text>
                        <TextInput style={[A.textInput, A.lightTextInput]}
                            placeholder='Email'
                            placeholderTextColor='#ECECEC'
                            value={first}
                            onChangeText={setFirst}
                        />
                        <Button title="Send Data" onPress={addData} />
                    </View>
                    <View>
                        {profile.map((data) => {
                            return (
                                <View>
                                    <View>
                                        <Text>

                                        </Text>
                                        <input placeholder="Update your business bio here" />
                                        {/* biography of user/business */}
                                        Bio: {data.Bio}
                                    </View>
                                    <Text>
                                        Business Name: {data.BusinessName}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

export default Acrud