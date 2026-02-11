import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PartidaViewModel } from '../presentation/viewmodels/PartidaViewModel';

const GameScreen = observer(() => {
    const [viewModel] = useState(() => new PartidaViewModel());
    const router = useRouter();

    useEffect(() => {
        viewModel.conectar();
        return () => {
            viewModel.desconectar();
        };
    }, []);

    const handleVolverInicio = async () => {
        await viewModel.desconectar();
        router.replace('/');
    };

    const renderCasilla = (fila: number, columna: number) => {
        const valor = viewModel.partida.tablero.casillas[fila][columna];
        const colorSimbolo = valor === 'X' ? '#FF0000' : '#007AFF';
        
        return (
            <TouchableOpacity
                key={`${fila}-${columna}`}
                style={styles.casilla}
                onPress={() => viewModel.realizarJugada(fila, columna)}
                disabled={viewModel.partida.tablero.estado !== 'jugando'}
            >
                <Text style={[styles.simbolo, { color: colorSimbolo }]}>
                    {valor || ''}
                </Text>
            </TouchableOpacity>
        );
    };

    // Determinar si es un mensaje de desconexión
    const esMensajeDesconexion = viewModel.mensaje.toLowerCase().includes('desconectado');

    return (
        <View style={styles.container}>
            <Text style={[styles.mensaje, esMensajeDesconexion && styles.mensajeDesconexion]}>
                {viewModel.mensaje}
            </Text>
            
            <View style={styles.tablero}>
                {[0, 1, 2].map(fila => (
                    <View key={fila} style={styles.fila}>
                        {[0, 1, 2].map(columna => renderCasilla(fila, columna))}
                    </View>
                ))}
            </View>

            {viewModel.miSimbolo && (
                <Text style={styles.simboloJugador}>
                    Eres: {viewModel.miSimbolo}
                </Text>
            )}

            {viewModel.partida.tablero.estado === 'finalizado' && (
                <TouchableOpacity 
                    style={styles.buttonVolver}
                    onPress={handleVolverInicio}
                >
                    <Text style={styles.buttonText}>Volver al inicio</Text>
                </TouchableOpacity>
            )}
        </View>
    );
});

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    mensaje: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    mensajeDesconexion: {
        fontSize: 18,
        fontWeight: 'normal',
    },
    tablero: {
        borderWidth: 2,
        borderColor: '#000',
    },
    fila: {
        flexDirection: 'row',
    },
    casilla: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    simbolo: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    simboloJugador: {
        fontSize: 20,
        marginTop: 30,
        color: '#666',
    },
    buttonVolver: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});