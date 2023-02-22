import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BusinessPage from '../screens/BusinessPage';
import JobBoard from '../screens/JobBoard';

export type TabParamList = {
    BusinessPage: undefined;
    JobBoard: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {



    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#59C1CC',
            tabBarInactiveTintColor: 'gray',
        })} >
            <Tab.Screen name="BusinessPage" component={BusinessPage} />
            <Tab.Screen name="JobBoard" component={JobBoard} />
        </Tab.Navigator>
    )
}

export default TabNavigator