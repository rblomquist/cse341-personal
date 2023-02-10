const { response } = require("express");
const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const getAll = async (req, res) => {
    const result = await mongodb
      .getDb()
      .db()
      .collection('Tyranids')
      .find()
      .toArray(( err, lists) => {
        if(err) {
          res.status(400).json(err);
        }
      res.setHeader('Content-Type', 'application/json');
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
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json(err);
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
      });
  };
  
  const addList = (req, res) => {
    const army = {
      hiveFleet: req.body.hiveFleet,
      adaptive: req.body.adaptive,
      nullForceOrg: req.body.nullForceOrg,
      hq: req.body.hq,
      troop: req.body.troop
    }
    mongodb
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

const deleteList = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must enter valid ID to delete your army")
  };
  const userId = new ObjectId(req.params.id);
  const deleteArmy = mongodb
    .getDb()
    .db()
    .collection("Tyranids")
    .deleteOne({ _id: userId })
  if(deleteArmy.modifiedCount > 0) {
    res.status(204).send()
  }
  else {
    res.status(500).json("Failed to delete the army")
  }
}

const updateList = (req, res) => {
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
  const update = mongodb
    .getDb()
    .db()
    .collection("Tyranids")
    .replaceOne({ _id: userId }, army);
    if(update.modifiedCount > 0) {
      res.status(204).send
    }
    else {
      res.status(500).json("Failed to update army")
    };
};
  

module.exports = { getAll, getSingle, addList, deleteList, updateList };