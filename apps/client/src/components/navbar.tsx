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
            </div>
            <a href="https://github.com/pauln17/schema-viewer" target="_blank" rel="noopener noreferrer">
                <Image src="/github.png" alt="GitHub" width={40} height={40} className="cursor-pointer" />
            </a>
        </div >
    );
}