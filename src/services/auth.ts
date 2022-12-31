const delay = (amount = 750) =>
  new Promise(resolve => setTimeout(resolve, amount));

export async function recoverUserInformation() {
  await delay();

  return {
    user: {
      username: 'Douglas Prado dos Santos'
    }
  };
}
