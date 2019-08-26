const express = require('express');
const router = express.Router();

// model
const Room = require('../model/index.model')

// Home page
router.get('/', (req, res) => {
    res.render('home', {
        title: 'Your Chat Here',
        page: 'home',
        claim_id_flash: req.flash('claim-id-flash'),
        room_id_flash: req.flash('room-id-flash'),
        room_pass_flash: req.flash('room-pass-flash'),
        info_success: req.flash('info-success'),
        info_danger: req.flash('info-danger')
    });
});

// claim Room
router.post('/claim', (req, res) => {
    let room_id = req.body.room_id;
    let room_pass = req.body.room_password;

    Room.findOne({ room_id: room_id })
        // if ID exist
        .then((doc) => {
            if (doc) {
                req.flash('claim-id-flash', 'ID is already Exists! Please choose another.');
                res.redirect('/');
            }
            else {
                // insert into database
                const newRoom = new Room({
                    room_id: room_id,
                    room_pass: room_pass,
                    message: []
                });
                newRoom.save()
                    .then(() => {
                        req.flash('info-success', 'Your Room is Ready! Now you can chat anonymously.');
                        res.redirect('/');
                    })
                    .catch((err) => {
                        req.flash('info-danger', 'catch Something went wrong! Please Try Again.');
                        res.redirect('/');
                    })
            }
        })
});

// Enter Room
let sess;
let id;
router.post('/room', (req, res) => {
    let room_id = req.body.room_id;
    let room_pass = req.body.room_password;

    Room.findOne({ room_id: room_id })
        .then(doc => {
            if (!doc) {
                req.flash('room-id-flash', 'Wrong ID! Please check it perfectly');
                res.redirect('/');
            }
            else {
                if (!(doc.room_pass == room_pass)) {
                    req.flash('room-pass-flash', 'Wrong Password! Please check it perfectly');
                    res.redirect('/');
                }
                else {
                    const ips = [];
                    for (let i = 0; i < doc.message.length; i++) {
                        if (!(ips.includes(doc.message[i].ip))) {
                            ips.push(doc.message[i].ip);
                        }
                    }
                    sess = req.session;
                    sess.id = doc.room_id;
                    id = room_id;
                    res.render('room', {
                        title: 'Message',
                        page: 'room',
                        document: doc,
                        ip: req.ip,
                        ips: ips
                    });
                    res.end('done');
                }
            }
        })
});

router.get('/room', (req, res) => {
    sess = req.session;
    if (sess.id && id != '') {
        Room.findOne({ room_id: id })
            .then(doc => {
                if (doc) {
                    const ips = [];
                    for (let i = 0; i < doc.message.length; i++) {
                        if (!(ips.includes(doc.message[i].ip))) {
                            ips.push(doc.message[i].ip);
                        }
                    }
                    res.render('room', {
                        title: 'Message',
                        page: 'room',
                        document: doc,
                        ip: req.ip,
                        ips: ips,
                    });
                }
                else {
                    res.redirect('/');
                }
            })
    } else {
        res.redirect('/');
    }
});

router.get('/logout', (req, res) => {
    sess = req.session;
    if (sess.id) {
        req.session.destroy();
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

// message
router.post('/room/:id', (req, res) => {
    let msg = req.body.message;

    if (msg.length < 1 || msg.length > 350) {
        res.redirect('/room');
        return;
    }

    Room.findOne({ _id: req.params.id })
        .then(doc => {
            if (doc) {
                Room.updateOne({ _id: req.params.id }, {
                    $push: {
                        "message": {
                            msg: msg,
                            ip: req.ip,
                            date: require('../config/date')
                        }
                    }
                }).then(() => {
                    res.redirect('/room');
                })
            }
        })
});

module.exports = router;;