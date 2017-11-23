// TODO src/utils ->fetch там 2 конст с 304 и 201, если статус ответа равен
// 304 или 201, тогда я возвращаю  не только респонс а еще этому репнос
// назначаю тру, или сексесс, а если другой ответ то отпет фолс.
// TODO есдли обертка вернула сексесс то тогда  юзер назначаем дата,
// а если нет то ставим статус гуест

// export default (args) => { alert(args); }

const FAIL = false;
const SUCCESS = true;

function fetch(token) {
  fetch('http://localhost:3000/api/users/me', {
    method: 'GET',
    headers: { token, 'Content-Type': 'application/json' },
  }).then((resp) => {
    if (resp.status === 304) {
      resp.json().then((data) => {
        return {
          status: SUCCESS,
          user: data,
        }
      });
    }
    return { FAIL };
  });
}

exports.default = fetch;

module.exports = exports['default'];
