// module.exports = {
//   apps : [{
//     name   : "PM2-Node",
//     script : "npm",
//     args   : "start",
//   }]
// }


module.exports = {
  apps: [
    {
      name: "PM2-Node",
      script: "npm",
      args: "start",
      watch: ["src"],
      interpreter: "none",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    }
  ]
}
