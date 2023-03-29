import React, { useState, useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native";

import { StackHome } from "./stack.routes/stack.home"

import { StackInitial } from "./stack.routes/stack.initial";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"

export function Routes() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(setUser)

        return subscriber
    })

    return (

        <NavigationContainer>
            {user ? <StackHome /> : <StackInitial />}
        </NavigationContainer>
    )
}