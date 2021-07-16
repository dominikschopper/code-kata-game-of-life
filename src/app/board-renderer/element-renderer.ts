export class ElementRenderer {

    tagName: string;
    element: HTMLElement;
    children: ElementRenderer[] = [];
    htmlClasses: string[] = [];
    changed = true;

    constructor() {
        this.init();
    }

    init() {
        this.element = document.createElement(this.tagName);
        this.htmlClasses.forEach(c => this.element.classList.add(c));
    }

    addChild(child: ElementRenderer) {
        this.children.push(child);
        this.element.appendChild(child.element);
    }

    render() {
        if (!this.element) {
            this.init();
        }
        this.children.forEach(child => child.render());
        return this.element;
    }

    update(data?: any): any {
        // to be implemented in derived classes
    }
}
