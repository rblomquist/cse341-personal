const mongodb = require("../db/connect");

const getAll = async (req, res) => {
    const result = await mongodb
      .getDb()
      .db()
      .collection('Tyranids')
      .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

  const addList = async (req, res) => {
    const army = {
      hiveFleet: req.body.hiveFleet,
      adaptive: req.body.adaptive,
      nullForceOrg: req.body.nullForceOrg,
      hq: req.body.hq,
      troop: req.body.troop
    }
    const result = await mongodb
      .getDb()
      .db()
      .collection("Tyranids")
      .insertOne(army)
      if (result.acknowledged) {
        res.status(201).json(army);
      } else {
        res.status(500).json(result.error || 'Some error occurred while creating the contact.');
      }
    };
  

module.exports = { getAll, addList };