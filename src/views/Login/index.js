import { View, Alert, TouchableOpacity, Text, Image } from 'react-native'
import React, { useState } from 'react'

import { InputTexts } from "../../components/InputTexts"
import { ButtonAction } from "../../components/ButtonAction"
import Checkbox from 'expo-checkbox';

import styles from './styles'

import auth from '@react-native-firebase/auth'

export function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setChecked] = useState(false)

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

    if (error === 'auth/network-request-failed') {
      Alert.alert('CONECTE-SE', 'Verifique se você está conectado a internet e tente novamente.')
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
        .then(() => {
          Alert.alert("VERIFIQUE SEU E-MAIL", "Enviamos novamente um e-mail de verificação para que possa entrar no sistema.")
        })
        .catch(() => {
          Alert.alert("AGUARDE", "Aguarde em até 1 minuto para que possamos reenviar o e-mail de verificação.")
        })
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

  function changePasswordSecure() {
    if (isChecked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }

  return (
    <View style={{ marginTop: 50 }}>
      <Image 
        style={styles.logoImage}
        source={require('../../assets/logo.png')}
      />

      <InputTexts
        placeholder='E-mail'
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <InputTexts
        placeholder='Senha'
        onChangeText={setPassword}
        secureTextEntry={!isChecked}
      />
      <View style={styles.passwordsView}>
        <TouchableOpacity style={styles.showPassword}
          onPress={changePasswordSecure}>
          <Checkbox
            value={isChecked}
            color={isChecked ? '#339FFF' : '#797979'}
          />

          <Text style={styles.showPasswordText}>Mostrar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPasswordTouchable}
          onPress={openScreenForgotPassword} >
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

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