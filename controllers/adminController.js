
const asyncHandler = require("../middlewares/errorHandler")
const Admin = require("../models/admin.model")
const Contact = require("../models/ContactModel")

//1. Login User
const adminLogin = async(req, res) =>{
    const email = req.session.email;
    if (email) {
        res.redirect('dashboard');
    } else {
        res.render('login');
    } 
}
const login = async(req, res, next) => {
    try {
        
        let sess = req.session;
        var email = req.body.user_name;
        var password = req.body.password;
        if (email && password) {
            let adminData = await Admin.findOne({ email: email })
            if (adminData) {
                if (adminData.password == password) {
                    sess.loggedin = true;
                    sess.email = adminData.email;
                    res.send('success')
                } else {
                    //return res.status(200).json({ status: false, msg: 'Something went wrong' });
                    res.send('password invalid')
                }
            } else { 
                //console.log('invalid inputs');
                res.send('invalid email')
            }
        }
       
    } catch (err) {
        res.send('Error' + err);
    }
}
const adminDashboard = (req, res, next) => {
    console.log('adminDashboard',req.session)
    if (req.session.loggedin) {
        res.render('dashboard');
    } else {
        res.redirect('/');
    }
}

const adminLogout = (req, res, next) => {
    req.session = null;
    res.send("success");
}
const contacts = async(req,res,next) => {
    try {
        if (req.session.loggedin) {
            let results = await ContactUs.findAll();
            res.render('contacts/index', { contact: results, data: 'Contact List' });

        } else {
            res.redirect('/');
        }

    } catch (err) {
        res.send('Error' + err);
    }
}
const contactList = async (req, res, next) => {
    try {
      if (req.session.loggedin) {
        let results = await Contact.find();
        res.render('contacts/index', {
          contact: results,
          data: 'Contact List',
        });
      } else {
        res.redirect('/');
      }
    } catch (error) {
      res.send('Error' + error);
    }
}
const deleteContact = async(req,res)=>{
    try {
        
        if (req.session.loggedin) {
            let id = req.body.id;
            const result = await Contact.findByIdAndDelete({_id:id})
            res.send('Deleted');

        } else {
            res.redirect('/');
        }
        
        
    } catch (error) {
        res.send('Error' + error);
    }
}


module.exports = {
    login,
    adminLogin,
    adminDashboard,
    adminLogout,
    contactList,
    deleteContact,

}