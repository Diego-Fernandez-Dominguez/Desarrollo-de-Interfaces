import { Text, View, Image } from "react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    margin:"2%",
    borderColor:"#000000",
    borderWidth:6,
    borderRadius:50,
  },
  literalmenteYo: {
    width:150,
    height:150,
    alignSelf:"center",
    borderRadius:500,
    marginTop: 5,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30
  }
})


export default function Index() {
  return (
    <View style={styles.card}>
      <Image source={require("../assets/images/CJ.png")} style={styles.literalmenteYo}></Image>
            <Text style={styles.text}>Diego Fernandez Domimguez</Text>
    </View>
  );
}

