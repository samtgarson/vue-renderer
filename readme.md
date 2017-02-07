# Vue Renderer
> Render your Vue templates

A basic microservice which pulls a bundle from S3 to render your Vue templates.

## Usage

- `yarn dev` Run a development server which watches your files and restarts and builds when requires
- `yarn build` Build your code into a bundle
- `yarn start` Run the server

## Required Environment Variables

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_BUCKET`
- `AWS_KEY` _name of the file in the bucket_

