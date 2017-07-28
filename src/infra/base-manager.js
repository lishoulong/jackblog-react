const baseManager = {
    handle(app) {
        this.configureCommon(app);

        if(process.env.NODE_ENV === 'development') {
            this.configureDevelopmentEnv(app);
        } else {
            this.configureProductionEnv(app);            
        }
    },

    configureCommon(/*app*/) {},

    configureProductionEnv(/*app*/) {},

    configureDevelopmentEnv(/*app*/) {}    
};

export default baseManager;
