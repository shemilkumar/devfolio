/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://shemilkumar.vercel.app',
    generateRobotsTxt: true,

    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
};