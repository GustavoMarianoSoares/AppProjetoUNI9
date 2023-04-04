import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { ButtonAction } from "../../components/ButtonAction"
import { Header } from "../../components/Header"

import styles from './styles'
import { Feather } from '@expo/vector-icons';

import firestore from "@react-native-firebase/firestore"


export function Home({ navigation }) {
  const [orders, setOrders] = useState([])

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

  function openCreateOrder() {
    navigation.navigate('CreateOrder')
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
      <Header />

      <ButtonAction
        title='CRIAR CHAMADO'
        onPress={openCreateOrder}
      />

      {
        orders.map((item) =>
          <View key={item.key} style={styles.container}>
            <View>
              <Text style={styles.component}>{item.component}</Text>
              <Text style={styles.orderInfos}>{item.description}</Text>
              <Text style={styles.orderInfos}>{item.owner}</Text>
              <Text style={styles.orderInfos}>{item.telephoneOwner}</Text>
              <Text style={styles.orderInfos}>{item.patrimony}</Text>
            </View>

            <View>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => openEditOrder(item)}>
                <Feather name="edit" size={35} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.icons}
                onPress={() => handleDelete(item.key)}>
                <Feather name="trash-2" size={35} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    </ScrollView>
  )
}