import connectDB from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/BlogModel";
const fs = require("fs");

const LoadDB = async () => {
  await connectDB().then(() => {
    console.log("database connected");
  });
};
LoadDB();

// API endpoint for getting all blogs
export async function GET(req, res) {
  // console.log("BLOG API is hitted");
  const blogId = req.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({ blog });
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }

  // api for initializing data
  // blog_data.map(async (blog)=>{
  //   const blogs = await BlogModel.insertMany({title:blog.title,description:blog.description,image:`${blog.image.src}`,author:blog.author,category:blog.category});
  // })
  // return NextResponse.json({message:"Data initialized",success:true});

  // console.log(blog_data[0].image);
  // return NextResponse.json({message:"Data initialized",success:true});

  // const blogs = await BlogModel.deleteMany({});
  // return NextResponse.json({message:"Data deleted",success:true});
}

// API endpoint for creating a new blog or uploading a new blog
export async function POST(request) {
  const formData = await request.formData();
  console.log(formData);
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);

  const path = `public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);

  const imgUrl = `/${timestamp}_${image.name}`;
  // console.log(imgUrl);

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    image: `${imgUrl}`,
    // timestamp:`${timestamp}`,
    author: `${formData.get("author")}`,
    category: `${formData.get("category")}`,
    authorImg: `${formData.get("authorImg")}`,
  };
  await BlogModel.create(blogData);
  // console.log("blog created");
  return NextResponse.json({
    message: "Blog created successfully",
    success: true,
  });
}

//creating delete api
export async function DELETE(req) {
  const id = await req.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findByIdAndDelete(id);

  fs.unlink(`./public/${blog.image}`, () => {});

  await BlogModel.findByIdAndDelete(id);

  return NextResponse.json({
    message: "Blog deleted successfully",
  });
}
