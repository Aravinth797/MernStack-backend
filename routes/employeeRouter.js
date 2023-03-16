import express from "express";
import expressAsyncHandler from "express-async-handler";
import Admin from "../models/AdminModel.js";
import bcrypt from "bcryptjs";
import multer from "multer";
let directory_name = "uploads";
import path from "path";
var fileDocPath = "";
import Employee from "../models/EmployeeModel.js";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(directory_name, "/"));
  },
  filename: (req, file, cb) => {
    let filedirect = file.originalname.split(".");

    fileDocPath =
      directory_name +
      "/" +
      filedirect[0] +
      "_" +
      new Date().toISOString().replace(/:/g, "-") +
      "." +
      filedirect[1];

    cb(
      null,
      filedirect[0] +
        "_" +
        new Date().toISOString().replace(/:/g, "-") +
        "." +
        filedirect[1]
    );
  },
});

const employeeRouter = express.Router();

employeeRouter.post("/save", (req, res, next) => {
  fileDocPath = "";

  var upload = multer({ storage: storage }).fields([
    { name: "file", maxCount: 1 },
  ]);
  upload(req, res, async function (err) {
    console.log("req", req.body);
    console.log("req", req.files);

    const fileDoc = fileDocPath;
    console.log("fileDoc-------------->", fileDoc);
    const employee = new Employee({
      fname: req.body.fname,
      lname: req.body.lname,
      mnumber: req.body.mnumber,
      email: req.body.email,
      address: req.body.address,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      cname: req.body.cname,
      photo: fileDoc,
    });
    await employee.save();
    if (employee) {
      res.send(employee);
    } else {
      res.status(404).send({ message: "Women Product Not Found" });
    }
  });
});

employeeRouter.put(
  "/update/:id",
  expressAsyncHandler(async (req, res) => {

    const employeeId = req.params.id;

    const employeeUpdate = await Employee.findById(employeeId);

    fileDocPath = "";

    var upload = multer({ storage: storage }).fields([
      { name: "file", maxCount: 1 },
    ]);
    upload(req, res, async function (err) {

      console.log("req", req.body);
      console.log("req", req.files);

      let fileDoc = fileDocPath;

      if (employeeUpdate.photo === req.body.file) {
        fileDoc = req.body.file;
      } else {
        fileDoc = fileDocPath;
      }

      req.body.photo = fileDoc;
      if (employeeUpdate) {
        employeeUpdate.fname = req.body.fname;
        employeeUpdate.lname = req.body.lname;
        employeeUpdate.mnumber = req.body.mnumber;
        employeeUpdate.email = req.body.email;
        employeeUpdate.address = req.body.address;
        employeeUpdate.address2 = req.body.address2;
        employeeUpdate.city = req.body.city;
        employeeUpdate.state = req.body.state;
        employeeUpdate.pincode = req.body.pincode;
        employeeUpdate.cname = req.body.cname;
        employeeUpdate.photo = fileDoc;

        const UdatedEmployee = await employeeUpdate.save();
        res.send({ message: " Updated", employeeUpdate: UdatedEmployee });
      } else {
        res.status(404).send({ message: "Employee Update Not Found" });
      }
    });
  })
);

employeeRouter.get(
  "/get",
  expressAsyncHandler(async (req, res) => {
    const app = await Employee.find();

    if (app) {
      res.send(app);
    } else {
      res.status(404).send({ message: "Women Product Not Found" });
    }
  })
);

employeeRouter.get(
  "/get/:id",
  expressAsyncHandler(async (req, res) => {
    const app = await Employee.findById(req.params.id);
    if (app) {
      res.send(app);
    } else {
      res.status(404).send({ message: "Women Product Not Found" });
    }
  })
);

employeeRouter.delete(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    console.log("req", req.params.id);

    const deleteApp = await Employee.findById(req.params.id);
    if (deleteApp) {
      const deletenewApp = await deleteApp.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deletenewApp });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default employeeRouter;
