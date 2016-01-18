import Device from './device'
import Reading from './device-reading'

Reading.belongsTo(Device);
Device.hasMany(Reading);