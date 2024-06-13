import React, { useState } from "react";
import {
  View,
  Input,
  Label,
  YStack,
  XStack,
  Button,
  Paragraph,
  Heading,
  Image,
} from "tamagui";
import { ArrowRight, Eye, EyeOff } from "@tamagui/lucide-icons";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const NUFOGY_LOGO_PATH = "@assets/images/nufogy_logo.png";

  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <View>
      <YStack>
        <Heading>Crear una cuenta</Heading>
        <Image
          source={{
            uri: NUFOGY_LOGO_PATH,
            width: 200,
            height: 200,
          }}
        />
      </YStack>

      <YStack>
        <Label>Email</Label>
        <Input value={email} onChangeText={setEmail} placeholder="Email" />
      </YStack>

      <YStack>
        <Label>Password</Label>
        <XStack>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <Eye />
        </XStack>
      </YStack>

      <Button onPress={handleLogin} iconAfter={ArrowRight}>
        Iniciar Sesión
      </Button>

      <YStack>
        <Button>¿Olvidaste tu contraseña?</Button>
        <YStack>
          <Label>Iniciar con</Label>
          <Button>Google</Button>
        </YStack>
        <Paragraph>
          Al continuar, aceptas nuestros Términos de Servicio y Política de
          Privacidad
        </Paragraph>
        <XStack>
          <Label>¿No tienes una cuenta?</Label>
          <Button>Regístrate</Button>
        </XStack>
      </YStack>
    </View>
  );
};

export default RegisterScreen;
