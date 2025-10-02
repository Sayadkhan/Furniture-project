import Admin from "@/model/Admin";
import React from "react";

async function getAdminDetails(id) {
  await connectDB();

  const admin = await Admin.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });

  if (!admin) return null;

  return JSON.parse(JSON.stringify(admin));
}

const page = () => {
  return <div></div>;
};

export default page;
