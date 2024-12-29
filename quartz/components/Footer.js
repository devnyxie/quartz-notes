import { jsx as _jsx } from "preact/jsx-runtime";
import style from "./styles/footer.scss";
export default ((opts) => {
    const Footer = ({ displayClass, cfg }) => {
        const year = new Date().getFullYear();
        const links = opts?.links ?? [];
        return (_jsx("footer", { class: `${displayClass ?? ""}`, children: _jsx("ul", { children: Object.entries(links).map(([text, link]) => (_jsx("li", { children: _jsx("a", { href: link, children: text }) }))) }) }));
    };
    Footer.css = style;
    return Footer;
});
