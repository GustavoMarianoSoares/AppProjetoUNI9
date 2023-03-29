import { View, Button, Alert } from 'react-native'
import React, { useState } from 'react'

import { InputTexts } from "../../components/InputTexts"

import auth from '@react-native-firebase/auth'

export function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('')

    function handleForgotPassword() {
        auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Redefinir senha", "Enviamos um e-mail para você redefinir sua senha")
                navigation.goBack()
            })
            .catch((error) => console.log(error))
    }
    return (
        <View>
            <InputTexts
                placeholder='E-mail'
                onChangeText={setEmail}
                keyboardType='email-address'
            />

            <Button
                title='Esqueci a senha'
                onPress={handleForgotPassword}
            />
        </View>
    )
}