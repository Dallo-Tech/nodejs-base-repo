const express = require('express');
const db = require('../../../models');
const router = express.Router();

// {
//     "name": "Aagaman Luitel",
//     "dob": "2000-01-01",
//     "address": "naikap",
//     "district": "Kathmandu",
//     "mun": "nagarjun",
//     "gender": "male",
//     "phone": "9849598873",
//     "citizenship": "2022-4698-1293"
// }
// 
// async function createTestUser(nid) {
//   const testDate = new Date("December 17, 1995 03:24:00");

//   const testUser = await nid.create({
//     username: "testuser",
//     dob: testDate,
//     address: "Naikap",
//     district: "Kathmandu",
//     municipality: "Nagarjun",
//     gender: "male",
//     phone: 9849598873,
//     citizenship: "2022-4698-293-1293"
//   })
//   await nid.sync()
//   await testUser.save()
// }

// createTestUser(db.Nid)


class NidUser {
  // dbinstance and json field
  constructor(dbInstance, field) {
    // name, dob, addres, district, mun, gender, phone, citizenship
    this.db = dbInstance,
      this.name = field.name,
      // do is string so parsing it to proper date
      this.dob = new Date(field.dob),
      this.address = field.address,
      this.district = field.district,
      this.mun = field.mun,
      this.gender = field.gender,
      this.phone = field.phone,
      this.citizenship = field.citizenship
  }
  async save() {
    await this.db.sync()
    const info = await this.db.create({
      username: this.name,
      dob: this.dob,
      address: this.address,
      district: this.district,
      mun: this.mun,
      phone: this.phone,
      gender: this.gender,
      citizenship: this.citizenship
    })
    await info.save().then((x) => {
      console.log("saved in db", x)
    })
  }
}

router.post("/", async (req, res, next) => {
  const body = req.body
  if (!body.name || !body.dob || !body.address || !body.phone
    || !body.district || !body.mun || !body.citizenship || !body.gender) {
    res.status(400).send("please specify all fields")
    return;
  }
  const user = new NidUser(db.Nid, body)

  await user.save().catch((e) => {
    res.status(401).send("failed to saved information, possibly duplicate values")
  }).then(() => {
    res.status(200).send("saved information")
  })
})

router.get("/", async (req, res, next) => {

})

module.exports = { router }
