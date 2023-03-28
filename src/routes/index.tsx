import { NavigationContainer } from "@react-navigation/native";

import { Home } from "../views/Home"

import { StackRoutes } from "./stack.routes";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { useState, useEffect } from "react";

export function Routes(){
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(setUser)

        return subscriber
    })

    return(
        
        <NavigationContainer>
            {user ? <Home/> : <StackRoutes />}
        </NavigationContainer>
    )
}