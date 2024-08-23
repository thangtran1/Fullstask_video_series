'use strict';
const {
    Model,
    BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Docter_Infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Docter_Infor.belongsTo(models.User, { foreignKey: 'docterId' })

            Docter_Infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData' });
            Docter_Infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData' });
            Docter_Infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData' });

        }
    }


    Docter_Infor.init({
        docterId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,


        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Docter_Infor',
        freezeTableName: true
    });
    return Docter_Infor;
};