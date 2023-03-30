import { View, Alert } from 'react-native'
import React, { useState } from 'react'

import { InputTexts } from "../../components/InputTexts"
import { ButtonAction } from "../../components/ButtonAction"

import auth from '@react-native-firebase/auth'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function registerValidation(error) {
    if (error === 'auth/invalid-email') {
      Alert.alert('EMAIL MAL INFORMADO', 'Email mal informado, verifique se o e-mail está correto e com todos os caracteres como: @, .com e etc...')
    }

    if (error === 'auth/weak-password') {
      Alert.alert('SENHA FRACA', 'Crie uma senha com pelo menos 6 caracteres para se cadastrar.')
    }
  }

  function handleNewAccount() {
    if (email == "" || password == "") {
      Alert.alert('PREENCHA TODOS OS CAMPOS', 'Para se registrar no sistema informe todos os campos acima.')
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => Alert.alert('CADASTRADO', 'Usuário cadastrado no sistema com sucesso.'))
        .catch(error => {
          registerValidation(error.code)
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

      <InputTexts
        placeholder='Senha'
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <ButtonAction
        title='CADASTRAR'
        onPress={handleNewAccount}
      />
    </View>
  )
}