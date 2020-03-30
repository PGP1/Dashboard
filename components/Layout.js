import Nav from "./Nav";

export default function Layout (props) {
    return (
        <>
            <Nav/>
            <div className={"layout"}>
                {props.children}
            </div>
        </>
    )
}