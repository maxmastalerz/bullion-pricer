require('@babel/register')({
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
});

require.extensions['.png'] = function () {
    return null;
};
require.extensions['.jpg'] = function () {
    return null;
};

const routes = require('./src/Router').routes;
const Sitemap = require('react-router-sitemap').default;

const filterConfig = {
    isValid: false,
    rules: [
        /\*/,
    ],
};

let sitemap = new Sitemap(routes)
        .filterPaths(filterConfig)
        .build('https://bullionpricer.com');

for (let i = 0; i < sitemap.sitemaps[0].urls.length; i++) {
    let site = sitemap.sitemaps[0].urls[i];
    if(['/','/about'].includes(site.url)) {
        site.changefreq =  'daily';
        site.priority = 0.8;
    } else {
        site.changefreq =  'weekly';
        site.priority = 0.6;
    }
}

sitemap.save('./public/sitemap.xml')
