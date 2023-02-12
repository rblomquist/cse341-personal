const { response } = require("express");
const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const getAll = async (req, res) => {
  const all = await mongodb
    .getDb()
    .db()
    .collection('Tyranids')
    .find();

  if(all) {
    all.toArray().then((lists) => {
      res.status(200).json(lists);
    });
  }
  else {
    res.status(500).json("error");
  };
};

  const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use valid contact ID to find your army")
    };
    const userId = new ObjectId(req.params.id);
    const single = await mongodb
      .getDb()
      .db()
      .collection("Tyranids")
      .find({ _id: userId });
    
      if(single){
      single.toArray().then((lists) => {
        res.status(200).json(lists);
      });
    }
    else {
      res.status(500).json("error");
    };
};
  
  const addList = async (req, res) => {
    const army = {
      hiveFleet: req.body.hiveFleet,
      adaptive: req.body.adaptive,
      nullForceOrg: req.body.nullForceOrg,
      hq: req.body.hq,
      troop: req.body.troop,
      elite: req.body.elite,
      fastAttack: req.body.fastAttack,
      heavySupport: req.body.heavySupport,
      flyer: req.body.flyer,
      transport: req.body.transport
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
    troop: req.body.troop,
    elite: req.body.elite,
    fastAttack: req.body.fastAttack,
    heavySupport: req.body.heavySupport,
    flyer: req.body.flyer,
    transport: req.body.transport
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