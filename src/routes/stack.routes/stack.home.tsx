import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import { Home } from "../../views/Home"
import { EditOrder } from "../../views/EditOrder"
import { CreateOrder } from "../../views/CreateOrder"

export function StackHome() {
    return (
        <Navigator>
            <Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />

            <Screen
                name="EditOrder"
                component={EditOrder}
                options={{
                    headerShown: false,
                }}
            />

            <Screen
                name="CreateOrder"
                component={CreateOrder}
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}