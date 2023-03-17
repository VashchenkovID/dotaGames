function handleSessionEnd() {
  localStorage.setItem('login', 'user');
  location.href = '/';
}

export async function interceptResponse(apiResult: any) {
  if (
    apiResult.status !== 200 &&
    apiResult.status !== 201 &&
    apiResult.status !== 401
  ) {
    if (apiResult.body?.message) {
      return console.error(apiResult.body?.message);
    }

    // let headerText = `Ошибка с кодом ${apiResult.status}! `;
    // let description = '';
    // let extra = '';
    // if (apiResult.status === 400) {
    //   headerText = 'Ошибка на странице';
    //   description = 'Некорректный запрос серверу. ';
    //   extra = 'Обновите страницу позже.';
    // }

    // if (apiResult.status === 403) {
    //   headerText = 'Доступ запрещен';
    //   description = 'У вас нет прав для просмотра страницы.';
    //   extra = 'Обратитесь к администратору для получения прав.';
    // }
    //
    // if (apiResult.status === 404) {
    //   headerText = 'Страница не найдена';
    //   description =
    //     'В адресе есть ошибка или сервер не может найти данные по запросу.';
    // }

    // if (apiResult.status === 500) {
    //   headerText = 'Сервер недоступен';
    //   description = 'Сервер не может обработать запрос. Обновите страницу.';
    //   extra = 'Обновите страницу.';
    // }

    // toast.error(
    //   <div>
    //     <Text weight="semibold" style={{ color: '#FAFAFA' }}>
    //       {headerText}
    //     </Text>
    //     <Text style={{ color: '#FAFAFA' }}>{description}</Text>
    //     {extra && <Text style={{ color: '#FAFAFA' }}>{extra}</Text>}
    //   </div>,
    // );
  }
  if (apiResult.status === 401) {
    handleSessionEnd();
    return new Promise(() => {});
  }
}
