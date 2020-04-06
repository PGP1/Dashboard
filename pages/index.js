import Link from "../components/Link";

export default function Index() {
    return (
        <div>
            <p>Hello</p>
            <Link href={"/register"}>
                <a> register </a>
            </Link>
            <br/>
            <Link href={"/login"}>
                <a> login </a>
            </Link>
        </div>
    );
}