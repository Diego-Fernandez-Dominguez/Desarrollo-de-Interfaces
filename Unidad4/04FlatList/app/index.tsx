import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";


const usuarios=[
  {id: '1', nombre: 'Matias', apellido:'Gutierrez'},
  { id: '2', nombre: 'Lucia', apellido: 'Fernandez' },
  { id: '3', nombre: 'Diego', apellido: 'Perez' },
  { id: '4', nombre: 'Sofia', apellido: 'Martinez' },
  { id: '5', nombre: 'Juan', apellido: 'Lopez' },
  { id: '6', nombre: 'Valentina', apellido: 'Sanchez' },
  { id: '7', nombre: 'Martin', apellido: 'Diaz' },
  { id: '8', nombre: 'Camila', apellido: 'Romero' },
  { id: '9', nombre: 'Lucas', apellido: 'Mendez' },
  { id: '10', nombre: 'Florencia', apellido: 'Alvarez' },
  { id: '11', nombre: 'Agustin', apellido: 'Torres' },
  { id: '12', nombre: 'Julieta', apellido: 'Silva' },
  { id: '13', nombre: 'Tomas', apellido: 'Gomez' },
  { id: '14', nombre: 'Paula', apellido: 'Ruiz' },
  { id: '15', nombre: 'Federico', apellido: 'Castro' }
]
export default function Index() {
  return (
    <FlatList
    data={usuarios}
    keyExtractor= {(item) => item.id.toString()}
    renderItem = {({ item }) => (
      <View >
       <Text>{item.nombre} {item. apellido}</Text>
     </View>
    )}
    />
  )}
