import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import { Card, FAB } from "react-native-paper";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLodaing] = useState(true);

  const fetchData = () => {
    fetch("https://tcmfirst.herokuapp.com/trialApp/user/get")
      .then((res) => res.json())
      .then((results) => {
        setData(results);
        setLodaing(false);
      })
      .catch((err) => {
        Alert.alert("something went wrong");
      });
  };

  //only kick in only once when component kicks in.
  useEffect(() => {
    fetchData();
  }, []);
  const renderList = (item) => {
    return (
      <Card
        style={styles.myCard}
        key={item._id}
        onPress={() => navigation.navigate("Profile", { item })} //or item:item
      >
        <View style={styles.cardView}>
          <Image
            style={{ width: 80, height: 80, borderRadius: 40 }}
            source={{
              uri: item.picture,
            }}
          ></Image>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => item._id}
        onRefresh={() => fetchData()}
        refreshing={loading}
      ></FlatList>

      <FAB
        onPress={() => navigation.navigate("Create")}
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: "#006aff" } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  myCard: {
    margin: 5,
  },
  cardView: {
    flexDirection: "row",
    padding: 6,
  },
  text: {
    fontSize: 18,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default Home;

//or export by {Home} then u have to import by {} as well
//try to create separate view in card if flex not working
