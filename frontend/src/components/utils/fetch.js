// TODO src/utils ->fetch там 2 конст с 304 и 201, если статус ответа равен
// 304 или 201, тогда я возвращаю  не только респонс а еще этому репнос
// назначаю тру, или сексесс, а если другой ответ то отпет фолс.
// TODO есдли обертка вернула сексесс то тогда  юзер назначаем дата,
// а если нет то ставим статус гуест

// export default (args) => { alert(args); }


const SUCCESS = true;
const FAILURE = false;
const SUCCESSUL_RATES = [200, 201, 304];

export default () => {
  const token = localStorage.getItem('token');
  return fetch('http://localhost:3000/api/users/me', {
    method: 'GET',
    headers: { token, 'Content-Type': 'application/json' },
  }).then((resp) => {
    if (SUCCESSUL_RATES.includes(resp.status)) {
      return resp.json();
    }
    return { status: FAILURE };
  });
}

// TODO Secsessful sattes 200 201 204
