import Users from "../models/UserModel.js";
import argon2 from "argon2";


export const Login = async (req, res) => {
    try {
        // Validasi input
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Email dan password diperlukan" });
        }
        const user = await Users.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Password salah" });
        }
        req.session.userId = user.uuid;
        const { uuid, name, role } = user;
        res.status(200).json({ uuid, name, email, role });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await Users.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}