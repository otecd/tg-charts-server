const http = require('http');
const url = require('url');
const querystring = require('querystring');
const dataSource = require('./chart_data.json');

http.createServer((req, res) => {
  let code;
  const urlParsed = url.parse(req.url);
  let resData;

  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		res.end();
		return;
  }

  if (urlParsed.pathname === '/chart_data.json') {
    code = 200;
    resData = {
      code,
      message: 'success',
      data: dataSource[querystring.parse(urlParsed.query).n],
    };
  } else {
    code = 404;
    resData = {
      code,
      message: 'not found',
    };
  }

  res.writeHead(code, { 'Content-Type': 'text/json' });
  res.end(JSON.stringify(resData));
}).listen(process.env.PORT || 1234);
