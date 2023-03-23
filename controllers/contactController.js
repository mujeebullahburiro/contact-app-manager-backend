//Controller is going to contain all over logic for the resquest and response and it help us  to connect with database
//When we are create the api methods, we always need to give some labels to that.
//-------------------------------
const asyncHandler= require ("express-async-handler");
//By Using asyncHandler we don't have to write all the try catch block in order to catch the error.
const Contact = require("../models/contactModel");

//@des Get all contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler( async(req, res)=>{
    const contacts= await Contact.find({user_id:req.user.id});
    res.status(201).json(contacts); 
})
 
//@des Get contacts for id
//@route GET /api/contacts/:id
//@access private
const getContactForId =asyncHandler( async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(201).json(contact); 
})


//@des Create New contact
//@route POST /api/contact
//@access private
const createContact =asyncHandler( async (req, res)=>{
    console.log(`The Request Body Is:`, req.body ); 
    const {Name, Email, Phone} = req.body;
    if(!Name || !Email || !Phone){
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const contact = await Contact.create({
        Name,
        Email,
        Phone,
        user_id: req.user.id
    });
    res.status(201).json(contact); 
})


//@des Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact =asyncHandler( async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new error("Contact Not Found")
    }

    if(contact.user_id.toString() !== req.user.id){ 
        res.status(403);
        throw new Error("User Don't Have permision to update other user contact")
    }

    const updateContact =await Contact.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.status(201).json(updateContact); 
})


//@des Delet contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact =asyncHandler( async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new error("Contact Not Found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User Don't Have permision to Delete other user contact")
    }
    const deletedcontact = await Contact.findByIdAndDelete(req.params.id);
    res.status(201).json(deletedcontact); 
})


module.exports= {
    getAllContacts,
    getContactForId,
    createContact,
    updateContact,
    deleteContact
};