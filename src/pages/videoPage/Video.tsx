import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarIcon,
  CheckCircle2Icon,
  FolderKanbanIcon,
  MapPinIcon,
  PlayIcon,
  StarIcon,
  Trash2Icon,
  UploadCloudIcon,
  VideoIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

// --- Mock Data ---
interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
}
const MOCK_PROJECTS: Project[] = [
  {
    id: "PRJ-01",
    name: "Biệt thự Thảo Điền",
    description: "Lắp đặt cửa gỗ tự nhiên Sồi Nga",
    location: "Quận 2, TP.HCM",
    date: "15/10/2023",
  },
  {
    id: "PRJ-02",
    name: "Chung cư Vinhomes Central Park",
    description: "Cửa nhôm Xingfa hệ 55 toàn bộ căn hộ",
    location: "Bình Thạnh, TP.HCM",
    date: "08/10/2023",
  },
  {
    id: "PRJ-03",
    name: "Nhà phố Lakeview City",
    description: "Cửa thép vân gỗ và cửa kính cường lực",
    location: "Quận 2, TP.HCM",
    date: "25/09/2023",
  },
  {
    id: "PRJ-04",
    name: "Văn phòng Bitexco Tower",
    description: "Hệ thống cửa kính cường lực văn phòng",
    location: "Quận 1, TP.HCM",
    date: "12/09/2023",
  },
  {
    id: "PRJ-05",
    name: "Resort Mũi Né",
    description: "Cửa gỗ tự nhiên và cửa nhôm cao cấp",
    location: "Phan Thiết, Bình Thuận",
    date: "01/09/2023",
  },
];
interface VideoItem {
  id: string;
  projectId: string;
  title: string;
  duration: string;
  date: string;
  color: string;
  isFeature: boolean;
}
const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: "VID-01",
    projectId: "PRJ-01",
    title: "Tổng quan dự án biệt thự",
    duration: "2:45",
    date: "16/10/2023",
    color: "bg-slate-800",
    isFeature: true,
  },
  {
    id: "VID-02",
    projectId: "PRJ-01",
    title: "Quá trình lắp đặt cửa gỗ Sồi",
    duration: "5:12",
    date: "16/10/2023",
    color: "bg-zinc-800",
    isFeature: false,
  },
  {
    id: "VID-03",
    projectId: "PRJ-02",
    title: "Hoàn thiện căn hộ 3PN",
    duration: "3:20",
    date: "09/10/2023",
    color: "bg-neutral-800",
    isFeature: true,
  },
  {
    id: "VID-04",
    projectId: "PRJ-02",
    title: "Review từ chủ nhà",
    duration: "1:45",
    date: "10/10/2023",
    color: "bg-stone-800",
    isFeature: false,
  },
  {
    id: "VID-05",
    projectId: "PRJ-03",
    title: "Lắp đặt cửa thép vân gỗ mặt tiền",
    duration: "4:10",
    date: "26/09/2023",
    color: "bg-slate-900",
    isFeature: true,
  },
  {
    id: "VID-06",
    projectId: "PRJ-04",
    title: "Hệ thống vách kính văn phòng",
    duration: "6:30",
    date: "13/09/2023",
    color: "bg-zinc-900",
    isFeature: true,
  },
  {
    id: "VID-07",
    projectId: "PRJ-05",
    title: "Toàn cảnh resort sau thi công",
    duration: "3:50",
    date: "05/09/2023",
    color: "bg-neutral-900",
    isFeature: true,
  },
];
// --- Animations ---
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};
const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
} as const;
export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [uploadProjectId, setUploadProjectId] = useState<string>("");
  // --- Handlers ---
  const handleSetFeature = (videoId: string, projectId: string) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v.projectId === projectId) {
          return {
            ...v,
            isFeature: v.id === videoId,
          };
        }
        return v;
      }),
    );
  };
  const handleDelete = (videoId: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== videoId));
  };
  // --- Derived State ---
  const videoCountByProject = useMemo(() => {
    const counts: Record<string, number> = {};
    videos.forEach((v) => {
      counts[v.projectId] = (counts[v.projectId] || 0) + 1;
    });
    return counts;
  }, [videos]);
  const filteredVideos = useMemo(() => {
    if (!selectedProjectId) return videos;
    return videos.filter((v) => v.projectId === selectedProjectId);
  }, [videos, selectedProjectId]);
  const groupedVideos = useMemo(() => {
    const groups: Record<string, VideoItem[]> = {};
    filteredVideos.forEach((v) => {
      if (!groups[v.projectId]) groups[v.projectId] = [];
      groups[v.projectId].push(v);
    });
    return groups;
  }, [filteredVideos]);
  const totalVideos = videos.length;
  const totalProjectsWithVideos = Object.keys(videoCountByProject).length;
  return (
    <div className="space-y-8 pb-12">
      {/* --- Upload Section --- */}
      <Card className="overflow-hidden border-amber-900/10">
        <div className="bg-amber-50/50 border-b border-amber-100 px-6 py-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <UploadCloudIcon className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-amber-900">
              Tải video dự án mới
            </h2>
            <p className="text-xs text-amber-700/70">
              Thêm video thực tế vào hồ sơ năng lực
            </p>
          </div>
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
          {/* Project Selector for Upload */}
          <div className="w-full md:w-1/3 space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              1. Chọn dự án <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                value={uploadProjectId}
                onChange={(e) => setUploadProjectId(e.target.value)}
              >
                <option value="" disabled>
                  -- Chọn dự án --
                </option>
                {MOCK_PROJECTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {uploadProjectId && (
              <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-md border border-emerald-100">
                <CheckCircle2Icon className="h-4 w-4" />
                <span>Đã chọn dự án để tải lên</span>
              </div>
            )}
          </div>

          {/* Dropzone */}
          <div className="w-full md:w-2/3 space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              2. Chọn file video
            </label>
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors",
                uploadProjectId
                  ? "border-amber-300 bg-amber-50/30 hover:bg-amber-50/50 cursor-pointer"
                  : "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed",
              )}
            >
              <div
                className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center mb-3",
                  uploadProjectId
                    ? "bg-amber-100 text-amber-600"
                    : "bg-slate-200 text-slate-400",
                )}
              >
                <VideoIcon className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-slate-900 mb-1">
                Kéo thả video vào đây
              </p>
              <p className="text-xs text-slate-500 mb-4">
                Hỗ trợ MP4, MOV, WEBM (Tối đa 100MB)
              </p>
              <Button disabled={!uploadProjectId} size="sm">
                Chọn file từ máy tính
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* --- Filter & Stats Section --- */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <FolderKanbanIcon className="h-5 w-5 text-slate-500" />
              Video dự án mẫu
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Tổng cộng{" "}
              <span className="font-medium text-slate-900">{totalVideos}</span>{" "}
              video thuộc{" "}
              <span className="font-medium text-slate-900">
                {totalProjectsWithVideos}
              </span>{" "}
              dự án
            </p>
          </div>
        </div>

        {/* Horizontal Tabs */}
        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 hide-scrollbar gap-2">
          <button
            onClick={() => setSelectedProjectId(null)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border",
              selectedProjectId === null
                ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300",
            )}
          >
            Tất cả dự án
            <span
              className={cn(
                "ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs",
                selectedProjectId === null
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500",
              )}
            >
              {totalVideos}
            </span>
          </button>

          {MOCK_PROJECTS.map((project) => {
            const count = videoCountByProject[project.id] || 0;
            if (count === 0) return null; // Hide projects with no videos
            const isSelected = selectedProjectId === project.id;
            return (
              <button
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                  isSelected
                    ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300",
                )}
              >
                {project.name}
                <span
                  className={cn(
                    "ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- Video Grid --- */}
      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {Object.entries(groupedVideos).map(([projectId, projectVideos]) => {
            const project = MOCK_PROJECTS.find((p) => p.id === projectId);
            if (!project) return null;
            return (
              <motion.div
                key={projectId}
                layout
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="space-y-4"
              >
                {/* Section Header (only show if viewing "All") */}
                {!selectedProjectId && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="text-base font-semibold text-slate-800">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {project.date}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="default"
                      className="text-xs shrink-0 self-start sm:self-auto"
                    >
                      {projectVideos.length} video
                    </Badge>
                  </div>
                )}

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {projectVideos.map((video) => (
                      <motion.div
                        key={video.id}
                        layout
                        variants={itemVariants}
                        className="group relative"
                      >
                        <Card className="overflow-hidden border-slate-200/60 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-900/5 transition-all duration-300">
                          {/* Video Thumbnail Area */}
                          <div
                            className={cn(
                              "aspect-video w-full relative overflow-hidden",
                              video.color,
                            )}
                          >
                            {/* Play Button Overlay (Always visible) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-amber-500/90 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                <PlayIcon className="h-5 w-5 text-white fill-white ml-1" />
                              </div>
                            </div>

                            {/* Duration Badge */}
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded backdrop-blur-sm">
                              {video.duration}
                            </div>

                            {/* Featured Badge */}
                            {video.isFeature && (
                              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-medium shadow-md shadow-amber-900/20">
                                <StarIcon className="h-3.5 w-3.5 fill-current" />
                                <span>Video nổi bật</span>
                              </div>
                            )}

                            {/* Hover Overlay Actions */}
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                              {!video.isFeature && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    handleSetFeature(video.id, video.projectId)
                                  }
                                  className="h-10 w-10 rounded-full bg-white/10 border-white/20 text-white hover:bg-amber-500 hover:border-amber-500 hover:text-white"
                                  title="Đặt làm video nổi bật"
                                >
                                  <StarIcon className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="default"
                                size="icon"
                                onClick={() => handleDelete(video.id)}
                                className="h-10 w-10 rounded-full shadow-lg"
                                title="Xóa video"
                              >
                                <Trash2Icon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Card Footer */}
                          <div className="p-4 bg-white">
                            <h4
                              className="text-sm font-semibold text-slate-900 mb-1 line-clamp-1"
                              title={video.title}
                            >
                              {video.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span>{video.id}</span>
                              <span>Tải lên: {video.date}</span>
                            </div>
                            {/* Show project name if viewing specific project */}
                            {selectedProjectId && (
                              <p
                                className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-100 truncate"
                                title={project.name}
                              >
                                Dự án: {project.name}
                              </p>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <VideoIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-slate-900">
              Không có video nào
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Dự án này chưa có video. Hãy tải lên video mới.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
