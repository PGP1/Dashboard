import style from './styles/Nav.module.scss';

export default function Nav (props) {
    return (
        <div className={style.nav}>
            <div className={style.logo}>Logo</div>
            {props?.loggedIn && <div className={style.accountHolder}>
                <div className={style.avatar}></div>
                <div className={style.username}>username</div>
            </div>}
        </div>
    )
}