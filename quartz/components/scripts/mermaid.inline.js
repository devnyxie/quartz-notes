import { removeAllChildren } from "./util";
import mermaid from "mermaid";
class DiagramPanZoom {
    container;
    content;
    isDragging = false;
    startPan = { x: 0, y: 0 };
    currentPan = { x: 0, y: 0 };
    scale = 1;
    MIN_SCALE = 0.5;
    MAX_SCALE = 3;
    ZOOM_SENSITIVITY = 0.001;
    constructor(container, content) {
        this.container = container;
        this.content = content;
        this.setupEventListeners();
        this.setupNavigationControls();
    }
    setupEventListeners() {
        // Mouse drag events
        this.container.addEventListener("mousedown", this.onMouseDown.bind(this));
        document.addEventListener("mousemove", this.onMouseMove.bind(this));
        document.addEventListener("mouseup", this.onMouseUp.bind(this));
        // Wheel zoom events
        this.container.addEventListener("wheel", this.onWheel.bind(this), { passive: false });
        // Reset on window resize
        window.addEventListener("resize", this.resetTransform.bind(this));
    }
    setupNavigationControls() {
        const controls = document.createElement("div");
        controls.className = "mermaid-controls";
        // Zoom controls
        const zoomIn = this.createButton("+", () => this.zoom(0.1));
        const zoomOut = this.createButton("-", () => this.zoom(-0.1));
        const resetBtn = this.createButton("Reset", () => this.resetTransform());
        controls.appendChild(zoomOut);
        controls.appendChild(resetBtn);
        controls.appendChild(zoomIn);
        this.container.appendChild(controls);
    }
    createButton(text, onClick) {
        const button = document.createElement("button");
        button.textContent = text;
        button.className = "mermaid-control-button";
        button.addEventListener("click", onClick);
        window.addCleanup(() => button.removeEventListener("click", onClick));
        return button;
    }
    onMouseDown(e) {
        if (e.button !== 0)
            return; // Only handle left click
        this.isDragging = true;
        this.startPan = { x: e.clientX - this.currentPan.x, y: e.clientY - this.currentPan.y };
        this.container.style.cursor = "grabbing";
    }
    onMouseMove(e) {
        if (!this.isDragging)
            return;
        e.preventDefault();
        this.currentPan = {
            x: e.clientX - this.startPan.x,
            y: e.clientY - this.startPan.y,
        };
        this.updateTransform();
    }
    onMouseUp() {
        this.isDragging = false;
        this.container.style.cursor = "grab";
    }
    onWheel(e) {
        e.preventDefault();
        const delta = -e.deltaY * this.ZOOM_SENSITIVITY;
        const newScale = Math.min(Math.max(this.scale + delta, this.MIN_SCALE), this.MAX_SCALE);
        // Calculate mouse position relative to content
        const rect = this.content.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        // Adjust pan to zoom around mouse position
        const scaleDiff = newScale - this.scale;
        this.currentPan.x -= mouseX * scaleDiff;
        this.currentPan.y -= mouseY * scaleDiff;
        this.scale = newScale;
        this.updateTransform();
    }
    zoom(delta) {
        const newScale = Math.min(Math.max(this.scale + delta, this.MIN_SCALE), this.MAX_SCALE);
        // Zoom around center
        const rect = this.content.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const scaleDiff = newScale - this.scale;
        this.currentPan.x -= centerX * scaleDiff;
        this.currentPan.y -= centerY * scaleDiff;
        this.scale = newScale;
        this.updateTransform();
    }
    updateTransform() {
        this.content.style.transform = `translate(${this.currentPan.x}px, ${this.currentPan.y}px) scale(${this.scale})`;
    }
    resetTransform() {
        this.scale = 1;
        this.currentPan = { x: 0, y: 0 };
        this.updateTransform();
    }
}
const cssVars = [
    "--secondary",
    "--tertiary",
    "--gray",
    "--light",
    "--lightgray",
    "--highlight",
    "--dark",
    "--darkgray",
    "--codeFont",
];
document.addEventListener("nav", async () => {
    const center = document.querySelector(".center");
    const nodes = center.querySelectorAll("code.mermaid");
    if (nodes.length === 0)
        return;
    const computedStyleMap = cssVars.reduce((acc, key) => {
        acc[key] = getComputedStyle(document.documentElement).getPropertyValue(key);
        return acc;
    }, {});
    const darkMode = document.documentElement.getAttribute("saved-theme") === "dark";
    mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: darkMode ? "dark" : "base",
        themeVariables: {
            fontFamily: computedStyleMap["--codeFont"],
            primaryColor: computedStyleMap["--light"],
            primaryTextColor: computedStyleMap["--darkgray"],
            primaryBorderColor: computedStyleMap["--tertiary"],
            lineColor: computedStyleMap["--darkgray"],
            secondaryColor: computedStyleMap["--secondary"],
            tertiaryColor: computedStyleMap["--tertiary"],
            clusterBkg: computedStyleMap["--light"],
            edgeLabelBackground: computedStyleMap["--highlight"],
        },
    });
    await mermaid.run({ nodes });
    for (let i = 0; i < nodes.length; i++) {
        const codeBlock = nodes[i];
        const pre = codeBlock.parentElement;
        const clipboardBtn = pre.querySelector(".clipboard-button");
        const expandBtn = pre.querySelector(".expand-button");
        const clipboardStyle = window.getComputedStyle(clipboardBtn);
        const clipboardWidth = clipboardBtn.offsetWidth +
            parseFloat(clipboardStyle.marginLeft || "0") +
            parseFloat(clipboardStyle.marginRight || "0");
        // Set expand button position
        expandBtn.style.right = `calc(${clipboardWidth}px + 0.3rem)`;
        pre.prepend(expandBtn);
        // query popup container
        const popupContainer = pre.querySelector("#mermaid-container");
        if (!popupContainer)
            return;
        let panZoom = null;
        function showMermaid() {
            const container = popupContainer.querySelector("#mermaid-space");
            const content = popupContainer.querySelector(".mermaid-content");
            if (!content)
                return;
            removeAllChildren(content);
            // Clone the mermaid content
            const mermaidContent = codeBlock.querySelector("svg").cloneNode(true);
            content.appendChild(mermaidContent);
            // Show container
            popupContainer.classList.add("active");
            container.style.cursor = "grab";
            // Initialize pan-zoom after showing the popup
            panZoom = new DiagramPanZoom(container, content);
        }
        function hideMermaid() {
            popupContainer.classList.remove("active");
            panZoom = null;
        }
        function handleEscape(e) {
            if (e.key === "Escape") {
                hideMermaid();
            }
        }
        const closeBtn = popupContainer.querySelector(".close-button");
        closeBtn.addEventListener("click", hideMermaid);
        expandBtn.addEventListener("click", showMermaid);
        document.addEventListener("keydown", handleEscape);
        window.addCleanup(() => {
            closeBtn.removeEventListener("click", hideMermaid);
            expandBtn.removeEventListener("click", showMermaid);
            document.removeEventListener("keydown", handleEscape);
        });
    }
});
