module.exports = {
  apps: [
    {
      script: 'src/server.js',
      name: 'architecture-template',
      exec_mode: 'cluster',
      instances: 1,
      watch: true,
      error_file: 'pm2-logs/err.log',
      out_file: 'pm2-logs/out.log',
      log_file: 'pm2-logs/combined.log',
      time: true,
      ignore_watch: [
        'node_modules',
        'data',
        'out',
        '.data',
        'logs',
        'pm2-logs',
        'src/app/uploads',
      ],
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
