import { View, Text, Alert, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { ButtonAction } from "../../components/ButtonAction";
import { Header } from "../../components/Header";

import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

import firestore from "@react-native-firebase/firestore";

export function Home({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("open");

  function handleDelete(id) {
    Alert.alert("", "Tem certeza que deseja deletar este chamado?", [
      {
        text: "Cancelar",
      },
      {
        text: "Ok",
        onPress: () =>
          firestore()
            .collection("orders")
            .doc(id)
            .delete()
            .then(() => {
              Alert.alert("DELETADO", "Chamado deletado com sucesso");
            }),
      },
    ]);
  }

  function handleStatus(item) {
    if (item.status == "open") {
      Alert.alert("", "Tem certeza que deseja fechar este chamado?", [
        {
          text: "Cancelar",
        },
        {
          text: "Ok",
          onPress: () =>
            firestore()
              .collection("orders")
              .doc(item.key)
              .update({
                status: "closed",
              })
              .then(() => {
                Alert.alert("FECHADO", "Chamado fechado com sucesso");
              }),
        },
      ]);
    } else {
      Alert.alert("", "Tem certeza que deseja reabrir este chamado?", [
        {
          text: "Cancelar",
        },
        {
          text: "Ok",
          onPress: () =>
            firestore()
              .collection("orders")
              .doc(item.key)
              .update({
                status: "open",
              })
              .then(() => {
                Alert.alert("ABERTO", "Chamado aberto com sucesso");
              }),
        },
      ]);
    }
  }

  function openEditOrder(item) {
    navigation.navigate("EditOrder", { item: item });
  }

  function openCreateOrder() {
    navigation.navigate("CreateOrder");
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection("orders")
      .onSnapshot((querySnapshot) => {
        const orders = [];

        querySnapshot.forEach((documentSnapshot) => {
          orders.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setOrders(orders);
      });
    return () => subscriber();
  }, []);

  const renderStatus = orders.map((item) =>
    item.status == status ? (
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
            onPress={() => openEditOrder(item)}
          >
            <Feather name="edit" size={35} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.icons}
            onPress={() => handleDelete(item.key)}
          >
            <Feather name="trash-2" size={35} color="white" />
          </TouchableOpacity>

          {item.status == "open" ? (
            <TouchableOpacity
              style={styles.icons}
              onPress={() => handleStatus(item)}
            >
              <Octicons name="verified" size={35} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.icons}
              onPress={() => handleStatus(item)}
            >
              <Octicons name="unverified" size={35} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    ) : (
      <View key={item.key}></View>
    )
  );

  return (
    <ScrollView>
      <Header />

      <ButtonAction title="CRIAR CHAMADO" onPress={openCreateOrder} />

      <TouchableOpacity onPress={() => setStatus("open")}>
        <Text>Aberto</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setStatus("closed")}>
        <Text>Fechado</Text>
      </TouchableOpacity>

      {renderStatus}
    </ScrollView>
  );
}
