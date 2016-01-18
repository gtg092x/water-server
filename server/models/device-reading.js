import sequelize from '../db'
import Sequelize from 'sequelize'

export default sequelize.define('reading', {
    temp: Sequelize.FLOAT
});