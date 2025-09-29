import AllCategoryTable from "@/components/Admin/Category/AllCategoryTable";
import { connectDB } from "@/lib/mongodb";
import Category from "@/model/Category";


async function getAllCategory() {
  await connectDB();
  const categories = await Category.find({})
    .sort({ createdAt: -1 })
    .lean(); 

  return JSON.parse(JSON.stringify(categories));
}

const page = async () => {

    const category = await getAllCategory();

  return (
    <div>
      <AllCategoryTable category={category}/>
    </div>
  )
}

export default page
