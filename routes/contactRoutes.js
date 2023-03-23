const express = require("express");
const router = express.Router();
const { getAllContacts,
    getContactForId,
    createContact,
    updateContact,
    deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getAllContacts).post(createContact);
router.route("/:id").get(getContactForId).put(updateContact).delete(deleteContact);


module.exports=router;