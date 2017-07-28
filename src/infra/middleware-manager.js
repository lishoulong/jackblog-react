import baseManager from './base-manager';

const middlewareManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app) {
        // to allow caching in-browser (mostly for libs), but still not to cache dev. files
        app.use((req, res, next) => {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            next();
        });
    }
});

export default middlewareManager;