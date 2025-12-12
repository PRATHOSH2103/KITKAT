const bcrypt = require("bcryptjs");
const dataschema = require("../schema/schema");
const forgotEmailSchema = require("../schema/emailschema");
const forgotPassSchema = require("../schema/forgotschema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


// READ
const getMethodfun = async (req, res) => {
    try {
        if (req.user.role === "admin") {

            let getData = await adminschema.find();
            res.json("only admin can access the page")
            res.json(getData);
        }

    } catch (error) {
        res.json(error);
    }
};

// REGISTER
const postMethodfun = async (req, res) => {
    const hassPass = await bcrypt.hash(req.body.password, 10);
    try {
        const createData = new dataschema({
            ...req.body,
            password: hassPass
        });

        let saveData = await createData.save();


        res.json({ msg: "Registered successfully", saveData  });
    } catch (error) {
        res.json(error);
    }
};

// LOGIN
const loginMethod = async (req, res) => {


    try {
        const { name, password } = req.body;

        let user = await dataschema.findOne({ name });

        if (!user) return res.status(400).json({ success: false, msg: "Name not found" });

        let existingpass = await bcrypt.compare(password, user.password);

        if (!existingpass) return res.status(400).json({ success: false, msg: "Password is incorrect" });


        const token = jwt.sign({ id: user._id }, "SECRETKEY", { expiresIn: "1h" });


        res.json({
            success: true,
            msg: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email
            }
        });




    } catch (error) {
        res.json(error);
    }



};


// FORGOT PASSWORD

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await forgotEmailSchema.findOne({ email });

        const token = jwt.sign({ email }, process.env.JWT_KEY, {
            expiresIn: "10m",
        });

        const resetLink = `http://localhost:3000/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset Your Password",
            html: `
                <h3>Password Reset</h3>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
            `,
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: "Email sending failed" });
            }
            res.json({ msg: "Password reset mail sent!" });

        });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};



const saveForgotEmail = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ msg: "Email is required" });
        }

        const saved = new ForgotEmail({ email });
        await saved.save();

        res.json({ msg: "Email saved in database", saved });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
};


// RESET PASSWORD


const Resetpassword = async (res, req) => {

    try {
        const { token, newpassword, confirmpassword } = req.body;

        // Check confirmation
        if (newpassword !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check for user based on token
        const user = await forgotPassSchema.findOne({ resetToken: token });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        user.password = hashedPassword;
        user.resetToken = null; 

        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        // console.error(err);
        res.status(500).json({ message: "Server error" });
    }


}

// VERIFY TOKEN

const verifyToken = async (req, res, next) => {


    const header = req.headers.authorization;

    if (!header) return res.status(401).json({ message: "Token required" });

    const token = header.split(" ")[1];

    jwt.verify(token, "SECRETKEY", (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token invalid" });

        req.user = decoded;
        next();
    });



};




module.exports = {
    getMethodfun,
    postMethodfun,
    loginMethod,
    forgotPassword,
    saveForgotEmail,
    Resetpassword,
    verifyToken

};
