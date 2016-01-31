import Device from './device'
import Reading from './device-reading'

Reading.belongsTo(Device);
Device.hasMany(Reading);

export default (app) => {
    let io = app.get('io');
    Reading.hook('afterCreate', function(reading, options) {
        return io.emit('reading', reading);
    });
}

