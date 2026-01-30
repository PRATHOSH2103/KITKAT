const express = require("express");


const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "uploads/");


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

//  multer storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


const { getMethodfun, postMethodfun, loginMethod, forgotPassword, resetPassword, verifyToken,
    createStudentId, addStudentDetails, getAllStudents, createEmployeeId,
    addEmployeeDetails,
    getAllEmployee, updateStudent, getStudentById, deleteStudent, 
    getEmployeeById,updateEmployee,deleteEmployee,
    addAttendance,getAllAttendance ,getAttendanceById,updateAttendance, deleteAttendance,
    createCustometInvoiceId , createCustomer,getAllCustomers,getCustomerById,
     updateCustomer,deleteCustomer , createInvoice} = require("./crud");

const router = express.Router();

router.get("/readData", getMethodfun);
router.post("/postData", postMethodfun);
router.post("/loginData", loginMethod);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


router.get("/students/next-id", verifyToken, createStudentId);
router.post("/students",
    verifyToken,
    upload.single("uploadPhoto"),
    addStudentDetails
);

router.get("/students", verifyToken, getAllStudents);



router.get("/employee/next-id", verifyToken, createEmployeeId);
router.post("/employee",
    verifyToken,
    upload.single("uploadPhoto"),
    addEmployeeDetails
);
router.get("/employee", verifyToken, getAllEmployee);




router.get("/students/:id", verifyToken, getStudentById);

// UPDATE student
router.put(
    "/students/:id",
    verifyToken,
    upload.single("uploadPhoto"),
    updateStudent
)
router.delete("/students/:id", verifyToken, deleteStudent);




router.get("/employee/:id", verifyToken, getEmployeeById);

// UPDATE employee
router.put(
    "/employee/:id",
    verifyToken,
    upload.single("uploadPhoto"),
    updateEmployee
)
router.delete("/employee/:id", verifyToken, deleteEmployee);



// add attendance 
router.post("/attendance", verifyToken, addAttendance);
router.get("/attendance", verifyToken, getAllAttendance);

router.get("/attendance/:id", verifyToken, getAttendanceById);
router.put("/attendance/:id", verifyToken, updateAttendance);
router.delete("/attendance/:id", verifyToken, deleteAttendance);


router.get("/customer/next-id", verifyToken, createCustometInvoiceId);


router.post("/customer", verifyToken, createCustomer);
router.get("/customer", verifyToken, getAllCustomers);
router.get("/customer/:id", verifyToken, getCustomerById);
router.put("/customer/:id", verifyToken, updateCustomer);
router.delete("/customer/:id", verifyToken, deleteCustomer);



router.post("/invoice", verifyToken, createInvoice);


module.exports = router;




