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

  function signInValidationAuth(error) {
    if (error === 'auth/wrong-password') {
      Alert.alert('SENHA', 'Senha errada, tente novamente ou clique em esqueci a senha para redefini-la.')
    }

    if (error === 'auth/user-not-found') {
      Alert.alert('E-MAIL', 'E-mail não encontrado, verifique se o e-mail está correto e tente novamente.')
    }

    if (error === 'auth/too-many-requests') {
      Alert.alert('MUITAS TENTATIVAS', 'Foram registradas muitas tentativas ao entrar nesta conta, tente novamente mais tarde.')
    }

    if (error === 'auth/invalid-email') {
      Alert.alert('E-MAIL MAL INFORMADO', 'E-mail mal informado, verifique se o e-mail está correto e com todos os caracteres como: @, .com e etc...')
    }
  }

  function signInValidation() {
    if (email == "" || password == "") {
      Alert.alert('PREENCHA TODOS OS CAMPOS', 'Para entrar no sistema informe todos os campos acima.')
    } else {
      handleSignIn()
    }
  }

  function checkEmailVerified() {
    if (auth().currentUser.emailVerified == false) {
      auth().currentUser.sendEmailVerification()
      Alert.alert("VERIFIQUE SEU E-MAIL", "Enviamos novamente um e-mail para você verifique o seu e-mail para poder entrar no aplicativo.")
    } else {
      Alert.alert("ENTROU", "Entrou no sistema com sucesso. 🌟")
    }
  }

  function handleSignIn() {
    auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        checkEmailVerified()
      })
      .catch(error => {
        signInValidationAuth(error.code)
      })
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
        onPress={signInValidation}
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