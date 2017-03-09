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
                },
                mail:{
                    sender_email: 'thumphries5@gmail.com',
                    receiver_email: 'thumphries5@hotmail.com',
                    it_admin: 'tim.humphries@hpe.com',
                    userEmail: 'thumphries5@gmail.com',
                    password: 'lot.joy-31'
                }
            }
    }
};