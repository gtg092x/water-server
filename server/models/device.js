import sequelize from '../db'
import Sequelize from 'sequelize'

export default sequelize.define('device', {
    uid: {
        type:Sequelize.STRING,
        unique: true
    },
    status: Sequelize.STRING,
    meta: Sequelize.JSON()
});