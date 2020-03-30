import Link from "next/link";

export default function Index() {
    return (
        <div>
            <p>Hello</p>
            <Link href={"/about"}>
                <a> About </a>
            </Link>
        </div>
    );
}