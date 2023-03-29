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
                options={{
                    headerShown: false
                }}
            />

            <Screen
                name="EditOrder"
                component={EditOrder}
                options={{ title: 'EDITAR PEDIDO' }}
            />
        </Navigator>
    )
}