import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { instance } from "../../../hooks";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import type { TeacherType } from "../../../@types/TeacherType";

const TeacherMore = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [teacherData, setTeacherData] = useState<TeacherType>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  //   Delete part start
  const [deleteId, setDeleteId] = useState<string | null | undefined>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  function handleDelete() {
    setDeleteModal(true);
    setDeleteId(id);
  }
  function handleDeleteTeacher() {
    setDeleteLoading(true);
    instance()
      .delete(`/teachers/${deleteId}`)
      .then(() => {
        toast.success("O'chirildi!", {
          onClose: () => {
            navigate(-1);
          },
          autoClose: 1000,
        });
      })
      .finally(() => {
        setDeleteModal(false);
        setDeleteLoading(false);
      });
  }
  //   Delete part end

  //   Shu stack Id ga teng bo'lgan Stackni, singleStack get all
  useEffect(() => {
    instance()
      .get(`/teachers/${id}`)
      .then((res) => {
        setTeacherData(res.data);
      });
  }, []);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[20px]">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="!text-[22px] cursor-pointer hover:scale-[1.2] duration-300" />
          </button>
          <h2 className="font-bold text-[25px]">Ustoz ma'lumotlari</h2>
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
            <span className="font-bold text-[#bc8e5b]">{teacherData?.id}</span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Ism:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.name}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Familiya:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.surname}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Yosh:{" "}
            <span className="font-bold text-[#bc8e5b]">{teacherData?.age}</span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Yo'nalish IDsi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.stackId}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Viloyat IDsi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.region.id}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Viloyat:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.distirict}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Status IDsi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.status.id}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Lavozimi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.status.name}
            </span>
          </p>
        </div>
        <div className="space-y-5">
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Tajriba:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.experience}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Gender:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.gender}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Email:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.email}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Telefon raqami:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.phone}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Turmush qurgan:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.isMarried}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            O'qish:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.study}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Yaratilgan vaqti:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {typeof teacherData?.createAt === "string" &&
              teacherData.createAt.includes("T")
                ? `${teacherData.createAt.split("T")[0].split(".")[0]} / ${
                    teacherData.createAt.split("T")[1].split(".")[0]
                  }`
                : "Noma'lum"}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Yo'nalish nomi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.stack.name}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Viloyat nomi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {teacherData?.region.name}
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
        onOk={handleDeleteTeacher}
        title={"O'ylab ko'r! 😒"}
      ></Modal>
    </div>
  );
};

export default TeacherMore;
