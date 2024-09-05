import React, { useState } from "react";

import {
  Button,
  Form,
  H4,
  Paragraph,
  View,
  XStack,
} from "tamagui";


import { colors } from "globalStyles";
import JackInputText from "@components/JackInputText";
import { ArrowLeft, Bot } from "@tamagui/lucide-icons";
import axios from "axios";
import { useSession } from "@providers/AuthContext";
import { useRouter } from "expo-router";

export type Props = {};

export default function TalkJackView({}: Props) {
  const router = useRouter()
  const { session } = useSession();
  const [prompt, setPrompt] = useState("");
  const [jackResponse, setJackResponse] = useState("")
  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/jack/askJack/`;

 

  async function handleSubmit() {
    try {

      const response = await axios.post(apiEndpoint, { prompt }, {
        headers: {
          Authorization: `Token ${session}`
        }
      })
      
      if (response.status === 200) {

        const jackResponse = response.data.response;
        setJackResponse(jackResponse)
      }
      
      
    } catch (e) {
      console.error(e)
    } 

  }

  return (
    <Form onSubmit={handleSubmit} flex={1} px={"$4"} bg={colors.background.main}>
        {/* Header */}
        
        <XStack ai={"center"} jc={"flex-start"}>
          <Button onPress={() => router.back()}>
          <ArrowLeft color={colors.text.main}/>
          </Button>
          <H4 color={colors.text.main}>Jack</H4>
          <Bot color={colors.text.main} />
        </XStack>
        {/* Jack Response */}
        <View>
          <Paragraph>
            {jackResponse}
          </Paragraph>
        </View>
      
      <JackInputText setPrompt={setPrompt}/>
    </Form>
  );
}
