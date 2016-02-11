var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

let Alarm = (req,res) => {

    let { max, phone } = req.body;

    //Send an SMS text message
    client.sendMessage({

        to:`+1${phone}`,
        from: `+1${process.env.TWILIO_FROM}`, // A number you bought from Twilio and can use for outbound communication
        body: `Warning! Your water is hotter than ${max} degrees.` // body of the SMS message

    }, function(err, responseData) { //this function is executed when a response is received from Twilio

        if (!err) { // "err" is an error received during the request, if any

            res.json({body:req.body,headers:req.headers,responseData});

        } else {

            res.status(500).json({body:req.body,headers:req.headers,err});
        }
    });



};

export default Alarm;