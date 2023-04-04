import { View, Alert, Text } from 'react-native'
import React, { useState } from 'react'

import { ButtonAction } from "../../components/ButtonAction"
import { InputTexts } from "../../components/InputTexts"
import { Header } from "../../components/Header"

import firestore from '@react-native-firebase/firestore';

export function EditOrder({ navigation, route }) {
  const infos = route.params.item

  const [patrimony, setPatrimony] = useState(infos.patrimony)
  const [owner, setOwner] = useState(infos.owner)
  const [telephoneOwner, setTelephoneOwner] = useState(infos.telephoneOwner)
  const [component, setComponent] = useState(infos.component)
  const [description, setDescription] = useState(infos.description)

  function handleEditOrder() {
    firestore()
      .collection('orders')
      .doc(infos.key)
      .set({
        patrimony,
        owner,
        telephoneOwner,
        component,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Atualizado', 'Pedido atualizado')
        navigation.goBack()
      });
  }

  return (
    <View>
      <Header />

      <Text>Editar Pedido</Text>

      <InputTexts
        value={patrimony}
        onChangeText={setPatrimony}
        placeholder='Número do patrimonio'
        secureTextEntry={undefined}
        keyboardType={undefined}
        autoCapitalize={undefined}
      />

      <InputTexts
        value={owner}
        onChangeText={setOwner}
        placeholder='Nome do Dono(a)'
        secureTextEntry={undefined}
        keyboardType={undefined}
        autoCapitalize={undefined}
      />

      <InputTexts
        value={telephoneOwner}
        onChangeText={setTelephoneOwner}
        placeholder='Telefone do Dono(a)'
        secureTextEntry={undefined}
        keyboardType={undefined}
        autoCapitalize={undefined}
      />

      <InputTexts
        value={component}
        onChangeText={setComponent}
        placeholder='Componente'
        secureTextEntry={undefined}
        keyboardType={undefined}
        autoCapitalize={undefined}
      />

      <InputTexts
        value={description}
        onChangeText={setDescription}
        placeholder='Descrição'
        secureTextEntry={undefined}
        keyboardType={undefined}
        autoCapitalize={undefined}
      />

      <ButtonAction
        title='EDITAR CHAMADO'
        onPress={handleEditOrder}
      />
    </View>
  )
}