require('dotenv').config({ path: '.env.deploy', override: true });

module.exports = {
  apps : [{
    name: 'frontend-service',
    script: 'serve -s build'
  }],
  
  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: process.env.DEPLOY_REF,
      repo: process.env.REPO_URL,
      path: process.env.DEPLOY_PATH,
      'pre-deploy': `scp ./frontend/*.env ${process.env.DEPLOY_USER}@${process.env.DEPLOY_HOST}:${process.env.DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build && pm2 restart ecosystem.config.js',
    }
  }
}
