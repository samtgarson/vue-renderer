# Vue Render
> Render your Vue templates

A basic microservice which pulls a bundle from S3 to render your Vue templates.

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![made with micro-starter](https://img.shields.io/badge/kit-micro--starter-3986fe.svg)](https://github.com/samtgarson/micro-starter)

## Usage

- `yarn dev` Run a development server which watches your files and restarts and builds when requires
- `yarn build` Build your code into a bundle
- `yarn start` Run the server

## Required Environment Variables

### For a bundle on AWS

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_BUCKET`
- `AWS_KEY` _name/path of the file in the bucket_

### For a local bundle

- `BUNDLE_PATH`

## Deploy with [Now](http://zeit.co/now)

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/samtgarson/vue-renderer&env=AWS_ACCESS_KEY_ID&env=AWS_SECRET_ACCESS_KEY&env=AWS_BUCKET&env=AWS_KEY&env=BUNDLE_PATH)

## Contribute

Take a look at [micro-starter](https://github.com/samtgarson/micro-starter) for the basics on setting up this application for development.
