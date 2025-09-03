import { useState, type FormEvent } from "react";
import { CreateCaption, UploadFile } from "../../components";
import { Input } from "antd";
import { instance } from "../../hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StacksCreate = () => {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleCreateStack(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const data = { image, name };
    instance()
      .post("/stacks", data)
      .then(() => {
        toast.success("Muvaffaqatli saqlandi", {
          onClose: () => {
            setIsLoading(false);
            navigate(-1);
          },
          autoClose: 1000,
        });
      });
  }

  return (
    <form onSubmit={handleCreateStack} className="p-5">
      <CreateCaption isLoading={isLoading} title="Yo'nalish" />
      <div className="mt-[50px] flex flex-col items-center justify-center">
        <UploadFile setImage={setImage} />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="!mt-[40px] !w-[25%]"
          size="large"
          placeholder="Yo'nalish nomini kiriting"
        />
      </div>
    </form>
  );
};

export default StacksCreate;
