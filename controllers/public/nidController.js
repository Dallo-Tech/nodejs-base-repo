const catchAsync = require("../../utils/catchAsync");
const service = require("../../services/db/nidService")

module.exports.createNID = async (req, res) => {
    const nidData = req.body

    // validate if unique citizenship id 
    const { citizenship_number } = nidData
    const isCitizenshipUnique = await service.checkIsCitizenshipUnique(citizenship_number)
    if (!isCitizenshipUnique) {
        return res.status(400).send({ error: "NID with associated citizenship already exisits" })
    }

    // saving nid form in database
    const nidCreation = await service.createNID(nidData)

    // returning creaetd nid 
    return res.status(201).send({ message: "NID created successfully" })
}

module.exports.getNIDInfo = catchAsync(async (req, res) => {
    const { nidNumber } = req.params

    if (!nidNumber) {
        return res.status(400).send({ error: "NID Number is required" })
    }
    const nid = await service.getNID(nidNumber)
    return res.json({ nid })
})

module.exports.getNIDStatus = catchAsync(async (req, res) => {
    const { nidNumber } = req.params
    if (!nidNumber) {
        return res.status(400).send({ error: "nidNumber is required" })
    }
    const status = await service.getNIDStatus(nidNumber)
    return res.status(200).send({ status })
})

module.exports.getAllNID = catchAsync(async (req, res) => { 
    const nids = await service.getNIDs()
    return {nids}
})