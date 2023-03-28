import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import { Home } from "../views/Home"
import { Login } from "../views/Login"
import { Register } from "../views/Register"

export function StackRoutes() {
    return (
        <Navigator>
            <Screen
                name="Login"
                component={Login}
            />
            <Screen
                name="Home"
                component={Home}
            />

            <Screen
                name="Register"
                component={Register}
            />
        </Navigator>
    )
}