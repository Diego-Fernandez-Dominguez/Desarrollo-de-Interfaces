import React  from "react";
import { Pressable, Text, StyleSheet, View, Image } from "react-native";

type Props = {
    name:string;
    price:number;
    imageUrl?: string; 
    onAddToCart:() =>void;
}

export function ProductCard({name, price, imageUrl ,onAddToCart}: Props){
    return(
        <View style={styles.card}>
            <Image source={{ uri:imageUrl}} style={styles.image}/>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{price}€</Text>
            <Pressable
                onPress={onAddToCart}
                style={({}) => [
                 styles.button,
                    {backgroundColor:'#3984d4ff'},
                        ]}>
                <Text id="textoBoton" style={styles.buttonText}>Añadir al carrito</Text>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    button:{
        padding:10,
        borderRadius:18,
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,
        shadowRadius:4,
        shadowColor:'#000000'
    },
    text: {
        color:'#00000',
        fontWeight:'bold',
        textAlign: 'center',
        marginTop:3,

    },
    card: {
        width: 200,              
        height: 300,               
        backgroundColor: '#fff',  
        borderRadius: 15,       
        padding: 10,                
        margin: 10,                  
    },
    image: {
        width: '75%',
        height: '50%',
        alignSelf: 'center',
        marginTop:15
    },
    buttonText: {
        color:'#ffffff'
    }
    
})