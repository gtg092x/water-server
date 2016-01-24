import Device from '../models/device'
import Reading from '../models/device-reading'

let ListReadings = (req,res) => {

    Reading.findAll({order:'"createdAt" DESC', limit: 10}).then((readings)=>{
        res.json({readings:readings});
    }).catch((err)=>{
        res.status(500).json({error:err});
    });

};

export default ListReadings;