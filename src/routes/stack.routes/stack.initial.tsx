import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import { Login } from "../../views/Login";
import { Register } from "../../views/Register";
import { ForgotPassword } from "../../views/ForgotPassword";
import { We } from "../../views/We";

export function StackInitial() {
  return (
    <Navigator>
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="Register"
        component={Register}
        options={{ title: "REGISTRE-SE" }}
      />

      <Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: "ESQUECI A SENHA" }}
      />

      <Screen
        name="We"
        component={We}
        options={{ title: "QUEM SOMOS" }}
      />
    </Navigator>
  );
}
