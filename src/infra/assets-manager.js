import PATH from 'path';

import express from 'express';

import baseManager from './base-manager';

const assetsManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app) {
        app.use(express.static(path.join(__dirname, '../../dist')))
    }
});

export default assetsManager;