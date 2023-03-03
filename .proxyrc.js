// Headers set for the Parcel dev server
module.exports = function(app) {
    app.use((req, res, next) => {
        res.setHeader('Content-Security-Policy', "default-src 'self';upgrade-insecure-requests")
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.setHeader('Strict-Transport-Security', 'max-age=31636000; includeSubDomains')
        res.setHeader('Referrer-Policy', 'no-referrer')
        next();
    });
}