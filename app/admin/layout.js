import Admin from "@/components/Admin/Admin";

export const metadata = {
  title: "Coffee Brand",
  description: "Delicious coffee for every mood",
};

export default function AdminLayout({ children }) {
  return (
    <div>
      <Admin>{children}</Admin>
    </div>
  );
}
