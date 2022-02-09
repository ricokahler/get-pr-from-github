const fetch = require('node-fetch');

/**
 *
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async function handler(req, res) {
  const pr = req?.query?.pr;
  if (!pr) {
    res.statusCode = 400;
    res.send();
    return;
  }

  const response = await fetch(
    `https://api.github.com/repos/sanity-io/sanity/pulls/${pr}`,
    {
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    },
  );
  if (!response.ok) {
    console.error(await response.text());
    res.statusCode = 500;
    res.send();
  }

  const data = await response.json();

  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(data));
};
