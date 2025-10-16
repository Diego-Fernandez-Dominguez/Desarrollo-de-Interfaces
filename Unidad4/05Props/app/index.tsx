import { Pressable, Text, View } from "react-native";
import BotonTopeGuay from "../components/BotonTopeGuay";

export default function Index() {
  return (
    <View>
      <BotonTopeGuay texto="No hago nada jisjisjis" />
      <BotonTopeGuay texto="Soy un pressable, no un boton" />
      <BotonTopeGuay texto="Me da igual" />
      <BotonTopeGuay texto="Estoy delirando" />

    </View>
  );
}
