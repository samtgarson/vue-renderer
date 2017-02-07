import { createBundleRenderer } from 'vue-server-renderer'
import micro, { createError } from 'micro'
import parse from 'raw-body'
import pify from 'pify'
import morgan from 'morgan'
import json from 'morgan-json'
import AWS from 'aws-sdk'

const PORT = process.env.PORT || 5000

morgan.token('error', (req, res) => (res.error ? res.error : ''))
const format = json(':method :url :status :response-time ms :error')
const logger = pify(morgan(format))

const s3 = new AWS.S3()
const createRenderer = new Promise(async (resolve, reject) => {
  const data = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: process.env.AWS_KEY
  }).promise()

  const bundleRenderer = createBundleRenderer(data.Body.toString())
  const renderToString = pify(bundleRenderer.renderToString)
  return resolve(async html => renderToString({ body: html }))
})

const srv = micro(async (req, res) => {
  await logger(req, res)
  try {
    const body = await parse(req, { encoding: true })
    const render = await createRenderer
    return await render(body)
  } catch (err) {
    console.error(err)
    throw createError(500, err)
  }
})

srv.listen(PORT, () => console.log('Listening on port', PORT))
