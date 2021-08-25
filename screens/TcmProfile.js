import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const TcmProfile = (props) => {
  const {
    _id,
    name,
    zucheng,
    gongyong,
    zhuzhi,
    fangjie,
    picture,
    shiyongzhuyi,
    fangge,
  } = props.route.params.item;

  const deleteUser = () => {
    fetch("https://tcmfirst.herokuapp.com/trialApp/tcm/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then((res) => res.json())
      .then((deletedUser) => {
        console.log(deletedUser);
        Alert.alert(`${deletedUser.name} deleted`);
        props.navigation.navigate("Navigation");
      })
      .catch((err) => {
        Alert.alert("something went wrong");
      });
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0033ff", "#6bc1ff"]}
        style={{ height: "20%" }}
      ></LinearGradient>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 140, height: 140, borderRadius: 70, marginTop: -50 }}
          source={{ uri: picture }}
        ></Image>
      </View>
      <View style={{ alignItems: "center", margin: 15 }}>
        <Title>{name}</Title>
        <Text style={{ fontSize: 15 }}>{zucheng}</Text>
      </View>

      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="email" size={32} color="#006aff"></MaterialIcons>
          <Text style={styles.myText}>{gongyong}</Text>
        </View>
      </Card>

      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <Entypo name="phone" size={32} color="#006aff"></Entypo>
          <Text style={styles.myText}>{zhuzhi}</Text>
        </View>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons
            name="attach-money"
            size={32}
            color="#006aff"
          ></MaterialIcons>
          <Text style={styles.myText}>{fangjie}</Text>
        </View>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons
            name="attach-money"
            size={32}
            color="#006aff"
          ></MaterialIcons>
          <Text style={styles.myText}>{shiyongzhuyi}</Text>
        </View>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons
            name="attach-money"
            size={32}
            color="#006aff"
          ></MaterialIcons>
          <Text style={styles.myText}>{fangge}</Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <Button
          icon="account-edit"
          mode="contained"
          theme={theme}
          onPress={() => {
            props.navigation.navigate("CreateTcm", {
              _id,
              name,
              zucheng,
              gongyong,
              zhuzhi,
              fangjie,
              shiyongzhuyi,
              fangge,
              picture,
            });
          }}
        >
          Edit
        </Button>
        <Button
          icon="delete"
          mode="contained"
          theme={theme}
          onPress={() => deleteUser()}
        >
          Delete User
        </Button>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 5,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  myText: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
});
export default TcmProfile;

//need to keep creating view if you want to change row or column wise
