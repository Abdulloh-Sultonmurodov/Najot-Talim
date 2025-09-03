import { useEffect, useState } from "react";
import { PageCaption, StackSkeleton } from "../../components";
import { API, instance } from "../../hooks";
import { Button, Card, Modal, message } from "antd";
import type { StackType } from "../../@types/StacksType";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const Stacks = () => {
  const [stacks, setStacks] = useState<Array<StackType>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedStack, setSelectedStack] = useState<StackType | null>(null);

  const showDeleteModal = (stack: StackType) => {
    setSelectedStack(stack);
    setModal(true);
  };

  const handleDelete = async () => {
    if (!selectedStack) return;
    try {
      await instance().delete(`/stacks/${selectedStack.id}`);
      setStacks((prev) => prev.filter((s) => s.id !== selectedStack.id));
      message.success("Yo'nalish o'chirildi!");
    } catch (error) {
      message.error("O'chirishda xatolik yuz berdi");
    }
    setModal(false);
    setSelectedStack(null);
  };

  useEffect(() => {
    setLoading(true);
    instance()
      .get("/stacks")
      .then((res) => {
        setStacks(res.data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-5">
      <div className="bg-white overflow-y-auto h-[88vh] p-5 rounded-md">
        <PageCaption title="Yo'nalishlar" count={stacks.length} />
        <div className="flex justify-between gap-5 flex-wrap mt-[20px]">
          {loading ? (
            <StackSkeleton />
          ) : (
            stacks.map((item) => (
              <Card
                key={item.id}
                hoverable
                style={{ width: 260 }}
                cover={
                  <img
                    className="h-[200px] object-cover"
                    alt="Stack image"
                    src={`${API}/file/${item.image}`}
                  />
                }
              >
                <Card.Meta
                  title={item.name}
                  description={`Yaratilgan sana: ${
                    item.createdAt.split("T")[0]
                  }`}
                />
                <div className="flex items-center justify-between mt-[20px]">
                  <Button
                    className="!bg-yellow-600 !w-[30%]"
                    type="primary"
                    size="large"
                    icon={<EditFilled className="!text-[20px]" />}
                  ></Button>
                  <Button
                    className="!bg-red-700 !w-[30%]"
                    type="primary"
                    size="large"
                    icon={<DeleteFilled className="!text-[20px]" />}
                    onClick={() => showDeleteModal(item)}
                  ></Button>
                </div>
              </Card>
            ))
          )}
          <Modal
            title="O'chirishni tasdiqlang"
            open={modal}
            onOk={handleDelete}
            onCancel={() => setModal(false)}
            okText="O'chirish"
            cancelText="Bekor qilish"
          >
            <p>Rostdan ham ushbu yo'nalishni o'chirmoqchimisiz?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Stacks;
