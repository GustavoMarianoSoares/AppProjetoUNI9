import { View, Text, Button } from 'react-native'
import React from 'react'

export function Login({ navigation }) {
  function openScreenHome() {
    navigation.navigate('Home')
  }

  function openScreenRegister() {
    navigation.navigate('Register')
  }

  return (
    <View>
      <Text>Login</Text>

      <Button
        title='Ir para home'
        onPress={openScreenHome}
      />

      <Button
        title='Ir para cadastro'
        onPress={openScreenRegister}
      />
    </View>
  )
}