// 伺服器端擷取鉅亨網財經頭條,回傳給前端(避開瀏覽器跨來源限制)
exports.handler = async function () {
  try {
    const r = await fetch(
      'https://api.cnyes.com/media/api/v1/newslist/category/headline?limit=10',
      { headers: { 'Accept': 'application/json' } }
    );
    if (!r.ok) {
      return { statusCode: r.status, headers: cors(), body: JSON.stringify({ error: 'upstream ' + r.status }) };
    }
    const data = await r.json();
    return {
      statusCode: 200,
      headers: { ...cors(), 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
      body: JSON.stringify(data)
    };
  } catch (e) {
    return { statusCode: 502, headers: cors(), body: JSON.stringify({ error: String(e) }) };
  }
};
function cors() {
  return { 'Access-Control-Allow-Origin': '*' };
}
