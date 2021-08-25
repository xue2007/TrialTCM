import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const CreateTcm = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case "name":
          return route.params.name;
        case "zucheng":
          return route.params.phone;
        case "gongyong":
          return route.params.email;
        case "zhuzhi":
          return route.params.salary;
        case "picture":
          return route.params.picture;
        case "fangjie":
          return route.params.position;
        case "shiyongzhuyi":
          return route.params.position;
        case "fangge":
          return route.params.position;
      }
    }
  };
  if (route.params) {
  }
  const [name, setName] = useState(getDetails("name"));
  const [zucheng, setZucheng] = useState(getDetails("zucheng"));
  const [gongyong, setGongyong] = useState(getDetails("gongyong"));
  const [zhuzhi, setZhuzhi] = useState(getDetails("zhuzhi"));
  const [picture, setPicture] = useState(getDetails("picture"));
  const [fangjie, setFangjie] = useState(getDetails("fangjie"));
  const [shiyongzhuyi, setShiyongzhuyi] = useState(getDetails("shiyongzhuyi"));
  const [fangge, setFangge] = useState(getDetails("fangge"));
  const [modal, setModal] = useState(false);

  const updateDetails = () => {
    fetch(
      `https://tcmfirst.herokuapp.com/trialApp/tcm/update/${route.params._id}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: route.params._id,
          name: name,
          zucheng: zucheng,
          gongyong: gongyong,
          picture: picture,
          zhuzhi: zhuzhi,
          fangjie: fangjie,
          shiyongzhuyi: shiyongzhuyi,
          fangge: fangge,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is updated`);
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("something went wrong");
      });
  };
  const submitData = () => {
    fetch("https://tcmfirst.herokuapp.com/trialApp/tcm/post", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        zucheng: zucheng,
        gongyong: gongyong,
        picture: picture,
        zhuzhi: zhuzhi,
        fangjie: fangjie,
        shiyongzhuyi: shiyongzhuyi,
        fangge: fangge,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is saved successfully`);
        navigation.navigate("Notification");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("something went wrong");
      });
  };

  const pickFromGallery = async () => {
    const { granted } = await MediaLibrary.getPermissionsAsync();
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1, //1 is best quality,0.5 half qualit of image.
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("you need to give us permission to work");
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Camera.getCameraPermissionsAsync();
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1, //1 is best quality,0.5 half qualit of image.
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("you need to give us permission to work");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "trialApp");
    data.append("cloud_name", "dotapro");
    fetch("https://api.cloudinary.com/v1_1/dotapro/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      });
  };
  return (
    <View style={styles.root}>
      <KeyboardAvoidingView behavior="position">
        <TextInput
          label="Name"
          value={name}
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="组成"
          value={zucheng}
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setZucheng(text)}
        />
        <TextInput
          label="功用"
          value={gongyong}
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setGongyong(text)}
        />
        <TextInput
          label="主治"
          value={zhuzhi}
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setZhuzhi(text)}
        />
        <TextInput
          label="方解"
          value={fangjie}
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setFangjie(text)}
        />
        <TextInput
          label="使用注意"
          value={shiyongzhuyi}
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setShiyongzhuyi(text)}
        />
        <TextInput
          label="方歌"
          value={fangge}
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          onChangeText={(text) => setFangge(text)}
        />
        <Button
          style={styles.inputStyle}
          icon={picture == "" ? "upload" : "check"}
          mode="contained"
          theme={theme}
          onPress={() => setModal(true)}
        >
          Upload Image
        </Button>
        {route.params ? (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            theme={theme}
            onPress={() => updateDetails()}
          >
            Update Details
          </Button>
        ) : (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            theme={theme}
            onPress={() => submitData()}
          >
            Save
          </Button>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            //basically so the back button works
            setModal(false);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button
                style={styles.inputStyle}
                icon="camera"
                mode="contained"
                theme={theme}
                onPress={() => pickFromCamera()}
              >
                Camera
              </Button>
              <Button
                style={styles.inputStyle}
                icon="image-area"
                mode="contained"
                onPress={() => pickFromGallery()}
              >
                Gallery
              </Button>
            </View>
            <Button theme={theme} onPress={() => setModal(false)}>
              Cancel
            </Button>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
    flex: 1, //take complete height of screen
  },
  inputStyle: {
    margin: 5,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: " 100%",
    backgroundColor: "white",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around", //space between buttons
    padding: 10,
  },
});

export default CreateTcm;
