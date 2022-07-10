const Demande = require("../models/Demande");
const User = require("../models/User");
const Service = require("../models/Service");
const asyncHandler = require("../middlewares/asyncMiddleware");
const { mailTransport } = require("../utils/mail");

const ajouterDemande = asyncHandler(async (req, res) => {
  const { user_id, choixs, nbr_plc, date } = req.body;

  const demande = new Demande({ user_id, choixs, nbr_plc, date });
  const createdDemande = await demande.save();
  const updatedUser = await User.updateOne(
    { _id: user_id },
    { $addToSet: { demandes: createdDemande._id } }
  );

  const user = await User.findById(user_id);

  const service = await Service.findById(user.service);
  const updatedChef = await User.updateOne(
    { _id: service.chef_id },
    { $addToSet: { demandesemploye: createdDemande._id } }
  );

  if (createdDemande && updatedUser && updatedChef) {
    res.status(201).json({
      createdDemande,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const validateDemande = asyncHandler(async (req, res) => {
  const demande = await Demande.findById(req.params.id);
  if (demande) {
    demande.isvalid = req.body.isvalid;
    demande.ischecked = req.body.ischecked;
    const updatedDemande = await demande.save();
    let user = await User.findById(demande.user_id);
    let text;
    if (demande.isvalid === true) {
      text = "Votre Demande Est Acceptée";
    } else {
      text = "Votre Demande Est rejetée";
    }
    let options = {
      from: "marocmarsa@gmail.com",
      to: user.email,
      subject: "Demande Centre D'estivage",
      text: text,
    };
    mailTransport().sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent :" + info.response);
    });
    res.json(updatedDemande);
  } else {
    res.status(404);
    throw new Error("Demande Not Found");
  }
});

const getDemandes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const demandes = user.demandes;
  let results = await Promise.all(
    demandes.map(async (demande) => await Demande.findById(demande))
  );
  let data = results.map((demande) => ({
    userid: demande.userid,
    choixs: demande.choixs,
    nbr_plc: demande.nbr_plc,
    date: demande.date,
  }));

  res.json({ data });
});
const getDemandesemploye = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const dem = user.demandesemploye;

  let results = await Promise.all(
    dem.map(async (demande) => await Demande.findById(demande))
  );
  results = results.filter((res) => res.ischecked === false);
  let demandes = results.map((demande) => ({
    _id: demande._id,
    userid: demande.userid,
    choixs: demande.choixs,
    nbr_plc: demande.nbr_plc,
    date: demande.date,
  }));

  let useres = await Promise.all(
    demandes.map(async (res) => await User.findById(res.userid))
  );
  let users = useres.map((usere) => ({
    email: usere.email,
    nom: usere.nom,
    matricule: usere.matricule,
    service: usere.service,
    date_emb: usere.date_emb,
    category: usere.category,
    stf: usere.stf,
    nbr_enf: usere.nbr_enf,
    gsm: usere.gsm,
  }));

  res.json({ demandes, users });
});

const updateDemande = asyncHandler(async (req, res) => {
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
});

module.exports = {
  ajouterDemande,
  getDemandes,
  getDemandesemploye,
  validateDemande,
  updateDemande,
};
