const express = require("express");
const router = express.Router();
const {getContact, getContactByID, createContact, updateContact, deleteContact} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route('/').get(getContact).post(createContact)
router.route('/:id').get(getContactByID).put(updateContact).delete(deleteContact)

module.exports = router