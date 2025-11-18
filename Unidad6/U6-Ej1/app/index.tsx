import { Text, View } from "react-native";
import { PracticaBoton } from "./presentation/components/Practica";
import { ProductCard } from "./presentation/components/ProductCard";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ProductCard
        name="Gra, el hermano de Gru"
        price={140}
        imageUrl="https://ih1.redbubble.net/image.4744606411.8211/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
        onAddToCart={() => console.log("Presionado")}
        ></ProductCard>
    </View>
  );
}
