import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  all: {
    height:"100%"
  },

  header: {
    backgroundColor: "#00eaff",
    height:"5%",
  },
  headerText: {
    color:"#3246fa",
    textAlign:"center"
  },

  left: {
    backgroundColor: "#0d10d6",
    height:"100%",
    width: "10%"
  },

  middle: {
    backgroundColor: "#79777a",
    height:"90%",
    
  },
  middleText: {
    color:"#2a0c3d",
    textAlign:"center",
  },

  right: {
    backgroundColor: "#05610e",
    height:"100%",
    width: "10%",
    marginLeft: "90%"
  },

  footer: {
    backgroundColor: "#ff91d5",
    height:"5%",
  },
  footerText: {
    color:"#ab2ff7",
    textAlign:"center"
  }

})


export default function Index() {
  return (
    <View style={styles.all}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>

      <View style={styles.middle}>

        <View style={styles.left}></View>

        <Text style={styles.middleText}>Content</Text>

        <View style={styles.right}></View>

      </View>
      

      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </View>
  );
}
