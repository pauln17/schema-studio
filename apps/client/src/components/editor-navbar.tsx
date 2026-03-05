interface EditorNavbarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function EditorNavbar({ activeTab, onTabChange }: EditorNavbarProps) {
    return (
        <div className="flex items-center justify-between px-4 border-b border-white/[0.06] bg-black">
            {/* Left: Tabs */}
            <div className="flex items-center">
                {/* Editor */}
                <button
                    onClick={() => onTabChange('editor')}
                    className={`relative px-5 py-3.5 text-base font-medium transition-colors cursor-pointer ${activeTab === 'editor'
                        ? 'text-white'
                        : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                >
                    Editor
                    {activeTab === 'editor' && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
                    )}
                </button>

                {/* SQL */}
                <button
                    onClick={() => onTabChange('sql')}
                    className={`relative px-5 py-3.5 text-base font-medium transition-colors cursor-pointer ${activeTab === 'sql'
                        ? 'text-white'
                        : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                >
                    SQL
                    {activeTab === 'sql' && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
                    )}
                </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5">
                {/* Undo */}
                <button className="p-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors" title="Undo">
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a5 5 0 015 5v2M3 10l4-4m-4 4l4 4" />
                    </svg>
                </button>
                {/* Redo */}
                <button className="p-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors" title="Redo">
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a5 5 0 00-5 5v2m15-7l-4-4m4 4l-4 4" />
                    </svg>
                </button>

                <div className="w-px h-5 bg-white/[0.1] mx-2" />

                {/* Share */}
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-neutral-300 border border-white/[0.1] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.2] transition-colors" title="Share">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                </button>
            </div>
        </div>
    );
}
