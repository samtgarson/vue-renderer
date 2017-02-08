import micro, { createError } from 'micro'
import parse from 'raw-body'
import pify from 'pify'
import morgan from 'morgan'
import json from 'morgan-json'
import createRenderer from './create-renderer'

const PORT = process.env.PORT || 5000

morgan.token('error', (req, res) => (res.error ? res.error : ''))
const format = json(':method :url :status :response-time ms :error')
const logger = pify(morgan(format))
const renderer = createRenderer()

const srv = micro(async (req, res) => {
  await logger(req, res)
  try {
    const body = await parse(req, { encoding: true })
    const render = await renderer
    return await render(body)
  } catch (err) {
    console.error(err)
    throw createError(500, err)
  }
})

srv.listen(PORT, () => console.log('Listening on port', PORT))
