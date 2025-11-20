import { Text, View } from "react-native";
import {Link} from 'expo-router';
import { Button } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text>Jas, te he metido un malware</Text>
    <Link href={"/"}>
        <Button title="Volver atras"/>
    </Link>

    </View>
  );
}
