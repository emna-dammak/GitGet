import icons from "./Icons";

interface IconRendererProps {
  language: string;
}

/**
 * IconRenderer component renders an icon based on the provided programming language.
 *
 * @component
 * @param {IconRendererProps} props - The properties for the IconRenderer component.
 * @param {string} props.language - The programming language for which the icon should be rendered.
 *
 * @returns {JSX.Element} An image element displaying the corresponding icon for the given language.
 *
 * The component attempts to match the provided language case-insensitively and handles special cases for:
 * - "c#" -> "csharp"
 * - "c++" -> "cpp"
 * - "objective-c" -> "objectivec"
 *
 * If no specific icon is found, a generic icon is used.
 */
const IconRenderer: React.FC<IconRendererProps> = ({ language }) => {
  let IconComponent = icons[language.toLowerCase().split(" ").join("")]; // Match case-insensitively
  if(language.toLowerCase() === "c#" )
    IconComponent = icons["csharp"]

    if (language.toLowerCase() === "c++")
      IconComponent = icons["cpp"];
    if (language.toLowerCase() === "objective-c") IconComponent = icons["objectivec"];
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
