export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
}

// Vite 会自动处理这些 import 的路径（加上 base 前缀）
import fairMirrorImg from '@/assets/FairMirror.png';
import circuitAiStudioImg from '@/assets/circuit-ai-studio.png';
import huiyanImg from '@/assets/huiyan.png';
import connect6Img from '@/assets/connect6.png';
import weatherImg from '@/assets/weather-query-application.png';
import markdownImg from '@/assets/markdown-editor.png';
import todoImg from '@/assets/to-do-list-app.png';
import busSchedulingImg from '@/assets/bus-scheduling.png';

export const projects: Project[] = [
  {
    id: 1,
    name: "FairMirror",
    description:
      "以AI对抗AI偏见为核心理念的全链路招聘公平性审计平台。自动检测、量化、消除JD、简历筛选、AI面试、录用决策中的算法歧视，为企业与求职者提供双向公平保护与合规能力。",
    image: fairMirrorImg,
    techStack: ["Python", "AI", "NLP", "公平性审计", "招聘科技"],
    githubUrl: "https://github.com/25sui/FairMirror",
    demoUrl: "https://25sui.github.io/FairMirror",
  },
  {
    id: 2,
    name: "Circuit AI Studio",
    description:
      "基于 React 的电子仿真工具，集成 DeepSeek AI API，实现带3层JSON解析和降级策略的智能电路设计助手，支持 AI 驱动的原理图生成与仿真。",
    image: circuitAiStudioImg,
    techStack: ["TypeScript", "React", "DeepSeek AI", "电路仿真", "FastAPI"],
    githubUrl: "https://github.com/25sui/circuit-ai-studio",
  },
  {
    id: 3,
    name: "HuiYan Traffic v6.0",
    description:
      "AI 智能交通视频分析系统，基于 YOLOv8 实现实时车辆检测与跟踪、交通流量统计、违章识别，支持多路视频流接入与可视化大屏展示。",
    image: huiyanImg,
    techStack: ["Python", "YOLOv8", "OpenCV", "交通视频分析", "目标检测"],
    githubUrl: "https://github.com/25sui/huiyan-traffic",
  },
  {
    id: 4,
    name: "六子棋博弈系统",
    description:
      "计算机博弈赛六子棋赛道实现，基于 C++ 开发的高性能博弈引擎，实现 Alpha-Beta 剪枝搜索算法，支持多种开局库与评估函数优化。",
    image: connect6Img,
    techStack: ["C++", "博弈算法", "Alpha-Beta剪枝", "AI", "计算机博弈"],
    githubUrl: "https://github.com/25sui/connect6",
  },
  {
    id: 5,
    name: "天气查询应用",
    description:
      "基于 React + TypeScript + Vite + Tailwind CSS 的天气查询应用，支持当前天气、未来预报、自动定位、城市收藏，数据通过 OpenWeatherMap API 获取。",
    image: weatherImg,
    techStack: ["TypeScript", "React", "Tailwind CSS", "OpenWeatherMap API", "Vite"],
    githubUrl: "https://github.com/25sui/Weather-Query-Application",
    demoUrl: "https://25sui.github.io/Weather-Query-Application",
  },
  {
    id: 6,
    name: "Markdown 笔记应用",
    description:
      "基于 React + TypeScript + Vite 开发的在线 Markdown 笔记应用，支持实时编辑预览、代码高亮、笔记管理、本地数据持久化，无需后端即可离线使用。",
    image: markdownImg,
    techStack: ["TypeScript", "React", "Markdown", "Vite", "本地存储"],
    githubUrl: "https://github.com/25sui/markdown-notes",
    demoUrl: "https://25sui.github.io/markdown-notes",
  },
  {
    id: 7,
    name: "ToDo 待办清单",
    description:
      "功能丰富的待办事项管理工具，支持任务创建、多维度筛选、搜索、统计与本地数据持久化，帮助用户高效管理日常任务，提升工作与生活效率。",
    image: todoImg,
    techStack: ["TypeScript", "React", "任务管理", "本地存储", "Vite"],
    githubUrl: "https://github.com/25sui/To_do-List-App",
    demoUrl: "https://25sui.github.io/To_do-List-App",
  },
  {
    id: 8,
    name: "公交智能调度优化系统",
    description:
      "基于NSGA-II多目标遗传算法构建公交智能调度优化系统，通过LSTM深度学习模型实现客流预测，在降低乘客等待时间的同时减少运营碳排放。技术栈：LSTM预测 + NSGA-II多目标优化 + FastAPI后端服务 + Vue 3前端可视化，完整覆盖GTFS数据解析、模型训练、排班优化与交互展示全流程。",
    image: busSchedulingImg,
    techStack: ["Python", "PyTorch", "LSTM", "NSGA-II", "FastAPI", "Vue 3", "ECharts"],
    githubUrl: "https://github.com/25sui/bus-scheduling-optimization",
  },
];
