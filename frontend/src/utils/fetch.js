import { get } from 'lodash';
// TODO src/utils ->fetch там 2 конст с 304 и 201, если статус ответа равен
// 304 или 201, тогда я возвращаю  не только респонс а еще этому репнос
// назначаю тру, или сексесс, а если другой ответ то отпет фолс.
// TODO есдли обертка вернула сексесс то тогда  юзер назначаем дата,
// а если нет то ставим статус гуест

// export default (args) => { alert(args); }

const SUCCESSUL_RATES = [200, 201, 304];
export default (url, options) => {
  const token = localStorage.getItem('token');
  const method = get(options, 'method', 'GET') // TODO посмотреть что это
  const baseOptions = {
    method,
    headers: {
      token,
      'Content-Type': 'application/json',
    },
  };

  let customFetchOptions;
  switch (method) {
    case 'GET':
      // TODO прочесть про GET параметры в HTTP запросах, дописать функционал, протестировать
      customFetchOptions = {};
      break;
    case 'POST':
      customFetchOptions = { body: options.params }; // options.params
      break;
    default:
      throw new Error(`No such HTTP method: ${method}`);
  }

  const fetchOptions = Object.assign({}, baseOptions, customFetchOptions)
  return fetch(url, fetchOptions)
    .then(async (resp) => {
      const data = await resp.json();

      if (SUCCESSUL_RATES.includes(resp.status)) {
        // return resp.json();
        return data;
      }

      throw data;
    })
}
