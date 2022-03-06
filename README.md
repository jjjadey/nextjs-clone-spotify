# Next.js + Tailwind CSS Example

This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

## About Spotify Clone

Project Tutorial: [build Spotify 2.0 with NEXT.JS 12.0](https://www.youtube.com/watch?v=3xrko3GpYoU&list=LL&index=12&t=5989s)

* Nextjs12
* React
* Debounce
* Tailwind css
* Spotify api
* Oauth jwt
* Access/refesh token
* NextAuth
* Recoil

## Setup Project with Spotify API

1. Go to [Spotify for developer](https://developer.spotify.com/)
2. Click `Dashboard` then `log in`
3. Click `Create an app`
4. Copy file .`env.local.sample` and rename to `.env.local`
5. Copy value from Spotify app that you create in 3. and Fill in `.env.local`

```
NEXT_PUBLIC_CLIENT_ID = Client ID
NEXT_PUBLIC_CLIENT_SECRET = click show client secret and copy it
```

6\. Click `Edit Settings` in your Spotify app. Then add Redirect URIs `http://localhost:3000/api/auth/callback/spotify`

Note: 
- `JWT_SECRET` is your some super secret value
- `spotifyApi.play` can use only Spotify Premium 


## Run project
1. `npm i`
2. `npm run dev`

## Preview

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

``` bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
# or
yarn create next-app --example with-tailwindcss with-tailwindcss-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
