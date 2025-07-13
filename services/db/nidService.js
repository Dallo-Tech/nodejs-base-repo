const db = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const crypto = require('crypto')

module.exports.createNID = async (nidData) => {
    const nid = await db.NID.create(nidData)
    return nid
};

module.exports.getNIDStatus = async (nidNumber) => {
    const nid = await db.NID.findOne({ where: { national_identity_number: nidNumber} })
    if (!nid) { 
        return 
    }
    return nid.card_status
};

module.exports.getUniqueNIDNumber = async () => {
    let unique = false;
    let candidateNIN = '';

    while (!unique) {
        candidateNIN = crypto.randomInt(100000000000, 999999999999).toString();
        const existing = await db.NID.findOne({
            where: { national_identity_number: candidateNIN },
        });

        if (!existing) {
            unique = true;
        }
    }

    return candidateNIN.toString();
};

module.exports.checkIsCitizenshipUnique = async (citizenship_number) => { 
    try { 
        const nid = await db.NID.findOne({where: { citizenship_number: citizenship_number }})
        if (nid) { 
            return false
        }
        return true 
    }
    catch (error) { 
        return false
    }
};

module.exports.getNID = async (nidNumber) => { 
    const nid = await db.NID.findOne({where: {national_identity_number: nidNumber}})
    return nid
};
module.exports.getNIDs = async () => { 
    const nids = await db.NID.findAll()
    return nids
}