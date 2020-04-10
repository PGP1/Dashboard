import Nav from "./Nav";

export default function Layout (props) {
    return (
        <>
            <Nav isAuthenticated={props?.isAuthenticated}/>
            <div className={"layout"}>
                {props.children}
            </div>
        </>
    )
}