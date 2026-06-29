export interface Skill {
  name: string;
  icon: string; // emoji icon
  level: number; // 1-100 (百分比)
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// 分类技能（用于 Skills 展示区）
export const skillCategories: SkillCategory[] = [
  {
    category: "编程语言",
    skills: [
      { name: "Python", icon: "🐍", level: 90 },
      { name: "TypeScript", icon: "💙", level: 80 },
      { name: "JavaScript", icon: "💛", level: 80 },
      { name: "C++", icon: "⚡", level: 75 },
      { name: "HTML/CSS", icon: "🎨", level: 85 },
    ],
  },
  {
    category: "前端开发",
    skills: [
      { name: "React", icon: "⚛️", level: 80 },
      { name: "Vue.js", icon: "💚", level: 65 },
      { name: "Tailwind CSS", icon: "🌊", level: 85 },
      { name: "Vite", icon: "⚡", level: 80 },
      { name: "Framer Motion", icon: "🎬", level: 60 },
    ],
  },
  {
    category: "AI / 机器学习",
    skills: [
      { name: "YOLOv8", icon: "👁️", level: 85 },
      { name: "OpenCV", icon: "📷", level: 80 },
      { name: "DeepSeek AI", icon: "🤖", level: 80 },
      { name: "NLP", icon: "🧠", level: 65 },
      { name: "Streamlit", icon: "📊", level: 85 },
    ],
  },
  {
    category: "后端 / 工具",
    skills: [
      { name: "FastAPI", icon: "🚀", level: 80 },
      { name: "Node.js", icon: "🟢", level: 65 },
      { name: "Git/GitHub", icon: "🐙", level: 85 },
      { name: "OpenVINO", icon: "🔧", level: 60 },
      { name: "Linux", icon: "🐧", level: 70 },
    ],
  },
];

// 扁平技能列表（用于 About 区进度条展示）
export const skills: Skill[] = [
  { name: "Python", icon: "🐍", level: 90 },
  { name: "TypeScript", icon: "💙", level: 80 },
  { name: "React", icon: "⚛️", level: 80 },
  { name: "YOLOv8", icon: "👁️", level: 85 },
  { name: "C++", icon: "⚡", level: 75 },
  { name: "FastAPI", icon: "🚀", level: 80 },
  { name: "Tailwind CSS", icon: "🌊", level: 85 },
  { name: "Git/GitHub", icon: "🐙", level: 85 },
];

