import path from 'path';
import express from 'express';
import webpack from 'webpack';
import proxy from 'http-proxy-middleware';

const app = express();

const config = require('./webpack.config.dev');
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.resolve(__dirname, 'src')));

const apiProxy = proxy({ target: 'http://localhost:3010' });
app.use('/graphql', apiProxy);
app.use('/graphiql', apiProxy);

app.get('*', (req, res) => {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message);
		} else if(redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if(renderProps) {
      res.status(200).send(`
        <!doctype html>
        <html>
          <header>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </header>
          <body>
            <div id="app"></div>
            <script src="/bundle.js"></script>
          </body>
        </html>
      `);
    }
    else {
      res.status(404).send('Not found');
    }
  });
});

app.listen(3000, '0.0.0.0', (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info('Listening at http://localhost:3000');
	}
});
