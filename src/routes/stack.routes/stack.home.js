import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import { Home } from "../../views/Home"
import { EditOrder } from "../../views/EditOrder"

export function StackHome() {
    return (
        <Navigator>
            <Screen
                name="Home"
                component={Home}
            />

            <Screen
                name="EditOrder"
                component={EditOrder}
            />
        </Navigator>
    )
}