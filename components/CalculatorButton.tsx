import { Colors } from "@/constants/theme";
import { globalStyles } from "@/styles/global-styles";
import { Pressable, Text } from "react-native";

import * as Haptics from 'expo-haptics';

interface Props {
    label: string;
    color?: string;
    dobleSize?: boolean;
    blackText?: boolean;
    onPress?: () => void;
}


const CalculatorButton = ({ label, color = Colors.darkGray, dobleSize = false, blackText = false, onPress }: Props) => {
    return (
        <Pressable style={({ pressed }) => ({
            ...globalStyles.button,
            backgroundColor: color,
            opacity: pressed ? 0.7 : 1,
            width: dobleSize ? 180 : 80,
        })} onPress={() => {
            Haptics.selectionAsync();
            onPress && onPress();
        }}>
            <Text style={{ ...globalStyles.buttonText, color: blackText ? 'black' : 'white' }}>
                {label}
            </Text>
        </Pressable>
    )
}

export default CalculatorButton 