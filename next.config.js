const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.mode = 'development';
      config.optimization.minimize = false;
    } else {
      config.mode = 'production';
      config.optimization.minimize = true;
    }

    return config;
  }
}