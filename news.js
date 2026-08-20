// 伺服器端擷取鉅亨網財經頭條(帶瀏覽器標頭,避免被擋)
exports.handler = async function () {
  try {
    const r = await fetch(
      'https://api.cnyes.com/media/api/v1/newslist/category/headline?limit=10',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
          'Origin': 'https://news.cnyes.com',
          'Referer': 'https://news.cnyes.com/'
        }
      }
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
}
function cors() { return { 'Access-Control-Allow-Origin': '*' }; }
