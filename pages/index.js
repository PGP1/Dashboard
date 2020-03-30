import Link from "next/link";
import {PathPrefix} from "../components/PrefixedLink";

export default function Index() {
    return (
        <div>
            <p>Hello</p>
            <PathPrefix prefix={process.env.BACKEND_URL}>
                <Link href={"/about"}>
                    <a> About </a>
                </Link>
            </PathPrefix>
        </div>
    );
}