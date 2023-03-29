import { View, Button, Alert } from 'react-native'
import React, { useState } from 'react'

import { InputTexts } from "../../components/InputTexts"

import auth from '@react-native-firebase/auth'

export function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isPasswordSecure, setIsPasswordSecure] = useState(true)

  function openScreenRegister() {
    navigation.navigate('Register')
  }

  function openScreenForgotPassword() {
    navigation.navigate('ForgotPassword')
  }

  function handleSignIn() {
    auth().signInWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Entrou', 'Usuário logado com sucesso'))
      .catch((error) => console.log(error))
  }

  function showPassword() {
    { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }
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
        secureTextEntry={isPasswordSecure}
      />

      <Button
        title='Mostrar senha'
        onPress={showPassword}
      />

      <Button
        title='Entrar'
        onPress={handleSignIn}
      />

      <Button
        title='Esqueci a senha'
        onPress={openScreenForgotPassword}
      />

      <Button
        title='Ir para cadastro'
        onPress={openScreenRegister}
      />
    </View>
  )
}