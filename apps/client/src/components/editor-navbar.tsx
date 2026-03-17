import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "@/components/modal";
import { Schema } from "@/types/schema";
import { useRouter } from "next/navigation";

interface EditorNavbarProps {
  schema: Schema | null;
  token: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  saveSchema: () => void;
  isPending: boolean;
  isSaved: boolean;
  renameSchema: (name: string) => void;
  onExportSql: () => void;
  onImportSql: () => void;
}

export default function EditorNavbar({
  schema,
  token,
  activeTab,
  onTabChange,
  saveSchema,
  isPending,
  isSaved,
  renameSchema,
  onExportSql,
  onImportSql,
}: EditorNavbarProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `localhost:3000/editor/${token}`;

  const generateLinkMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("No token");
      const res = await fetch("http://localhost:5001/schemas/token", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to generate new token");
      }
      const data = await res.json();
      return data.token as string;
    },
    onSuccess: (newToken) => {
      queryClient.removeQueries({ queryKey: ["schema", token] });
      router.push(`/editor/${newToken}`);
    },
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateLink = () => {
    if (!token) return;
    if (!isSaved) {
      const ok = window.confirm(
        "You have unsaved changes. Generate a new link anyway?"
      );
      if (!ok) return;
    }
    localStorage.setItem("OPEN_SHARE_AFTER_SAVE", "true")
    generateLinkMutation.mutate();
  };

  useEffect(() => {
    if (localStorage.getItem("OPEN_SHARE_AFTER_SAVE")) {
      setIsShareOpen(true);
      localStorage.removeItem("OPEN_SHARE_AFTER_SAVE");
    }
  }, []);

  return (
    <div className="relative flex items-center justify-between px-4 bg-[#070707]">
      {/* Left: Tabs */}
      <div className="flex items-center min-w-0 shrink">
        {/* Editor */}
        <button
          onClick={() => onTabChange("editor")}
          className={`relative px-5 py-3.5 text-base font-medium cursor-pointer transition-colors ${activeTab === "editor"
            ? "text-white"
            : "text-neutral-500 hover:text-neutral-300"
            }`}
        >
          Editor
          {activeTab === "editor" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
          )}
        </button>

        {/* SQL */}
        <button
          onClick={() => onTabChange("sql")}
          className={`relative px-5 py-3.5 text-base font-medium cursor-pointer transition-colors ${activeTab === "sql"
            ? "text-white"
            : "text-neutral-500 hover:text-neutral-300"
            }`}
        >
          SQL
          {activeTab === "sql" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Center: Schema Name*/}
      {token && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <input
            type="text"
            value={schema?.name ?? ""}
            onChange={(e) => renameSchema(e.target.value)}
            placeholder="Untitled"
            className="w-48 px-2 py-1 text-sm text-center font-medium text-neutral-300 bg-transparent border border-transparent rounded hover:border-white/20 focus:border-blue-500/60 focus:outline-none focus:ring-0 placeholder:text-neutral-500"
          />
        </div>
      )}

      {/* Right: Actions - Editor Tab: Undo, Redo, Save, Share | SQL Tab: Import, Export */}
      <div className="flex items-center gap-1.5 shrink-0">
        {activeTab === "editor" ? (
          <>
            <button
              className="p-3 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              title="Undo"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a5 5 0 015 5v2M3 10l4-4m-4 4l4 4" />
              </svg>
            </button>
            {/* Redo */}
            <button
              className="p-3 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              title="Redo"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a5 5 0 00-5 5v2m15-7l-4-4m4 4l-4 4" />
              </svg>
            </button>
            <div className="w-px h-5 bg-white/[0.1] mx-2" />
            <button
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium min-w-[5rem] cursor-pointer transition-colors disabled:opacity-80 ${token && isSaved && !isPending
                ? "text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 cursor-default"
                : "text-white bg-blue-600 hover:bg-blue-500"
                }`}
              title={token ? (isSaved ? "All Changes Saved" : "Save Changes") : "Save and Get Shareable Link"}
              onClick={
                token
                  ? isSaved
                    ? undefined
                    : saveSchema
                  : () => {
                    saveSchema();
                    localStorage.setItem("OPEN_SHARE_AFTER_SAVE", "true");
                  }
              }
              disabled={isPending}
            >
              {isPending ? (
                <span className="w-3.5 h-3.5 shrink-0 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : token && isSaved ? (
                <>
                  <svg
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Saved
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 shrink-0"
                    viewBox="0 0 640 640"
                    fill="currentColor"
                  >
                    <path d="M160 144c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V237.3c0-4.2-1.7-8.3-4.7-11.3L416 150.6V240c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32v-96zm80 0v80h128v-80zM96 160c0-35.3 28.7-64 64-64h242.7c17 0 33.3 6.7 45.3 18.7l77.3 77.3c12 12 18.7 28.3 18.7 45.3V480c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64zm160 224c0-35.3 28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64" />
                  </svg>
                  Save
                </>
              )}
            </button>
            {/* Share */}
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-neutral-300 border border-white/[0.1] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.2] cursor-pointer transition-colors"
              title="Share"
              onClick={
                token ? () => setIsShareOpen(true) : (() => { saveSchema(); localStorage.setItem("OPEN_SHARE_AFTER_SAVE", "true") })
              }
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </button>
          </>
        ) : (
          <>
            {/* Export SQL */}
            <button
              type="button"
              onClick={onExportSql}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-neutral-300 border border-white/[0.1] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.2] cursor-pointer transition-colors"
              title="Export SQL"
            >
              <svg className="w-5 h-5" viewBox="0 0 640 640" fill="currentColor">
                <path d="M352 96c0-17.7-14.3-32-32-32s-32 14.3-32 32v210.7l-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L352 306.7zM160 384c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64v-32c0-35.3-28.7-64-64-64h-46.9l-56.6 56.6c-31.2 31.2-81.9 31.2-113.1 0L206.9 384zm304 56c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24" />
              </svg>
              Export SQL
            </button>
            <button
              type="button"
              onClick={onImportSql}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-neutral-300 border border-white/[0.1] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.2] cursor-pointer transition-colors"
              title="Import SQL"
            >
              <svg className="w-5 h-5" viewBox="0 0 640 640" fill="currentColor">
                <path d="M352 173.3V384c0 17.7-14.3 32-32 32s-32-14.3-32-32V173.3l-41.4 41.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM320 464c44.2 0 80-35.8 80-80h80c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64v-32c0-35.3 28.7-64 64-64h80c0 44.2 35.8 80 80 80m144 24c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24" />
              </svg>
              Import SQL
            </button>
          </>
        )}
      </div>
      <Modal open={isShareOpen} onClose={() => setIsShareOpen(false)}>
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-white">Share Schema</h2>
            <p className="text-xs text-neutral-400">
              Generate a shareable link so others can view this schema.
            </p>
          </div>
          <div className="space-y-2">
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wide">
              Share link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 h-8 px-2 text-xs font-mono rounded-md bg-black/40 border border-white/10 text-neutral-200 placeholder-neutral-600 outline-none focus:border-blue-500/60"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 h-8 text-xs font-medium rounded-md border border-white/12 text-neutral-200 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <div className="pt-1 space-y-1.5">
            <button
              type="button"
              className="w-full h-9 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition-colors"
              disabled={!schema || generateLinkMutation.isPending}
              onClick={handleGenerateLink}
            >
              {generateLinkMutation.isPending
                ? "Generating…"
                : "Generate New Link"}
            </button>
            <p className="text-[11px] text-neutral-500">
              Generating a new link will invalidate the previous one.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
