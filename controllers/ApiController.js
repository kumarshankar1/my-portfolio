let About = require('../models/AboutModel');
let Contact = require('../models/ContactModel');
let Home = require('../models/HomeModel');
let Project = require('../models/ProjectModel');
var striptags = require('striptags');
const nodemailer = require('nodemailer');

const getAbout = async (req, res, next) => {
  try {
    let id = req.params.id;
    let results = await About.findById({ _id: id });
    let responseData = [];
    responseData = {
      id: results.id,
      title_name: results.title,
      name: results.name,
      profile_image: process.env.IMAGEURL + 'uploads/about/' + results.image,
      description: striptags(results.description),
    };

    let IMAGEURL = process.env.IMAGEURL + 'uploads/about/';
    res.status(200).json({ data: responseData, IMAGEURL: IMAGEURL });
  } catch (error) {
    res.status(500).json({ error, msg: ' Something Went Wrong' });
  }
};
const getHomeInfo = async (req, res) => {
  try {
    let id = req.params.id;
    let results = await Home.findOne({ _id: id });
    let responseData = [];
    responseData = {
      id: results.id,
      title: results.title,
      name: results.name,
      description: striptags(results.description),
      image: process.env.IMAGEURL + 'uploads/homeInfo/' + results.image,
    };

    let IMAGEURL = process.env.IMAGEURL + 'uploads/homeInfo/';
    res.status(200).json({ hdata: responseData, IMAGEURL: IMAGEURL });
  } catch (error) {
    res.status(500).json({ error, msg: ' Something Went Wrong' });
  }
};
const getContact = async (req, res, next) => {
  try {
    let id = req.params.id;
    let results = await Contact.findOne({ where: { id: id } });
    let responseData = [];
    responseData = {
      id: results.id,
      phone: results.phone,
      email: results.email,
      address: results.address,
      resume: process.env.IMAGEURL + 'uploads/contact/' + results.resume,
    };

    let IMAGEURL = process.env.IMAGEURL + 'uploads/contact/';
    res.status(200).json({ cdata: responseData, IMAGEURL: IMAGEURL });
  } catch (error) {
    res.status(500).json({ error, msg: ' Something Went Wrong' });
  }
};

const getAllProject = async (req, res, next) => {
  try {
    let responseData = [];
    let IMAGEURL = process.env.IMAGEURL + 'uploads/project/';
    let results = await Project.find();

    for (let i = 0; i < results.length; i++) {
      responseData.push({
        id: results[i]._id,
        name: results[i].title,
        link: results[i].site_url,
        description: results[i].description,
        image: IMAGEURL + results[i].image,
      });
    }

    res.status(200).json({ data: responseData, IMAGEURL: IMAGEURL });
  } catch (error) {
    res.status(500).json({ error, msg: ' Something Went Wrong' });
  }
};
const addQuery = async (req, res) => {
    console.log(req.body)
  //const newContact = new Contact(req.body);
  try {
    const contacts = {
        'firstname':req.body.firstname,
    }
    const savedContact = await Contact.create(req.body);

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service:"gmail",
        port: 587,
        secure: true, // true for 465, false for other ports
        requireTLS:true,
        //auth: {
          //user: 'Vc@hightechprotech.com', 
          //pass: "UrrI7+XtRp8w",
        //},
   auth: {
          user: 'shankarkr35@gmail.com', 
          pass: "fpxglmnopietjjie",
        },
    });
    var mailOptions = {
      //from: 'shankar.wxit@gmail.com',
      from: '"My Portfolio 👻" <shankarkr35@gmail.com>', // sender address
      to: 'shankar.wxit@gmail.com,shankarkr35@gmail.com', // list of receivers
      subject: 'Enquiry ✔', // Subject line
      //text: 'Hello world?', // plain text body
       html: `<b>Hello Shankar You Have a request from ${req.body.email} </b>`, // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(200).json({
            'Api Name': 'Contact Api',
            message: 'Contact added successfully',
            status: true,
            data: error,
          });
      } else {
        res.status(200).json({
            'Api Name': 'Contact Api',
            message: 'Contact added successfully',
            status: true,
            data: info,
          });
      }
    });
    
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getHomeInfo,
  getAbout,
  getAllProject,
  getContact,
  addQuery,
};
