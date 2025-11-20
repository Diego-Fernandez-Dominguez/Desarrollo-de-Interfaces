import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button } from "react-native";
import { ButtonChulisimo } from "./components/ButtonChulisimo";
import { LaCartaDeFuera } from "./components/LaCartaDeFuera";

export default function Index() {
    const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <LaCartaDeFuera>

         <ButtonChulisimo
        color="#dd7b1fff"
        text="Dame click si quieres volverte millonario"
        textColor="#fffffff"
        onPress={() => router.push("/home")}
      />
      <Link href={"/register"}>
        <Text >Registrate, pobre</Text>
      </Link>
      </LaCartaDeFuera>



      


    </View>
  );
}
