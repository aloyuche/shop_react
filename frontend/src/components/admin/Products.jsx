import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeader, PrimaryButton } from "./CommonStyled";

const Products = () => {
  const navigate = useNavigate();
  return (
    <>
      <AdminHeader>
        <PrimaryButton
          onClick={() => navigate("admin/products/create-product")}
        >
          Create
        </PrimaryButton>
      </AdminHeader>
      <Outlet />
    </>
  );
};

export default Products;
