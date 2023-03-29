import { View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'

import firestore from '@react-native-firebase/firestore';

export function EditOrder({navigation, route }) {
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
      <TextInput
        value={patrimony}
        onChangeText={setPatrimony}
      />

      <TextInput
        value={owner}
        onChangeText={setOwner}
      />

      <TextInput
        value={component}
        onChangeText={setComponent}
      />

      <TextInput
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title='Editar chamado'
        onPress={handleEditOrder}
      />
    </View>
  )
}