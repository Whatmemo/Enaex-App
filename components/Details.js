import { Button, View, Text } from 'react-native';
import AppBar from './AppBar'

export default function DetailsScreen({ navigation }) {
    return (
        <>
            <AppBar />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() => navigation.push('Details')}
                />
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <Button title="Go back" onPress={() => navigation.goBack()} />
            </View>
        </>
    )
}