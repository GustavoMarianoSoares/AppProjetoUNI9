import { View, Alert } from 'react-native'
import React, { useState } from 'react'

import { InputTexts } from "../../components/InputTexts"
import { ButtonAction } from "../../components/ButtonAction"

import auth from '@react-native-firebase/auth'

export function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('')

    function forgotPasswordValidation(error) {
        if (error === 'auth/invalid-email') {
            Alert.alert('EMAIL MAL INFORMADO', 'Email mal informado, verifique se o e-mail está correto e com todos os caracteres como: @, .com e etc...')
        }

        if (error === 'auth/user-not-found') {
            Alert.alert('E-MAIL', 'E-mail não encontrado, verifique se está correto e tente novamente.')
        }
    }

    function handleForgotPassword() {
        if (email == "") {
            Alert.alert('PREENCHA TODOS OS CAMPOS', 'Para se registrar no sistema informe todos os campos acima.')
        } else {
            auth().sendPasswordResetEmail(email)
                .then(() => {
                    Alert.alert("REDEFINIR SENHA", "Enviamos um e-mail para você, para redefinir sua senha.")
                    navigation.goBack()
                })
                .catch(error => {
                    forgotPasswordValidation(error.code)
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