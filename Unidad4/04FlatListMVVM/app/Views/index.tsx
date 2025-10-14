
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { IndexVM } from "../ViewModels/indexVM";

const vm = new IndexVM();
const personas = vm.Personas;

export default function Index() {
  return (
    <View style={styles.container}>
      <FlatList
        data={personas}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contenedoresDePersonasJijiji}>
            <TouchableOpacity onPress={() => vm.PersonaSeleccionada=item}>
              <Text style={styles.textito}>
                {item.Nombre} {item.Apellido}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.loDeAbajo}>
        <Text style={styles.textoDeLoDeAbajo}>Aqui estaba lo de darle click a un nombre y te aparecia su informacion</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fae8e0ff',
  },
  contenedoresDePersonasJijiji: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#d17104ff',
    borderWidth: 2,
  },
  itemPressed: {
    backgroundColor: '#ffe0b2',
  },
  textito: {
    fontSize: 18,
    color: '#ec8129ff',
  },
  loDeAbajo: {
    marginTop: 28,
    padding: 18,
    backgroundColor: '#ec8129ff',
    borderRadius: 12,
    elevation: 3,
    borderColor: '#d17104ff',
    borderWidth: 1,
  },
  textoDeLoDeAbajo: {
    fontSize: 18,
    color: '#fff',
  },
});