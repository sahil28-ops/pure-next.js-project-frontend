import Link from "next/link";
const page = () => {
  return (
    <div>
      <h1>Dashboard page</h1>
      <p>
        <Link href="../dashboard/overview">go to overview</Link>
      </p>
    </div>
  );
};

export default page;
