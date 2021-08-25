import React, { useRef } from "react";
import { Animated, StyleSheet, View, Dimensions } from "react-native";
import Home from "./screens/Home";
import CreateUser from "./screens/CreateUser";
import CreateTcm from "./screens/CreateTcm";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import TcmProfile from "./screens/TcmProfile";
import Search from "./screens/Search";
import Notification from "./screens/Notifications";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
//can set header as empty in stack navigator
const headerOptions = {
  title: "Solid",
  headerTintColor: "white",
  headerStyle: { backgroundColor: "#006aff" },
};

const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const SearchStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen
        name="Create"
        component={CreateUser}
        options={{ title: "Create User" }}
      />
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
}

function NotificationStackScreen() {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen name="Notification" component={Notification} />
      <HomeStack.Screen
        name="CreateTcm"
        component={CreateTcm}
        options={{ title: "Create Tcm" }}
      />
      <HomeStack.Screen name="TcmProfile" component={TcmProfile} />
    </NotificationStack.Navigator>
  );
}
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} />
    </SearchStack.Navigator>
  );
}

function InterfaceTabs() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabStyle}>
                <FontAwesome5
                  name="home"
                  size={20}
                  color={focused ? "#006aff" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: -10,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabStyle}>
                <FontAwesome5
                  name="search"
                  size={20}
                  color={focused ? "#006aff" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1.5,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabStyle}>
                <FontAwesome5
                  name="bell"
                  size={20}
                  color={focused ? "#006aff" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3.1,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabStyle}>
                <FontAwesome5
                  name="cog"
                  size={20}
                  color={focused ? "#006aff" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4.8,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: "#006aff",
          position: "absolute",
          bottom: 50,
          // Horizontal Padding = 20...
          left: 30,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }],
        }}
      />
    </NavigationContainer>
  );
}
function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={headerOptions} />
        <Stack.Screen
          name="Create"
          component={CreateUser}
          options={{ ...headerOptions, title: "Create User" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...headerOptions, title: "User Profile" }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return <InterfaceTabs />;
};

function getWidth() {
  let width = Dimensions.get("window").width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    //marginTop: Constants.statusBarHeight, // to make sure below top phone status bar
    // alignItems: "center",
    //flexDirection: "row", -> reverse the align and justifycontent
    //justifyContent: "center",
  },
  tabStyle: {
    position: "absolute",
    top: 20,
  },
});
