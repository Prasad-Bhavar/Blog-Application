
import EmailModel from "@/lib/models/EmailModel";
import connectDB from "@/lib/config/db";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectDB();
};
LoadDB();

export async function POST(req) {
  const formData = await req.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };

  await EmailModel.create(emailData);

  return NextResponse.json({
    message: "Email subscribed",
    success: true,
  });
};

export async function GET(req) {
  const emails = await EmailModel.find();
  return NextResponse.json({
    emails,
    success: true,
  });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({
        message: "Email deleted",
        success: true,
    });

}



