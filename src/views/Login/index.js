import { View, Alert, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'

import { InputTexts } from "../../components/InputTexts"
import { ButtonAction } from "../../components/ButtonAction"

import styles from './styles'

import auth from '@react-native-firebase/auth'

export function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  return (
    <View style={{ marginTop: 50 }}>
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

      <TouchableOpacity
        style={styles.forgotPasswordTouchable}
        onPress={openScreenForgotPassword} >
        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <ButtonAction
        title='ENTRAR'
        onPress={handleSignIn}
      />

      <TouchableOpacity
        style={styles.doesNotHaveAccountTouchable}
        onPress={openScreenRegister}>
        <Text style={styles.doesNotHaveAccountText}>
          Ainda não possui uma conta? <Text style={{ color: '#5D9ED4' }}>Registre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}