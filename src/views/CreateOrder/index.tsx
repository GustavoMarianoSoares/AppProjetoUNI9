import {
  ScrollView,
  Alert,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ButtonAction } from "../../components/ButtonAction";
import { InputTexts } from "../../components/InputTexts";
import { Header } from "../../components/Header";

import styles from "./styles";

import firestore from "@react-native-firebase/firestore";

export function CreateOrder({ navigation }) {
  const [patrimony, setPatrimony] = useState("");
  const [telephoneOwner, setTelephoneOwner] = useState("");
  const [owner, setOwner] = useState("");
  const [component, setComponent] = useState("");
  const [description, setDescription] = useState("");

  function handleNewOrder() {
    firestore()
      .collection("orders")
      .add({
        patrimony,
        owner,
        telephoneOwner,
        component,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Chamado criado", "Chamado criado com sucesso");
        navigation.goBack();
      });
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <Header />

          <Text style={styles.textCreate}>Criar Chamado</Text>

          <InputTexts
            placeholder="Número do patrimonio"
            onChangeText={setPatrimony}
            secureTextEntry={undefined}
            keyboardType={undefined}
            value={undefined}
            autoCapitalize={undefined}
          />

          <InputTexts
            placeholder="Nome do Dono(a)"
            onChangeText={setOwner}
            secureTextEntry={undefined}
            keyboardType={undefined}
            value={undefined}
            autoCapitalize={undefined}
          />

          <InputTexts
            placeholder="Telefone do Dono(a)"
            onChangeText={setTelephoneOwner}
            secureTextEntry={undefined}
            keyboardType={undefined}
            value={undefined}
            autoCapitalize={undefined}
          />

          <InputTexts
            placeholder="Componente"
            onChangeText={setComponent}
            secureTextEntry={undefined}
            keyboardType={undefined}
            value={undefined}
            autoCapitalize={undefined}
          />

          <InputTexts
            placeholder="Descrição"
            onChangeText={setDescription}
            secureTextEntry={undefined}
            keyboardType={undefined}
            value={undefined}
            autoCapitalize={undefined}
          />

          <ButtonAction title="ENVIAR CHAMADO" onPress={handleNewOrder} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
