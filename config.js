module.exports = function(){
    var port = 1349;

    switch(process.env.NODE_ENV){
        default:
            return {
                env: 'local',
                hostname: process.env.HOSTNAME,
                web: {
                    port: port,
                    host: 'https://localhost:' + port
                },
                db : {
                    host: 'localhost',
                    database: 'college',
                    port: '27017'
                }
            }
    }
};