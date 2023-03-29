import { View, Text, Button, TextInput, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

export function Home({ navigation }) {
  const [patrimony, setPatrimony] = useState('')
  const [owner, setOwner] = useState('')
  const [component, setComponent] = useState('')
  const [description, setDescription] = useState('')
  const [orders, setOrders] = useState([])


  function handleSignOut() {
    auth().signOut();
  }

  function handleNewOrder() {
    firestore()
      .collection('orders')
      .add({
        patrimony,
        owner,
        component,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => Alert.alert('Chamado criado', 'Chamado criado com sucesso'))
      .catch((error) => console.log(error))
  }

  function handleDelete(id) {
    Alert.alert('', 'Tem certeza que deseja deletar este pedido?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Ok',
        onPress: () =>
          firestore()
            .collection('orders')
            .doc(id)
            .delete()
            .then(() => {
              Alert.alert('Deletado', 'Pedido deletado com sucesso')
            })
      },
    ]);

  }

  function openEditOrder(item) {
    navigation.navigate('EditOrder', { item: item })
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('orders')
      .onSnapshot(querySnapshot => {
        const orders = [];

        querySnapshot.forEach(documentSnapshot => {
          orders.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setOrders(orders)
      });
    return () => subscriber();
  }, []);

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View>
            <Text>{item.patrimony}</Text>
            <Text>{item.owner}</Text>
            <Text>{item.description}</Text>
            <Text>{item.component}</Text>
            <Text>{item.status}</Text>
            <Button
              title='Deletar'
              onPress={() => handleDelete(item.key)}
            />
            <Button
              title='Editar Pedido'
              onPress={() => openEditOrder(item)}
            />
          </View>
        )}
      />

      <TextInput
        placeholder='Número do patrimonio'
        onChangeText={setPatrimony}
      />

      <TextInput
        placeholder='Nome do Dono(a)'
        onChangeText={setOwner}
      />

      <TextInput
        placeholder='Componente'
        onChangeText={setComponent}
      />

      <TextInput
        placeholder='Descrição'
        onChangeText={setDescription}
      />

      <Button
        title='Enviar chamado'
        onPress={handleNewOrder}
      />

      <Button
        title='Logout'
        onPress={handleSignOut}
      />
    </View>
  )
}