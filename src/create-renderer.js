import { createBundleRenderer } from 'vue-server-renderer'
import pify from 'pify'
import { readFile } from 'fs-promise'
import AWS from 'aws-sdk'

const { AWS_BUCKET: Bucket, AWS_KEY: Key, BUNDLE_PATH: bundlePath } = process.env
const s3Enabled = Bucket && Key
let s3
if (!s3Enabled && !bundlePath) throw new Error('Provide either path to bundle or AWS config')
if (s3Enabled) s3 = new AWS.S3()

export default () => new Promise(async resolve => {
  let bundle

  if (s3Enabled) {
    const data = await s3.getObject({ Bucket, Key }).promise()
    bundle = data.Body.toString()
    if (Key.endsWith('json')) bundle = JSON.parse(bundle)
  } else {
    const file = await readFile(bundlePath)
    bundle = file.toString()
    if (bundlePath.endsWith('json')) bundle = JSON.parse(bundle)
  }

  const bundleRenderer = createBundleRenderer(bundle)
  const renderToString = pify(bundleRenderer.renderToString)
  return resolve(async context => renderToString(context))
})
