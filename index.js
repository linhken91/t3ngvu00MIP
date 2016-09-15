var express = require('express');
var app = express();
var mongoose = require('mongoose');
var dbURL = 'mongodb://linhken:123456@ds021036.mlab.com:21036/t3ngvu00';
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(dbURL, function(err) {
    if (err) throw err;
    console.info('Connected to database');
});

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    name:  String,
    address: String,
    class: String 
});
var Student = mongoose.model('Student', studentSchema);

var courseSchema = new Schema({
    name:  String,
    description: String
});
var Course = mongoose.model('Course', courseSchema);

var gradeSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    grade: Number 
});
var Grade = mongoose.model('Grade', gradeSchema);



app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/students', function (req, res) {
    res.send('All students');
});

app.post('/students', function (req, res) {
    console.log(req.body);
    var student = new Student({
        name:    req.body.name,
        address: req.body.address,
        class: req.body.class
    });
    student.save(function(err) {
        if (err) throw err;
        res.send(student);
    });
});

app.get('/students/:sid', function (req, res) {
    Student.findOne({ _id: req.params.sid }, function (err, student) {
        if (err) throw err;
        res.send(student);
    });
});

app.put('/students/:sid', function (req, res) {
    Student.findById(req.params.sid, function(err, student) {

            if (err)
                res.send(err);

            student.name = req.body.name;  
            student.address = req.body.address;
            student.class = req.body.class;

            
            student.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Student updated!' });
            });

        });
});


app.delete('/students/:sid', function (req, res) {
    Student.remove({
            _id: req.params.sid
        }, function(err, student) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted student' });
        });
});




app.post('/courses', function (req, res) {
    console.log(req.body);
    var course = new Course({
        name:    req.body.name,
        description: req.body.description
    });
    course.save(function(err) {
        if (err) throw err;
        res.send(course);
    });
});

app.get('/courses/:cid', function (req, res) {
    Course.findOne({ _id: req.params.cid }, function (err, course) {
        if (err) throw err;
        res.send(course);
    });
});

app.put('/courses/:cid', function (req, res) {
    Course.findById(req.params.cid, function(err, course) {

            if (err)
                res.send(err);

            course.name = req.body.name;  
            course.description = req.body.description;
            

            
            course.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Course updated!' });
            });

        });
});

app.delete('/courses/:cid', function (req, res) {
    Course.remove({
            _id: req.params.cid
        }, function(err, course) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted course' });
        });
});


app.post('/grades/:cid/:sid', function (req, res) {
    var grade = new Grade({
        student:    req.params.sid,
        course: req.params.cid,
        grade: req.body.grade
    });
    grade.save(function(err) {
        if (err) throw err;
        res.send(grade);
    });
});

app.get('/grades/:gid', function (req, res) {
    Grade.findOne({ _id: req.params.gid }, function (err, grade) {
        if (err) throw err;
        res.send(grade);
    });
});

app.put('/grades/:gid', function (req, res) {
    Grade.findById(req.params.gid, function(err, grade) {

            if (err)
                res.send(err);

            grade.grade = req.body.grade;  
            
            

            
            grade.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Grade updated!' });
            });

        });
});

app.delete('/grades/:gid', function (req, res) {
    Grade.remove({
            _id: req.params.gid
        }, function(err, grade) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted grade' });
        });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});