import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../hooks";
import { toast } from "react-toastify";
import type { GroupsType } from "../../../@types/GroupsType";

const GroupMore = () => {
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState<GroupsType>();
  const { id } = useParams();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  //   Shu stack Id ga teng bo'lgan Stackni, singleStack get all
  useEffect(() => {
    instance()
      .get(`/groups/${id}`)
      .then((res) => {
        setGroupData(res.data);
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
      .delete(`/groups/${deleteId}`)
      .then(() => {
        toast.success("O'chirildi!", {
          onClose: () => {
            navigate(-1);
          },
          autoClose: 1000,
        });
      })
      .finally(() => {
        setDeleteLoading(false);
        setDeleteModal(false);
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
            <span className="font-bold text-[#bc8e5b]">{groupData?.id}</span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Yo'nalish IDsi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {groupData?.stackId}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Ismi:{" "}
            <span className="font-bold text-[#bc8e5b]">{groupData?.name}</span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Holati:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {groupData?.status}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Xona IDsi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {groupData?.roomId}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Yo'nalish nomi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {groupData?.stack.name}
            </span>
          </p>
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Xona nomi:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {groupData?.room.name}
            </span>
          </p>
        </div>
        <div className="space-y-5">
          <p className="border-[1px] w-[350px] rounded-md p-2 font-semibold flex justify-between">
            Yaratilgan vaqti:{" "}
            <span className="font-bold text-[#bc8e5b]">
              {groupData?.createdAt.split("T")[0].split(".")[0]} /{" "}
              {groupData?.createdAt.split("T")[1].split(".")[0]}
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

export default GroupMore;
