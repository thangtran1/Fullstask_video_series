'use strict';
const {
    Model,
    BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {  // 1Allcode -> nUser
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' })


            Allcode.hasMany(models.Docter_Infor, { foreignKey: 'priceId', as: 'priceTypeData' })
            Allcode.hasMany(models.Docter_Infor, { foreignKey: 'provinceId', as: 'provinceTypeData' })
            Allcode.hasMany(models.Docter_Infor, { foreignKey: 'paymentId', as: 'paymentTypeData' })

            // define association here
        }
    }
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};