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
      Alert.alert('Email mal feito', 'Email mal informado faz direito ai')
    }

    if(error === 'auth/weak-password'){
      Alert.alert('Senha fraca', 'Crie uma senha com pelo menos 6 caracteres')
    }
  }

  function handleNewAccount() {
    if (email == "" || password == "") {
      Alert.alert("Preencha tudo", "Preencha os inputs")
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => Alert.alert('Cadastrado', 'Usuário cadastrado com sucesso'))
        .catch(error => {
          registerValidation(error.code)
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