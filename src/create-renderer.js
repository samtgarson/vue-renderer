import { createBundleRenderer } from 'vue-server-renderer'
import pify from 'pify'
import { readFile } from 'fs-promise'
import AWS from 'aws-sdk'

const s3Enabled = process.env.AWS_BUCKET && process.env.AWS_KEY
if (!s3Enabled && !process.env.BUNDLE_PATH) throw 'Provide either path to bundle or AWS config'
if (s3Enabled) const s3 = new AWS.S3()

export default () => new Promise(async resolve => {
  if (s3Enabled) {
    const data = await s3.getObject({
      Bucket: process.env.AWS_BUCKET,
      Key: process.env.AWS_KEY
    }).promise()
    let bundle = data.Body.toString()
    if (process.env.AWS_KEY.endsWith('json')) bundle = JSON.parse(bundle)
  } else {
    let bundle = const file = await readFile(process.env.BUNDLE_PATH)
    if (process.env.BUNDLE_PATH.endsWith('json')) bundle = JSON.parse(bundle)
  }

  const bundleRenderer = createBundleRenderer(bundle)
  const renderToString = pify(bundleRenderer.renderToString)
  return resolve(async context => renderToString(context))
})
