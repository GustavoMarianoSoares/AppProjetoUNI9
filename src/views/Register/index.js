import { View, Alert } from 'react-native'
import React, { useState } from 'react'

import { InputTexts } from "../../components/InputTexts"
import { ButtonAction } from "../../components/ButtonAction"

import auth from '@react-native-firebase/auth'

export function Register({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function registerValidationAuth(error) {
    if (error === 'auth/invalid-email') {
      Alert.alert('E-MAIL MAL INFORMADO', 'E-mail mal informado, verifique se o e-mail está correto e com todos os caracteres como: @, .com e etc...')
    }

    if (error === 'auth/weak-password') {
      Alert.alert('SENHA FRACA', 'Crie uma senha com pelo menos 6 caracteres para se cadastrar.')
    }

    if (error === 'auth/email-already-in-use') {
      Alert.alert('E-MAIL JÁ CADASTRADO', 'Este endereço de e-mail já está cadastrado em outra conta.')
    }
  }

  function registerValidation() {
    if (email == "" || password == "" || confirmPassword == "") {
      Alert.alert('PREENCHA TODOS OS CAMPOS', 'Para se registrar no sistema informe todos os campos acima.')
    } else if (confirmPassword != password) {
      Alert.alert('SENHAS DIFERENTES', 'As senhas digitadas não correspondem, verifique e tente novamente.')
    } else {
      handleNewAccount()
    }
  }

  function handleNewAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth().currentUser.sendEmailVerification()
        Alert.alert('CADASTRADO', 'Usuário cadastrado no sistema com sucesso, enviamos um e-mail para que você verifique-o.')
        navigation.goBack()
      })
      .catch(error => {
        registerValidationAuth(error.code)
      })
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
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />

      <ButtonAction
        title='CADASTRAR'
        onPress={registerValidation}
      />
    </View>
  )
}