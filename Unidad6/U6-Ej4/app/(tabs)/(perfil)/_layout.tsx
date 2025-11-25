import { Tabs, withLayoutContext } from "expo-router";
import {createMaterialTopTabNavigator}  from '@react-navigation/material-top-tabs'

const {Navigator} = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator)

export default function TabsLayout(){
    return(
        <MaterialTopTabs>
            <MaterialTopTabs.Screen name="index" options={{title:"Posts"}}/>
            <MaterialTopTabs.Screen name="gallery" options={{title:"Galeria"}}/>
        </MaterialTopTabs>
        
    )
}