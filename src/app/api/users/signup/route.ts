import { connect } from "@/app/dbConfig/dbConfig";
import  User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();


export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        // check if user is already exists
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User Already Exists"});
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassowrd = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassowrd
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({ message: "User created successfuly", success: true, savedUser });
        
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 })
    }
}