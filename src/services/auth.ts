const delay = (amount = 750) =>
  new Promise(resolve => setTimeout(resolve, amount));

export async function recoverUserInformation() {
  await delay();

  return {
    user: {
      username: 'dodops',
      email: 'tridops@gmail.com',
      createdAt: '12/02/2024',
      vip: true
    }
  };
}
