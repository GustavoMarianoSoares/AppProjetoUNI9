import { View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'

import auth from '@react-native-firebase/auth'

export function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function openScreenRegister() {
    navigation.navigate('Register')
  }

  function handleSignIn() {
    auth().signInWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Entrou', 'Usuário logado com sucesso'))
      .catch((error) => console.log(error))
  }

  function handleForgotPassword() {
    auth().sendPasswordResetEmail(email)
    .then(() => Alert.alert("Redefinir senha", "Enviamos um e-mail para você"))
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
        title='Entrar'
        onPress={handleSignIn}
      />

      <Button
        title='Esqueci a senha'
        onPress={handleForgotPassword}
      />

      <Button
        title='Ir para cadastro'
        onPress={openScreenRegister}
      />
    </View>
  )
}