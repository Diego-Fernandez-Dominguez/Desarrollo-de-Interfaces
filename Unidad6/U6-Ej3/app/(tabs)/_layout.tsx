import { Tabs } from "expo-router";
import {MaterialIcons} from "@expo/vector-icons"

export default function TabsLayout(){
    return(
        <Tabs screenOptions={{ tabBarInactiveTintColor:"#0978c2ff", tabBarActiveTintColor:"#000000ff",
            tabBarStyle: {height: 60, backgroundColor: "#9ed5faff", borderColor: "#0978c2ff"}}}>
            <Tabs.Screen name="index" options={{title:"Home", tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),}}/>
            <Tabs.Screen name="profile" options={{title:"Perfil", tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),}}/>
            <Tabs.Screen name="search" options={{title:"Busqueda", tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),}}/>
        </Tabs>
        
    )
}