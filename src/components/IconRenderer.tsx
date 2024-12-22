import icons from "./Icons";

interface IconRendererProps {
  language: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ language }) => {
  let IconComponent = icons[language.toLowerCase().split(" ").join("")]; // Match case-insensitively
  if(language.toLowerCase() === "c#" )
    IconComponent = icons["csharp"]

    if (language.toLowerCase() === "c++")
      IconComponent = icons["cpp"];

  if (!IconComponent) {
    IconComponent = icons["generic"];
  }
  return (
    <img
      src={IconComponent}
      alt={language}
      className="h-6 w-6"
    />
  );
};

export default IconRenderer;
