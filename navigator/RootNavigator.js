import React from 'react'
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ResetPassword from '../screens/ResetPassword';
import ToDo from '../screens/ToDo';
import Services from '../screens/Services';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import ManageAccount from '../screens/ManageAccount';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="ToDo"
                    component={ToDo}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="Services"
                    component={Services}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name="Manage Account"
                    component={ManageAccount}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator