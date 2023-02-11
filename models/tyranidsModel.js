const { response } = require("express");
const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('Tyranids')
    .find()
    .toArray().then(( err, lists) => {
      if(err) {
        res.status(500).json(err);
      }
    res.status(200).json(lists);
  });
};

  const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use valid contact ID to find your army")
    };
    const userId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection("Tyranids")
      .find({ _id: userId })
      .toArray().then((err, lists) => {
        if (err) {
          res.status(500).json(err);
        }
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
    const response = await mongodb
      .getDb()
      .db()
      .collection("Tyranids")
      .insertOne(army)
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
      }
    };

const deleteList = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must enter valid ID to delete your army")
  };

  const userId = new ObjectId(req.params.id);
  const deleteArmy = await mongodb
    .getDb()
    .db()
    .collection("Tyranids")
    .deleteOne({ _id: userId });
  if(deleteArmy.acknowledged) {
    res.status(200).send()
  }
  else {
    res.status(500).json("Failed to delete the army")
  }
}

const updateList = async (req, res) => {
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must enter valid ID to update your army")
  };
  const userId = new ObjectId(req.params.id);
  const army = {
    hiveFleet: req.body.hiveFleet,
    adaptive: req.body.adaptive,
    nullForceOrg: req.body.nullForceOrg,
    hq: req.body.hq,
    troop: req.body.troop
  }
  const update = await mongodb
    .getDb()
    .db()
    .collection("Tyranids")
    .replaceOne({ _id: userId }, army);
    if(update.acknowledged) {
      res.status(204).send()
    }
    else {
      res.status(500).json("Failed to update army")
    };
};
  

module.exports = { getAll, getSingle, addList, deleteList, updateList };