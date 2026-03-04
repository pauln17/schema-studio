import Image from "next/image";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center p-4 text-white border-b-1">
            <div className="flex items-center gap-16">
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Schema" width={50} height={50} />
                    <h1 className="text-2xl">Schema Studio</h1>
                </div>
                <div className="flex items-end gap-8 text-lg mt-0.5">
                    <h1>Editor</h1>
                    <h1>Convert SQL</h1>
                    <h1>Parse SQL</h1>
                </div>
            </div>
            <Image src="/github.png" alt="GitHub" width={30} height={30} onClick={() => window.open("https://github.com/pauln17/schema-viewer", "_blank", "noopener, noreferrer")} className="cursor-pointer" />
        </div >
    );
}