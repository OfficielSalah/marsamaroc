const Demande = require("../models/Demande");
const User = require("../models/User");
const Service = require("../models/Service");
const { mailTransport } = require("../utils/mail");
const ErrorResponse = require("../utils/errorResponse");
const { isValidObjectId } = require("mongoose");

const ajouterDemande = async (user_id, nbr_plc, choixs) => {
  if (!user_id || !nbr_plc || !choixs) {
    throw new ErrorResponse("user_id or nbr_plc or choixs not valid", 400);
  }

  if (!isValidObjectId(user_id)) {
    throw new ErrorResponse("unvalid user_id", 400);
  }

  const user = await User.findById(user_id);

  if (!user) {
    throw new ErrorResponse("User Not Found", 404);
  }

  if (choixs.length !== 3) {
    throw new ErrorResponse(
      "la demande doit contenir 3 choixs exactement",
      400
    );
  }

  const createdDemande = await Demande.create({
    user_id,
    nbr_plc,
    choixs,
  });

  if (!createdDemande) {
    throw new ErrorResponse("Couldn't create Demande", 402);
  }

  const updatedUser = await User.updateOne(
    { _id: user_id },
    { $push: { dems_id: createdDemande._id } }
  );

  if (!updatedUser) {
    throw new ErrorResponse("Couldn't Update Demandes Of User", 402);
  }

  if (!user.ischef) {
    const service = await Service.findById(user.ser_Id);
    const updatedChef = await User.findOneAndUpdate(
      { matricule: service.chef_mat },
      { $push: { demsemp_id: createdDemande._id } }
    );
    if (!updatedChef) {
      throw new ErrorResponse("Couldn't Update Chef Of User", 402);
    }
  }

  return createdDemande;
};
const getDemandes = async (user_id) => {
  if (!user_id) {
    throw new ErrorResponse("user_id not valid", 400);
  }
  if (!isValidObjectId(user_id)) {
    throw new ErrorResponse("unvalid user_id", 400);
  }
  const user = await User.findById(user_id);
  if (!user) {
    throw new ErrorResponse("User Not Found", 404);
  }

  const demandes = user.dems_id;

  let results = await Promise.all(
    demandes.map(async (dem_id) => await Demande.findById(dem_id))
  );

  let data = results.map((demande) => ({
    user_id: demande.user_id,
    choixs: demande.choixs,
    nbr_plc: demande.nbr_plc,
  }));

  return data;
};
const getDemandesemploye = async (user_id) => {
  if (!user_id) {
    throw new ErrorResponse("user_id not valid", 400);
  }
  if (!isValidObjectId(user_id)) {
    throw new ErrorResponse("unvalid user_id", 400);
  }
  const user = await User.findById(user_id);
  if (!user) {
    throw new ErrorResponse("User Not Found", 404);
  }
  const dem = user.demsemp_id;

  let results = await Promise.all(
    dem.map(async (dem_id) => await Demande.findById(dem_id))
  );
  results = results.filter((res) => res.ischecked === false);
  let demandes = results.map((demande) => ({
    _id: demande._id,
    user_id: demande.user_id,
    choixs: demande.choixs,
    nbr_plc: demande.nbr_plc,
  }));

  let useres = await Promise.all(
    demandes.map(async (demande) => await User.findById(demande.user_id))
  );
  let users = useres.map((user) => ({
    email: user.email,
    nom: user.nom,
    matricule: user.matricule,
    ser_Id: user.ser_Id,
    date_emb: user.date_emb,
    category: user.category,
    stf: user.stf,
    nbr_enf: user.nbr_enf,
    gsm: user.gsm,
  }));
  let demsemp = demandes.map((demande, index) => ({
    demande: demande,
    user: users[index],
  }));

  return { demsemp };
};
const validateDemande = async (dem_id, isvalid) => {
  if (!dem_id || isvalid === undefined) {
    throw new ErrorResponse("dem_id or isvalid not valid", 400);
  }
  if (!isValidObjectId(dem_id)) {
    throw new ErrorResponse("unvalid dem_id", 400);
  }
  const demande = await Demande.findById(dem_id);

  if (!demande) {
    throw new ErrorResponse("Demande Not Found", 404);
  }

  demande.isvalid = isvalid;
  demande.ischecked = true;

  const updatedDemande = await demande.save();

  if (!updatedDemande) {
    throw new ErrorResponse("Couldn't Update Demande", 402);
  }

  let user = await User.findById(demande.user_id);

  if (!user) {
    throw new ErrorResponse("User Not Found", 404);
  }
  let text;
  if (demande.isvalid === true) {
    text = "Votre Demande Est Acceptée";
  } else {
    text = "Votre Demande Est rejetée";
  }
  mailTransport().sendMail({
    from: "marocmarsa@outlook.com",
    to: user.email,
    subject: "Demande Centre D'estivage",
    text: text,
  });
  return updatedDemande;
};
const updateDemande = async (req, res, next) => {
  const demande = await Demande.findById(req.demande._id);

  demande.nbr_plc = req.body.nbr_plc || demande.nbr_plc;
  demande.date = req.body.date || demande.date;
  demande.choixs = req.body.choixs || demande.choixs;

  const updatedDemande = await user.save();

  res.json({
    _id: updatedDemande._id,
    nbr_plc: updatedDemande.nbr_plc,
    date: updatedDemande.date,
    choixs: updatedDemande.choixs,
  });
};

module.exports = {
  ajouterDemande,
  getDemandes,
  getDemandesemploye,
  validateDemande,
  updateDemande,
};
