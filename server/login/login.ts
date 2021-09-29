import { Request } from 'express';


interface User {
  email: string;
  password: string;
}

type LoginResponse = {
  errorMessage: string;
} | {
  message: string;
  user: Express.User | undefined;
}

async function login(req: Request): Promise<LoginResponse> {
  const user: User = req.body;

  if (!userValidation(user)) {
    return {
      errorMessage: 'Некорректный ввод email или пароль',
    };
  }

  return {
    message: 'Успешная регистрация',
    user: req.user
  };
}

function userValidation({ email, password }: User): boolean {
  const emailRegExp: RegExp = /^[a-z\d]+@[a-z]+\.[a-z]+$/i;
  const passRegExp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z\d]{8}$/;

  return emailRegExp.test(email) && passRegExp.test(password);
}

export { login };
