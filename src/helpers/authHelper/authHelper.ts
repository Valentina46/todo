export const authenticateUser = async (username: string, password: string): Promise<boolean> => {
  // Здесь вы можете заменить этот код на ваш запрос к бэкенду.
  return new Promise((resolve) => {
      setTimeout(() => {
          // Эмуляция аутентификации
          if (username === 'admin' && password === 'admin') {
              resolve(true);
          } else {
              resolve(false);
          }
      }, 1000); // Эмуляция время ожидания при обработке запроса
  });
};