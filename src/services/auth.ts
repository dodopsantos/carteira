type SignInRequestData = {
  email: string
  password: string;
  remember: boolean;
}

const delay = (amount = 750) => new Promise((resolve) => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestData) {
  await delay()

  return {
    token: '123123h131g31g3j1g3j1g311',
    user: {
      name: 'Douglas Prado dos Santos',
      email: 'tridops@gmail.com',
      avatar_url: 'https://github.com/dodopsantos.png',
    }
  }
}

export async function recoverUserInformation() {
  await delay()

  return {
    user: {
      name: 'Douglas Prado dos Santos',
      email: 'tridops@gmail.com',
      avatar_url: 'https://github.com/dodopsantos.png',
    }
  }
}
