import { View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'

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
      <TextInput
        placeholder='E-mail'
        onChangeText={setEmail}
      />

      <TextInput
        placeholder='Senha'
        onChangeText={setPassword}
      />

      <Button
        title='Cadastrar'
        onPress={handleNewAccount}
      />
    </View>
  )
}