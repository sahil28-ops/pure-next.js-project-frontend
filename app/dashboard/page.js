import Link from "next/link";
const page = () => {
  return (
    <div>
      <h1>Dashboard page</h1>
      <p>
        <Link href="../dashboard/overview">go to overview</Link>
      </p>
      <p>
        <Link href="../dashboard/profile">go to profile</Link>
      </p>
      <p>
        <Link href="../dashboard/order">Orders</Link>
      </p>
      <p>
        <Link href="../dashboard/wishList">Wishlist</Link>
      </p>
      <p>
        <Link href="../dashboard/createCategeory">Create Categeory</Link>
      </p>
      <p>
        <Link href="../dashboard/createProduct">Create Product</Link>
      </p>
    </div>
  );
};

export default page;
