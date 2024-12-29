import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import path from "path";
import style from "../styles/listPage.scss";
import { byDateAndAlphabetical, PageList } from "../PageList";
import { stripSlashes, simplifySlug, joinSegments } from "../../util/path";
import { htmlToJsx } from "../../util/jsx";
import { i18n } from "../../i18n";
const defaultOptions = {
    showFolderCount: true,
    showSubfolders: true,
};
export default ((opts) => {
    const options = { ...defaultOptions, ...opts };
    const FolderContent = (props) => {
        const { tree, fileData, allFiles, cfg } = props;
        const folderSlug = stripSlashes(simplifySlug(fileData.slug));
        const folderParts = folderSlug.split(path.posix.sep);
        const allPagesInFolder = [];
        const allPagesInSubfolders = new Map();
        allFiles.forEach((file) => {
            const fileSlug = stripSlashes(simplifySlug(file.slug));
            const prefixed = fileSlug.startsWith(folderSlug) && fileSlug !== folderSlug;
            const fileParts = fileSlug.split(path.posix.sep);
            const isDirectChild = fileParts.length === folderParts.length + 1;
            if (!prefixed) {
                return;
            }
            if (isDirectChild) {
                allPagesInFolder.push(file);
            }
            else if (options.showSubfolders) {
                const subfolderSlug = joinSegments(...fileParts.slice(0, folderParts.length + 1));
                const pagesInFolder = allPagesInSubfolders.get(subfolderSlug) || [];
                allPagesInSubfolders.set(subfolderSlug, [...pagesInFolder, file]);
            }
        });
        allPagesInSubfolders.forEach((files, subfolderSlug) => {
            const hasIndex = allPagesInFolder.some((file) => subfolderSlug === stripSlashes(simplifySlug(file.slug)));
            if (!hasIndex) {
                const subfolderDates = files.sort(byDateAndAlphabetical(cfg))[0].dates;
                const subfolderTitle = subfolderSlug.split(path.posix.sep).at(-1);
                allPagesInFolder.push({
                    slug: subfolderSlug,
                    dates: subfolderDates,
                    frontmatter: { title: subfolderTitle, tags: ["folder"] },
                });
            }
        });
        const cssClasses = fileData.frontmatter?.cssclasses ?? [];
        const classes = cssClasses.join(" ");
        const listProps = {
            ...props,
            sort: options.sort,
            allFiles: allPagesInFolder,
        };
        const content = tree.children.length === 0
            ? fileData.description
            : htmlToJsx(fileData.filePath, tree);
        return (_jsxs("div", { class: "popover-hint", children: [_jsx("article", { class: classes, children: content }), _jsxs("div", { class: "page-listing", children: [options.showFolderCount && (_jsx("p", { children: i18n(cfg.locale).pages.folderContent.itemsUnderFolder({
                                count: allPagesInFolder.length,
                            }) })), _jsx("div", { children: _jsx(PageList, { ...listProps }) })] })] }));
    };
    FolderContent.css = style + PageList.css;
    return FolderContent;
});
