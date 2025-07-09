const {Op} = require("sequelize");
exports.getDateBeforeXDay = (xDay) => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - xDay);
}

exports.getDateFilter = (fieldName,startDate,endDate) => {
    return {
        [fieldName]: {
            [Op.gt]: startDate,
            [Op.lt]: endDate,
        }
    }
}