import Device from '../models/device'
import Reading from '../models/device-reading'

let RegisterDevice = (req,res) => {

    console.log({body:req.body,headers:req.headers});
    let { id, temp, status, locationLAT, locationLONG, ip } = req.body;
    Device.findOrCreate({where: {uid:id}, defaults: {uid:id,meta:{ip,locationLAT,locationLONG}}})
        .then((device)=>{


            let done = () => {
                res.json({body:req.body,headers:req.headers});
            };

            Reading.create({
                temp,
                device:device
            }).then(done).catch((err)=>{
                res.status(500).json({error:err});
            });;


            //device.status = status;
            //device.save();



    }).catch((err)=>{
            res.status(500).json({error:err});
        });

};

export default RegisterDevice;