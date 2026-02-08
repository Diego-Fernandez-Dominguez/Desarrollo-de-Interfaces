import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{ title: 'Bienvenido' }}
            />
            <Stack.Screen 
                name="game" 
                options={{ title: 'Tres en Raya' }}
            />
        </Stack>
    );
}