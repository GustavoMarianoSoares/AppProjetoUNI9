import { View, Alert,Text } from 'react-native'
import React, { useState } from 'react'

import { ButtonAction } from "../../components/ButtonAction"
import { InputTexts } from "../../components/InputTexts"
import { Header } from "../../components/Header"

import firestore from '@react-native-firebase/firestore';

export function EditOrder({ navigation, route }) {
  const infos = route.params.item

  const [patrimony, setPatrimony] = useState(infos.patrimony)
  const [owner, setOwner] = useState(infos.owner)
  const [component, setComponent] = useState(infos.component)
  const [description, setDescription] = useState(infos.description)

  function handleEditOrder() {
    firestore()
      .collection('orders')
      .doc(infos.key)
      .set({
        patrimony: patrimony,
        owner: owner,
        component: component,
        description: description,
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
        placeholder={undefined}
        secureTextEntry={undefined}
        keyboardType={undefined}
        autoCapitalize={undefined}
      />

      <InputTexts
        value={owner}
        onChangeText={setOwner}
        placeholder={undefined}
        secureTextEntry={undefined}
        keyboardType={undefined}
        autoCapitalize={undefined}
      />

      <InputTexts
        value={component}
        onChangeText={setComponent}
        placeholder={undefined}
        secureTextEntry={undefined}
        keyboardType={undefined}
        autoCapitalize={undefined}
      />

      <InputTexts
        value={description}
        onChangeText={setDescription}
        placeholder={undefined}
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