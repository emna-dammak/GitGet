import JavaScriptIcon from "@/assets/icons/Javascript.svg";
import TypeScriptIcon from "@/assets/icons/Typescript.svg";
import JavaIcon from "@/assets/icons/JAVA.svg";
import HTMLIcon from "@/assets/icons/HTML.svg";
import CSSIcon from "@/assets/icons/CSS.svg";
import PythonIcon from "@/assets/icons/Python.svg";
import CIcon from "@/assets/icons/C.svg";
import CppIcon from "@/assets/icons/C++.svg";
import CSharpIcon from "@/assets/icons/CSharp.svg";
import CoffeeScriptIcon from "@/assets/icons/CoffeeScript.svg";
import GoIcon from "@/assets/icons/GO.svg";
import KotlinIcon from "@/assets/icons/Kotlin.svg";
import DartIcon from "@/assets/icons/DART.svg";
import RubyIcon from "@/assets/icons/RUBY.svg";
import RustIcon from "@/assets/icons/RUST.svg";
import SwiftIcon from "@/assets/icons/Swift.svg";
import PHPIcon from "@/assets/icons/PHP.svg";
import ShellIcon from "@/assets/icons/SHELL.svg";
import ElixirIcon from "@/assets/icons/Elixir.svg";
import GroovyIcon from "@/assets/icons/Groovy.svg";
import ScalaIcon from "@/assets/icons/Scala.svg";
import LuaIcon from "@/assets/icons/LUA.svg";
import HandlebarsIcon from "@/assets/icons/Handlebars.svg";
import HCLIcon from "@/assets/icons/HCL.svg";
import JuliaIcon from "@/assets/icons/Julia.svg";
import JupyterNotebookIcon from "@/assets/icons/JupyterNotebook.svg";
import MonkeyCIcon from "@/assets/icons/MonkeyC.svg";
import ObjectiveCIcon from "@/assets/icons/ObjectiveC.svg";
import PowerShellIcon from "@/assets/icons/Powershell.svg";
import SQFIcon from "@/assets/icons/SQF.svg";
import TexIcon from "@/assets/icons/TeX.svg";
import VimScriptsIcon from "@/assets/icons/VimScripts.svg";
import ZILIcon from "@/assets/icons/ZIL.svg";
import PerlIcon from "@/assets/icons/Perl.svg";
import RIcon from "@/assets/icons/R.svg";
import AssemblyIcon from "@/assets/icons/Assembly.svg";
import DockerFileIcon from "@/assets/icons/Dockerfile.svg";
import EJSIcon from "@/assets/icons/EJS.svg";
import MakefileIcom from "@/assets/icons/Makefile.svg";
import MDXIcon from "@/assets/icons/MDX.svg";
import SCSSIcon from "@/assets/icons/SCSS.svg";



import GenericIcon from "@/assets/icons/Generic.svg";

type IconsMap = {
  [key: string]: string;
};

/**
 * A mapping of programming language names to their corresponding icon components.
 * 
 * @type {IconsMap}
 * 
 * @property {React.ComponentType} javascript - Icon for JavaScript.
 * @property {React.ComponentType} typescript - Icon for TypeScript.
 * @property {React.ComponentType} java - Icon for Java.
 * @property {React.ComponentType} html - Icon for HTML.
 * @property {React.ComponentType} css - Icon for CSS.
 * @property {React.ComponentType} python - Icon for Python.
 * @property {React.ComponentType} generic - Generic icon for unspecified languages.
 * @property {React.ComponentType} c - Icon for C.
 * @property {React.ComponentType} cpp - Icon for C++.
 * @property {React.ComponentType} csharp - Icon for C#.
 * @property {React.ComponentType} coffeescript - Icon for CoffeeScript.
 * @property {React.ComponentType} go - Icon for Go.
 * @property {React.ComponentType} kotlin - Icon for Kotlin.
 * @property {React.ComponentType} dart - Icon for Dart.
 * @property {React.ComponentType} ruby - Icon for Ruby.
 * @property {React.ComponentType} rust - Icon for Rust.
 * @property {React.ComponentType} swift - Icon for Swift.
 * @property {React.ComponentType} php - Icon for PHP.
 * @property {React.ComponentType} shell - Icon for Shell scripting languages.
 * @property {React.ComponentType} elixir - Icon for Elixir.
 * @property {React.ComponentType} groovy - Icon for Groovy.
 * @property {React.ComponentType} scala - Icon for Scala.
 * @property {React.ComponentType} lua - Icon for Lua.
 * @property {React.ComponentType} handlebars - Icon for Handlebars.
 * @property {React.ComponentType} hcl - Icon for HCL.
 * @property {React.ComponentType} julia - Icon for Julia.
 * @property {React.ComponentType} jupyternotebook - Icon for Jupyter Notebook.
 * @property {React.ComponentType} monkeyc - Icon for Monkey C.
 * @property {React.ComponentType} objectivec - Icon for Objective-C.
 * @property {React.ComponentType} powershell - Icon for PowerShell.
 * @property {React.ComponentType} sqf - Icon for SQF.
 * @property {React.ComponentType} tex - Icon for TeX.
 * @property {React.ComponentType} vimscripts - Icon for Vim scripts.
 * @property {React.ComponentType} zil - Icon for ZIL.
 * @property {React.ComponentType} perl - Icon for Perl.
 * @property {React.ComponentType} r - Icon for R.
 * @property {React.ComponentType} assembly - Icon for Assembly.
 * @property {React.ComponentType} dockerfile - Icon for Dockerfile.
 * @property {React.ComponentType} ejs - Icon for EJS.
 * @property {React.ComponentType} makefile - Icon for Makefile.
 * @property {React.ComponentType} mdx - Icon for MDX.
 * @property {React.ComponentType} scss - Icon for SCSS.

 */
const icons: IconsMap = {
  javascript: JavaScriptIcon,
  typescript: TypeScriptIcon,
  java: JavaIcon,
  html: HTMLIcon,
  css: CSSIcon,
  python: PythonIcon,
  generic: GenericIcon,
  c: CIcon,
  cpp: CppIcon,
  csharp: CSharpIcon,
  coffeescript: CoffeeScriptIcon,
  go: GoIcon,
  kotlin: KotlinIcon,
  dart: DartIcon,
  ruby: RubyIcon,
  rust: RustIcon,
  swift: SwiftIcon,
  php: PHPIcon,
  shell: ShellIcon,
  elixir: ElixirIcon,
  groovy: GroovyIcon,
  scala: ScalaIcon,
  lua: LuaIcon,
  handlebars: HandlebarsIcon,
  hcl: HCLIcon,
  julia: JuliaIcon,
  jupyternotebook: JupyterNotebookIcon,
  monkeyc: MonkeyCIcon,
  objectivec: ObjectiveCIcon,
  powershell: PowerShellIcon,
  sqf: SQFIcon,
  tex: TexIcon,
  vimscripts: VimScriptsIcon,
  zil: ZILIcon,
  perl: PerlIcon,
  r: RIcon,
  assembly: AssemblyIcon,
  dockerfile: DockerFileIcon,
  ejs: EJSIcon,
  makefile: MakefileIcom,
  mdx: MDXIcon,
  scss: SCSSIcon,
};

export default icons;