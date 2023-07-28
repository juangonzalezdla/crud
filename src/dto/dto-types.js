import { Type } from '@sinclair/typebox';

export const idDTOSchema = Type.String({
  format: 'uuid',
  errorMessage: {
    Type: 'El tipo de _id no es válido, debe ser un string',
    format: 'El formato de _id no es válido, debe ser un uuid4'
  }
});

export const nameDTOSchema = Type.String({
  minLength: 2,
  maxLength: 20,
  errorMessage: {
    minLength: 'El nombre debe tener mínimo 2 caracteres de longitud',
    maxLength: 'El nombre debe tener máximo 20 caracteres de longitud'
  }
});

export const lastNameDTOSchema = Type.String({
  minLength: 4,
  maxLength: 50,
  errorMessage: {
    minLength: 'El apellido debe tener mínimo 4 caracteres de longitud',
    maxLength: 'El apellido debe tener máximo 50 caracteres de longitud'
  }
});

export const emailDTOSchema = Type.String({
  format: 'email',
  errorMessage: {
    Type: 'El tipo de email no es válido, debe ser un String',
    format: 'El formato de email no es válido, debe cumplir el RFC 5322'
  }
});

export const passwordDTOSchema = Type.String({
  format: 'password',
  minLength: 10,
  maxLength: 25,
  errorMessage: {
    Type: 'El tipo de la contraseña no es válido, debe ser un String',
    format: 'El formato de la contraseña no es válido, debe contener mínimo: Una mayúscula, una minúscula y un número',
    minLength: 'Contraseña debe tener mínimo 10 caracteres de longitud',
    maxLength: 'Contraseña debe tener máximo 25 caracteres de longitud'
  }
});