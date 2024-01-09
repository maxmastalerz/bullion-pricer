#!/bin/sh

# I had to place the sitemap build here as generating it in the image just had it overwritten by our local mount on the react folder.
npm run build-sitemap

npm run start