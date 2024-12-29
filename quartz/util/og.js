import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
/**
 * Get an array of `FontOptions` (for satori) given google font names
 * @param headerFontName name of google font used for header
 * @param bodyFontName name of google font used for body
 * @returns FontOptions for header and body
 */
export async function getSatoriFont(headerFontName, bodyFontName) {
    const headerWeight = 700;
    const bodyWeight = 400;
    // Fetch fonts
    const headerFont = await fetchTtf(headerFontName, headerWeight);
    const bodyFont = await fetchTtf(bodyFontName, bodyWeight);
    // Convert fonts to satori font format and return
    const fonts = [
        { name: headerFontName, data: headerFont, weight: headerWeight, style: "normal" },
        { name: bodyFontName, data: bodyFont, weight: bodyWeight, style: "normal" },
    ];
    return fonts;
}
/**
 * Get the `.ttf` file of a google font
 * @param fontName name of google font
 * @param weight what font weight to fetch font
 * @returns `.ttf` file of google font
 */
async function fetchTtf(fontName, weight) {
    try {
        // Get css file from google fonts
        const cssResponse = await fetch(`https://fonts.googleapis.com/css?family=${fontName}:${weight}`);
        const css = await cssResponse.text();
        // Extract .ttf url from css file
        const urlRegex = /url\((https:\/\/fonts.gstatic.com\/s\/.*?.ttf)\)/g;
        const match = urlRegex.exec(css);
        if (!match) {
            throw new Error("Could not fetch font");
        }
        // Retrieve font data as ArrayBuffer
        const fontResponse = await fetch(match[1]);
        // fontData is an ArrayBuffer containing the .ttf file data (get match[1] due to google fonts response format, always contains link twice, but second entry is the "raw" link)
        const fontData = await fontResponse.arrayBuffer();
        return fontData;
    }
    catch (error) {
        throw new Error(`Error fetching font: ${error}`);
    }
}
// This is the default template for generated social image.
export const defaultImage = (cfg, { colorScheme }, title, description, fonts, _fileData) => {
    // How many characters are allowed before switching to smaller font
    const fontBreakPoint = 22;
    const useSmallerFont = title.length > fontBreakPoint;
    // Setup to access image
    const iconPath = `https://${cfg.baseUrl}/static/icon.png`;
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: cfg.theme.colors[colorScheme].light,
            gap: "2rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            paddingLeft: "5rem",
            paddingRight: "5rem",
        }, children: [_jsxs("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                    flexDirection: "row",
                    gap: "2.5rem",
                }, children: [_jsx("img", { src: iconPath, width: 135, height: 135 }), _jsx("p", { style: {
                            color: cfg.theme.colors[colorScheme].dark,
                            fontSize: useSmallerFont ? 70 : 82,
                            fontFamily: fonts[0].name,
                        }, children: title })] }), _jsx("p", { style: {
                    color: cfg.theme.colors[colorScheme].dark,
                    fontSize: 44,
                    lineClamp: 3,
                    fontFamily: fonts[1].name,
                }, children: description })] }));
};
