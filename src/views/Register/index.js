import { View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'

import { InputTexts } from "../../components/InputTexts"

import auth from '@react-native-firebase/auth'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleNewAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Cadastrado', 'Usuário cadastrado com sucesso'))
      .catch((error) => console.log(error))
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

      <InputTexts
        placeholder='Confirmar senha'
        secureTextEntry={true}
      />

      <Button
        title='Cadastrar'
        onPress={handleNewAccount}
      />
    </View>
  )
}