# Sample Next Application

This application uses [Next.js starter by GedasFX](https://github.com/GedasFX/nextjs-starter). For more details about the configuration, see the README there.

Live version of the application can be found at [here](https://sample-site.gedas.dev/).

## Quick-start

To start the development server, run command `yarn dev`.
To start the production server, you need to first build it with `yarn build`, and then run the server with `yarn start`.

For use with Docker, no additional configuration is needed. Simply build the container with `docker build . -t sample-next-app` and then run it with `docker run -p 3000:3000 sample-next-app`. For more information regarding the build process, look at the starter README.
