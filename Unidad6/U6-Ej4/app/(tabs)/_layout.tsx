import { Tabs } from "expo-router";
import {MaterialIcons} from "@expo/vector-icons"

export default function TabsLayout(){
    return(
        <Tabs>
            <Tabs.Screen name="index" options={{title:"Home", tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
          ),
          }}/>
            <Tabs.Screen name="(perfil)" options={{title:"Perfil", tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
          ),
          }}/>
            <Tabs.Screen name="config" options={{title:"Configuracion", tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="sign-language" size={size} color={color} />
          ),
          }}/>
        </Tabs>
        
    )
}