import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import { Login } from "../../views/Login"
import { Register } from "../../views/Register"

export function StackInitial() {
    return (
        <Navigator>
            <Screen
                name="Login"
                component={Login}
            />

            <Screen
                name="Register"
                component={Register}
            />
        </Navigator>
    )
}