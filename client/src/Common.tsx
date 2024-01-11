import Card from "./components/Card";
import { dummy } from "./dummy";

interface commonProps {
  text: string;
  color: string;
}
const Common = ({ text, color }: commonProps) => {
  return (
    <div className="bg-gray-100 px-2 py-4 min-w-max w-max space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center space-x-1">
          {text === "Incomplete" && (
            <div className={`w-5 h-5 bg-red-500 rounded-l-full`}></div>
          )}
          {text === "To Do" && (
            <div className={`w-5 h-5 bg-orange-500 rounded-l-full`}></div>
          )}
          {text === "Doing" && (
            <div className={`w-5 h-5 bg-blue-500 rounded-l-full`}></div>
          )}
          {text === "Under Review" && (
            <div className={`w-5 h-5 bg-yellow-500 rounded-l-full`}></div>
          )}
          {text === "Completed" && (
            <div className={`w-5 h-5 bg-green-500 rounded-l-full`}></div>
          )}
          <div>{text}</div>
        </div>
        <div>0</div>
      </div>
      <div className="space-y-3 max-h-[80vh] overflow-y-auto">
        {dummy.map((data, idx) => {
          return (
            <Card
              key={idx}
              userId={data.userId}
              clientName={data.clientName}
              name={data.name}
              chat={data.chat}
              text={text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Common;
