import { createBundleRenderer } from 'vue-server-renderer'
import pify from 'pify'
import AWS from 'aws-sdk'

const s3 = new AWS.S3()

export default () => new Promise(async resolve => {
  const data = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: process.env.AWS_KEY
  }).promise()

  const bundleRenderer = createBundleRenderer(data.Body.toString())
  const renderToString = pify(bundleRenderer.renderToString)
  return resolve(async html => renderToString({ body: html }))
})
