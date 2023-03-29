import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import { Login } from "../../views/Login"
import { Register } from "../../views/Register"
import { ForgotPassword } from "../../views/ForgotPassword"

export function StackInitial() {
    return (
        <Navigator>
            <Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />

            <Screen
                name="Register"
                component={Register}
            />

            <Screen
                name="ForgotPassword"
                component={ForgotPassword}
            />
        </Navigator>
    )
}