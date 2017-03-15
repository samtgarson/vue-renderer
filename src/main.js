import micro, { sendError } from 'micro'
import parseBody from 'raw-body'
import pify from 'pify'
import morgan from 'morgan'
import json from 'morgan-json'
import { parse as parseUrl } from 'url'
import createRenderer from './create-renderer'

const PORT = process.env.PORT || 5000

morgan.token('error', (req, res) => (res.error ? res.error.toString() : ''))
const format = json(':method :url :status :response-time ms :error')
const logger = pify(morgan(format))
const renderer = createRenderer()

const srv = micro(async (req, res) => {
  await logger(req, res)
  try {
    const body = await parseBody(req, { encoding: true })
    const render = await renderer
    return await render({ body, path: parseUrl(req.url).path })
  } catch (err) {
    res.error = err
    sendError(req, res, err)
  }
})

srv.listen(PORT, () => console.log('Listening on port', PORT))
