export const devBackEndURL = `http://localhost:8080/api`;
export const prodBackEndURL = '';
const ENV = {
    dev: {
        apiUrl: devBackEndURL,
        localization: {
            defaultResourceName: 'MLVT',
        },
    },
    prod: {
        apiUrl: prodBackEndURL,
        localization: {
            defaultResourceName: 'MLVT',
        },
    },
};

export const getEnvVars = () => {
    return import.meta.env.MODE === 'development' ? ENV.dev : ENV.prod;
};
