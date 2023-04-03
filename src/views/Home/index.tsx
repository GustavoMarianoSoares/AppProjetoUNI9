import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { ButtonAction } from "../../components/ButtonAction"
import { InputTexts } from "../../components/InputTexts"

import styles from './styles'

import { Entypo } from '@expo/vector-icons';

import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"


export function Home({ navigation }) {
  const [patrimony, setPatrimony] = useState('')
  const [owner, setOwner] = useState('')
  const [component, setComponent] = useState('')
  const [description, setDescription] = useState('')
  const [orders, setOrders] = useState([])


  function handleSignOut() {
    Alert.alert('', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Ok',
        onPress: () =>
          auth().signOut()
      },
    ]);

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
    <ScrollView>
      <View style={styles.headerHome}>
        <Text style={styles.headerText}>Olá, {auth().currentUser.displayName} 👋</Text>

        <TouchableOpacity onPress={handleSignOut}>
          <Entypo name="log-out" size={35} color="white" marginRight={20} />
        </TouchableOpacity>
      </View>

      {
        orders.map((item) =>
          <View key={item.key}>
            <Text style={{ alignSelf: 'center', fontSize: 16 }}>{item.patrimony}</Text>
            <Text style={{ alignSelf: 'center', fontSize: 16 }}>{item.owner}</Text>
            <Text style={{ alignSelf: 'center', fontSize: 16 }}>{item.description}</Text>
            <Text style={{ alignSelf: 'center', fontSize: 16 }}>{item.component}</Text>
            <Text style={{ alignSelf: 'center', fontSize: 16 }}>{item.status}</Text>
            <ButtonAction
              title='DELETAR'
              onPress={() => handleDelete(item.key)}
            />
            <ButtonAction
              title='EDITAR PEDIDO'
              onPress={() => openEditOrder(item)}
            />
          </View>
        )
      }

      <InputTexts
        placeholder='Número do patrimonio'
        onChangeText={setPatrimony}
        secureTextEntry={undefined}
        keyboardType={undefined}
        value={undefined}
        autoCapitalize={undefined}
      />

      <InputTexts
        placeholder='Nome do Dono(a)'
        onChangeText={setOwner}
        secureTextEntry={undefined}
        keyboardType={undefined}
        value={undefined}
        autoCapitalize={undefined}
      />

      <InputTexts
        placeholder='Componente'
        onChangeText={setComponent}
        secureTextEntry={undefined}
        keyboardType={undefined}
        value={undefined}
        autoCapitalize={undefined}
      />

      <InputTexts
        placeholder='Descrição'
        onChangeText={setDescription}
        secureTextEntry={undefined}
        keyboardType={undefined}
        value={undefined} autoCapitalize={undefined} />

      <ButtonAction
        title='ENVIAR CHAMADO'
        onPress={handleNewOrder}
      />
    </ScrollView>
  )
}