const DemandeService = require("../services/demandeService");
const asyncHandler = require("../middlewares/asyncMiddleware");

const ajouterDemande = asyncHandler(async (req, res, next) => {
  const { user_id, nbr_plc, choixs } = req.body;

  try {
    const demande = await DemandeService.ajouterDemande(
      user_id,
      nbr_plc,
      choixs
    );
    res.status(200).json({
      demande: demande,
      action: `demande Created`,
    });
  } catch (error) {
    next(error);
  }
});

const validateDemande = asyncHandler(async (req, res, next) => {
  const dem_id = req.params.id;
  const { isvalid } = req.body;
  try {
    const demande = await DemandeService.validateDemande(dem_id, isvalid);
    res.status(200).json({
      demande: demande,
      action: `demande Validated`,
    });
  } catch (error) {
    next(error);
  }
});

const getDemandes = asyncHandler(async (req, res, next) => {
  const user_id = req.user._id;
  try {
    const demandes = await DemandeService.getDemandes(user_id);
    res.status(200).json({
      demandes: demandes,
    });
  } catch (error) {
    next(error);
  }
});
const getDemandesemploye = asyncHandler(async (req, res, next) => {
  const user_id = req.user._id;

  try {
    const data = await DemandeService.getDemandesemploye(user_id);
    res.status(200).json({
      demandes: data.demandes,
      users: data.users,
    });
  } catch (error) {
    next(error);
  }
});

const updateDemande = asyncHandler(async (req, res, next) => {
  const dem_id = req.demande._id;

  try {
    const data = await DemandeService.updateDemande(user_id, nbr_plc, choixs);
    res.status(200).json({
      demandes: data.demandes,
      users: data.users,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  ajouterDemande,
  getDemandes,
  getDemandesemploye,
  validateDemande,
  updateDemande,
};
