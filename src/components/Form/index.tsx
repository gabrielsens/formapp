import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import ControlledInput from '../ControlledInput';
import { Container } from './styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  user: string;
  mail: string;
  password: string;
  passwordConfirm: string;
}

const schema = yup.object({
  user: yup.string().required("Informe seu nome"),
  mail: yup.string().email("E-mail inválido").required("Informe um email"),
  password: yup.string().min(6, "A senha deve ter ao menos 6 dígitos").required("Senha é requerida"),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), undefined], 'A senha de confirmação não confere').required('Confirmação de senha requerida')
});

export function Form() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  function handleUserRegister(data: FormData) {
    console.log(data)

  }

  return (
    <Container>
      <ControlledInput
        name='user'
        control={control}
        icon="user"
        placeholder="Nome"
        error={errors.user}
      />
      <ControlledInput
        name="mail"
        control={control}
        icon="mail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
        error={errors.mail}
      />
      <ControlledInput
        name="password"
        control={control}
        icon="lock"
        placeholder="Senha"
        secureTextEntry
        error={errors.password}
      />
      <ControlledInput
        name="passwordConfirm"
        control={control}
        icon="lock"
        placeholder="Confirme a senha"
        secureTextEntry
        error={errors.passwordConfirm}
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(handleUserRegister)}
      />
    </Container>
  )
}