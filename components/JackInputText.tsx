import { View, Text, XStack, Input, Button, Form } from 'tamagui'
import React from 'react'
import { Send } from '@tamagui/lucide-icons'
import { colors } from 'globalStyles'

export interface Props  {
  setPrompt: React.Dispatch<React.SetStateAction<string>>
}

export default function JackInputText({ setPrompt }: Props) {
  return (
    <XStack w={"100%"} h={72} bg={colors.background.accent} borderRadius={16}>
        <Input color={colors.text.main}/>
        <Form.Trigger asChild>

        <Button h={32} w={32} bg={colors.primary}>
            <Send color={colors.text.main}/>
        </Button>
        </Form.Trigger>
    </XStack>
  )
}