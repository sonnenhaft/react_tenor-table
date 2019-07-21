module.exports = ({ config }) => {
    config.module.rules.push({ test: /\.(ts|tsx)$/, loader: 'babel-loader' });
    config.resolve.modules.push(require('path').resolve(__dirname, '../src/'));
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
