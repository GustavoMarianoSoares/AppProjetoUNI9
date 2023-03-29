import React from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native'

import styles from './styles'

export function InputTexts({ placeholder, onChangeText, secureTextEntry, keyboardType }) {
    return (
        <View>
            <TextInput
                style={styles.inputStyle}
                placeholder={placeholder}
                placeholderTextColor="#616A6B"
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCorrect={false}
            />
        </View>
    )
}