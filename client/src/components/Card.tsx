import axios from "axios";
import { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { ImParagraphCenter } from "react-icons/im";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import Modal from "./Modal";

interface DummyTypes {
  userId: string;
  clientName: string;
  name: string;
  chat: number;
  text: string;
}

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}-${date}-${year}`;
}
const Card = ({ text, userId, clientName, name, chat }: DummyTypes) => {
  const [currentDate] = useState(getDate());
  const [Count, setCount] = useState<Number>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  axios.defaults.withCredentials = true;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("attachments", file);
    }
    formData.append("userId", String(userId));
    formData.append("text", String(text));

    try {
      const response = await axios.post(
        "https://frontend-api-eight.vercel.app/upload",
        formData
      );
      console.log(response);
      if (response.data.success) {
        closeModal();
        alert("Attachment uploaded succesfully");
      } else {
        closeModal();
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://frontend-api-eight.vercel.app/count/${Number(userId)}/${text}`
      );
      setCount(response.data.count);
    };
    getData();
  }, [handleUpload]);

  return (
    <div className="w-full h-fit bg-white p-2 space-y-5">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center space-x-1">
          <div className="rounded-full overflow-hidden w-5 h-5">
            <img
              src="https://media.istockphoto.com/id/1486061103/photo/portrait-of-young-man.webp?b=1&s=170667a&w=0&k=20&c=pG51BTMKMMCf3Uz3NRGjLCK3BFNYzUAB_aVKN0eopo8="
              alt=""
              className="object-cover scale-150"
            />
          </div>
          <h4 className="text-xs font-medium">{clientName}</h4>
        </div>
        <div className="flex justify-center items-center space-x-1">
          <div className="rounded-full overflow-hidden w-5 h-5">
            <img
              src="https://img.freepik.com/free-photo/medium-shot-male-flight-attendant-posing_23-2150312701.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704844800&semt=ais"
              alt=""
              className="object-cover scale-120"
            />
          </div>
          <h4 className="text-xs font-medium"> {name} </h4>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center space-x-1">
          <div>
            <ImParagraphCenter />
          </div>
          <div className="text-sm ">
            {`Lorem ipsum dolor sit amet...`.slice(0, 20)}...
          </div>
        </div>
        <div className="flex justify-center items-center space-x-1 bg-gray-100 py-1 px-1">
          <div>
            <FaClipboardList />
          </div>
          <div className="text-xs">1/2</div>
        </div>
      </div>
      <div className="flex justify-start items-center space-x-3">
        <div className="rounded-full overflow-hidden w-5 h-5">
          <img
            src="https://media.istockphoto.com/id/1486061103/photo/portrait-of-young-man.webp?b=1&s=170667a&w=0&k=20&c=pG51BTMKMMCf3Uz3NRGjLCK3BFNYzUAB_aVKN0eopo8="
            alt=""
            className="object-cover scale-150"
          />
        </div>
        <div className="rounded-full overflow-hidden w-5 h-5">
          <img
            src="https://media.istockphoto.com/id/1486061103/photo/portrait-of-young-man.webp?b=1&s=170667a&w=0&k=20&c=pG51BTMKMMCf3Uz3NRGjLCK3BFNYzUAB_aVKN0eopo8="
            alt=""
            className="object-cover scale-150"
          />
        </div>
        <div className="rounded-full bg-gray-100 w-5 h-5 text-[10px] flex justify-center items-center">
          12+
        </div>
        <div className="flex justify-center items-center space-x-1">
          <div className="">
            <IoChatbubblesOutline />
          </div>
          <span className="text-[10px]">{chat}</span>
        </div>
        <div className="flex justify-center items-center space-x-1">
          <button className="rotate-45" onClick={openModal}>
            <MdOutlineAttachFile />
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            handleUpload={handleUpload}
          >
            <div>
              <input type="file" multiple onChange={handleFileChange} />
              {selectedFiles.length > 0 && (
                <div>
                  <p>Selected Files:</p>
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <li key={index}>
                        {file.name} - {file.type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Modal>
          <span className="text-[10px]"> {Number(Count)} </span>
        </div>
        <div className="flex justify-center items-center space-x-1">
          <div className="">
            <SlCalender />
          </div>
          <span className="text-[10px]">{currentDate}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
