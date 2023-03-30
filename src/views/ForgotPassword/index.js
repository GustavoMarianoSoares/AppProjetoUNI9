import { View, Alert } from 'react-native'
import React, { useState } from 'react'

import { InputTexts } from "../../components/InputTexts"
import { ButtonAction } from "../../components/ButtonAction"

import auth from '@react-native-firebase/auth'

export function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('')

    function forgotPasswordValidation(error) {
        if (error === 'auth/invalid-email') {
            Alert.alert('Email invalido', 'Email invalido')
        }

        if (error === 'auth/user-not-found') {
            Alert.alert('E-mail', 'Email errado')
        }
    }

    function handleForgotPassword() {
        if (email == "") {
            Alert.alert('Preencha email', 'Preencha o email ai')
        } else {
            auth().sendPasswordResetEmail(email)
                .then(() => {
                    Alert.alert("Redefinir senha", "Enviamos um e-mail para você redefinir sua senha")
                    navigation.goBack()
                })
                .catch(error => {
                    forgotPasswordValidation(error.code)
                    console.log(error);
                })
        }
    }

    return (
        <View>
            <InputTexts
                placeholder='E-mail'
                onChangeText={setEmail}
                keyboardType='email-address'
            />

            <ButtonAction
                title='ENVIAR E-MAIL'
                onPress={handleForgotPassword}
            />
        </View>
    )
}