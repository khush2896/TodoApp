import configuration from './../../config/config.json';

export default () => {
    if (process.env.NODE_ENV === 'dev') {
        return {
            PORT: process.env.PORT || configuration.port.dev,
            dbUrl: configuration.db.dev
        };
    } else if (process.env.NODE_ENV === 'prod') {
        return {
            PORT: process.env.PORT || configuration.port.prod,
            dbUrl: configuration.db.prod
        };
    } else if (process.env.NODE_ENV === 'test') {
        return {
            PORT: process.env.PORT || configuration.port.test,
            dbUrl: configuration.db.test
        };
    } else {
        console.log('no environment selected');
        throw new Error('Select an environment - prod or dev');
    }
};