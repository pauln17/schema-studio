import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center p-4 text-white border-b-1">
            <div className="flex items-center gap-16">
                <div className="flex items-center gap-4">
                    <a href="/"><Image src="/logo.png" alt="Schema" width={45} height={45} /></a>
                    <Link href="/" className="text-2xl">Schema Studio</Link>
                </div>
                <div className="flex items-end gap-8 text-md mt-0.5">
                    <h1 className="cursor-pointer">Editor</h1>
                    <h1 className="cursor-pointer">Convert SQL</h1>
                    <h1 className="cursor-pointer">Parse SQL</h1>
                </div>
            </div>
            <Image src="/github.png" alt="GitHub" width={40} height={40} onClick={() => window.open("https://github.com/pauln17/schema-viewer", "_blank", "noopener, noreferrer")} className="cursor-pointer" />
        </div >
    );
}