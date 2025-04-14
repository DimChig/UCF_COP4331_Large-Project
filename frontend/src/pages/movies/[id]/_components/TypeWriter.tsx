import { TypeAnimation } from "react-type-animation";

const TypewriterText = ({ text }: { text: string }) => {
  return (
    <div className="relative flex ">
      <div className="opacity-0">{text}</div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
        <TypeAnimation sequence={[text]} speed={99} />
      </div>
    </div>
  );
};

export default TypewriterText;
