import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../hooks";
import type { StudentType } from "../../../@types/StudentType";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";

const StudentMore = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentType>();
  const { id } = useParams();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  //   Shu stack Id ga teng bo'lgan Stackni, singleStack get all
  useEffect(() => {
    instance()
      .get(`/students/${id}`)
      .then((res) => {
        setStudentData(res.data);
      });
  }, []);

  //   Delete part start
  const [deleteId, setDeleteId] = useState<string | null | undefined>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  function handleDelete() {
    setDeleteModal(true);
    setDeleteId(id);
  }
  function handleDeleteStudent() {
    setDeleteLoading(true);
    instance()
      .delete(`/students/${deleteId}`)
      .then(() => {
        toast.success("O'chirildi!", {
          onClose: () => {
            setDeleteLoading(false);
            setDeleteModal(false);
            navigate(-1);
          },
          autoClose: 1000,
        });
      });
  }
  //   Delete part end

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[20px]">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="!text-[22px] cursor-pointer hover:scale-[1.2] duration-300" />
          </button>
          <h2 className="font-bold text-[25px]">O'quvchining ma'lumotlari</h2>
        </div>
        <div className="flex items-center gap-5">
          <Button
            onClick={() => handleDelete()}
            className="!bg-red-500"
            size="large"
            type="primary"
            icon={<DeleteFilled className="!text-[20px]" />}
          ></Button>
          <Button
            onClick={() => navigate("update")}
            className="!bg-green-600"
            size="large"
            type="primary"
            icon={<EditFilled className="!text-[20px]" />}
          >
            O'zgartirish
          </Button>
        </div>
      </div>
      <div className="mt-5 flex justify-around gap-5">
        <div className="space-y-5">
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            ID:{" "}
            <span className="font-bold text-[#bc8e5b]">{studentData?.id}</span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            O'quvchi IDsi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.studentId}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Ismi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.name}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Familiyasi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.surname}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Yoshi:{" "}
            <span className="font-bold text-[#bc8e5b]">{studentData?.age}</span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Viloyat:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.region.name}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Viloyat IDsi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.regionId}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Tuman:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.district}
            </span>
          </p>
        </div>
        <div className="space-y-5">
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            O'qish:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.study}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Telefon raqami:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.phone}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Email:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.email}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Holati:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.status}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Gurux:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.group.name}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Gurux IDsi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.groupId}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Yaratilgan vaqti:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {studentData?.createdAt.split("T")[0].split(".")[0]} /{" "}
              {studentData?.createdAt.split("T")[1].split(".")[0]}
            </span>
          </p>
        </div>
      </div>
      <Modal
        confirmLoading={deleteLoading}
        okText="O'chirish"
        cancelText="Bekor qilish"
        okButtonProps={{ type: "primary", className: "!bg-[#bc8e5b]" }}
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onOk={handleDeleteStudent}
        title={"O'ylab ko'r! 😒"}
      ></Modal>
    </div>
  );
};

export default StudentMore;
